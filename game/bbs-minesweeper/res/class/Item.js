class ItemGenerator {
    constructor() {}

    static get(id) {
        let obj = resource.getItem(id);
        if (obj == undefined) return;
        switch (obj.type) {
            case 'chest':
                return new ItemChest(id);

            case 'water_bottle':
                return new WaterBottle(id);

            case 'weapon':
                return new Weapon(id);
        
            default:
                return new Item(id);
        }
    }
}

class Item {
    constructor(id) {
        this.id       = '';
        this.type     = '';
        this.quality  = 'normal';
        this.count    = 1;
        this.custom   = {};
        this.damage   = 0;
        this.disabled = false;
        this.data     = {};
        this.features = {
            stack: true
        };
        this.origin   = {
            player:     undefined,
            world:      undefined
        };

        this.create(id);
    }

    /**
     * 创建物品
     * @param {String} id 物品ID
     * @returns {Item} 物品
     */
    create(id) {
        let obj      = resource.getItem(id);
        if (obj == undefined) return;
        this.id      = obj.id;
        this.type    = obj.type;
        this.quality = obj.quality;
        if (obj?.data != undefined) {
            if (obj.data?.attribute != undefined) {
                this.attribute = obj.data.attribute;
                delete obj.data.attribute;
            }
            this.data = {...this.data, ...obj.data};
        }
        return this;
    }

    /**
     * 合并物品堆尝试
     * @param {Item} item 物品对象
     * @returns {Number} 合并后数量
     */
    join(item) {
        if (item.type != 'weapon' && item.type != 'chest') {
            if (
                this.id   === item.id   &&
                this.type === item.type &&
                Object.entries(this.data).toString() === Object.entries(item.data).toString()
            ) {
                this.count += item.count;
                item.setCount(0);
            }
            return this.count;
        } else {
            return -1;
        }
    }

    /**
     * 绑定关系
     * @param {Player} player 玩家
     * @param {World} world 世界
     */
    bind(player, world) {
        this.origin.player = player;
        this.origin.world  = world;
    }

    /**
     * 设置数量
     * @param {Number} value 数量
     * @returns {Number} 更新后数量
     */
    setCount(value) {
        if (this.type == 'weapon' && value > 1) return this.count;
        if (value < 0) value = 0;
        this.count = value;
        if (this.count <= 0) this.disabled = true;
        return this.count;
    }

    /**
     * 减去数量
     * @param {Number} value 数量
     * @returns {Number} 更新后数量
     */
    removeCount(value) {
        let residue = 0;
        if (this.count < value) {
            residue = value - this.count;
            value = this.count;
        }
        this.count -= value;
        return {
            count: this.count,
            residue: 0
        }
    }
}

class Weapon extends Item {
    constructor(id) {
        super(id);
        this.attribute = {
            attack:         0,
            defense:        0,
            attack_cost:    0,
            defense_cost:   0,
            distance:       0,
            health:         0,
            cd:             0,
            ballistic_type: 'close_combat',
            damage_type:    'sharp',
            ...this.attribute
        };
        this.features = {
            stack: false
        };
    }

    /**
     * 攻击
     * @returns {Object} 消息
     */
    attack() {
        if (this.disabled)             return StateMessage.getFail('item_disabled');
        if (this.attribute.attack < 0) return StateMessage.getFail('action_invalid');

        if (!game.debug.item_no_damage) {
            this.damage++;
        }
        if (this.damage >= this.attribute.health) this.disabled = true;
        
        return StateMessage.getSuccess(
            {
                attack:     this.attribute.attack,
                damageType: this.attribute.damage_type,
                cost:       this.attribute.attack_cost,
                health: {
                    damage: this.damage,
                    max:    this.attribute.health
                },
                disabled:   this.disabled
            },
            this.attribute.attack
        );
    }

    /**
     * 防御
     * @returns {Object} 消息
     */
    defense(damageValue) {
        if (this.disabled)              return StateMessage.getFail('item_disabled');
        if (this.attribute.defense < 0) return StateMessage.getFail('action_invalid');
        
        if (!game.debug.item_no_damage) {
            this.damage++;
        }
        if (this.damage >= this.attribute.health) this.disabled = true;

        let dv = damageValue - this.attribute.defense;
        if (dv < 0) dv = 0;

        return StateMessage.getSuccess(
            {
                defense:          this.attribute.defense,
                undefendedDamage: dv,
                cost:             this.attribute.defense_cost,
                health: {
                    damage:       this.damage,
                    max:          this.attribute.health
                },
                disabled:         this.disabled
            },
            dv
        );
    }

    /**
     * 不可用：此类型的物品不可堆叠
     * @returns {Number} -1
     */
    join() {
        return -1;
    }
}

class ItemChest extends Item {
    constructor(id) {
        super(id);
        this.data = {
            chest: {
                loot_table: undefined,
                inventory: [],
                open_cost: {}
            },
            ...this.data
        };
        this.features = {
            stack: false
        };
    }

    /**
     * 开启物品箱
     * @returns {Array<Item>} 物品列表
     */
    open() {
        if (this.disabled) return StateMessage.getFail('item_disabled');

        if (this.data.chest.open_cost?.health) {
            if (this.origin.player.health > this.data.chest.open_cost.health) {
                this.origin.player.damage(
                    this.data.chest.open_cost.health,
                    'chest_open_cost',
                    {
                        type: 'item',
                        name: this.id
                    }
                );
            } else {
                return StateMessage.getFail('health_low');
            }
        }

        if (this.data.chest.open_cost?.item) {
            let msg = this.origin.player.payCostItem(
                this.data.chest.open_cost.item.id,
                this.data.chest.open_cost.item.count
            );
            if (msg.state != 'success') {
                return StateMessage.getFail('insufficient_funds');
            }
        }

        let items = [];
        if (this.data.chest.loot_table == undefined) {
            items = this.data.chest.inventory;
            this.data.chest.inventory = [];
        } else {
            let chestLootTable = new LootTable(
                this.data.chest.loot_table,
                {
                    world:  this.origin.world,
                    player: this.origin.player,
                    item:   this
                }
            );
            this.data.chest.loot_table = undefined;
            items = chestLootTable.getItem();
        }

        this.setCount(0);

        return StateMessage.getSuccess(
            {
                items: items
            }
        );
    }

    /**
     * 不可用：此类型的物品不可堆叠
     * @returns {Number} -1
     */
    join() {
        return -1;
    }
}

class WaterBottle extends Item {
    constructor(id) {
        super(id);
        this.data = {
            effect: [],
            liquid: undefined,
            ...this.data
        }
        this.features = {
            stack: false
        };

        if (this.id == 'bottle') this.features.stack = true;
    }

    drink() {
        if (this.disabled)                 return StateMessage.getFail('item_disabled');
        if (this.data.liquid == undefined) return StateMessage.getFail('item_disabled');
        let efc = this.data.effect;
        this.liquid = undefined;
        if (this.data.effect.length > 0) this.origin.player.effect(this.data.effect);
        this.setCount(0);

        return StateMessage.getSuccess(
            {
                effect: efc,
                item: new WaterBottle('bottle')
            }
        );
    }

    /**
     * 合并物品堆尝试
     * @param {Item} item 物品对象
     * @returns {Number} 合并后数量
     */
    join(item) {
        if (item.id == 'bottle') {
            if (
                this.id   === item.id   &&
                this.type === item.type &&
                Object.entries(this.data).toString() === Object.entries(item.data).toString()
            ) {
                this.count += item.count;
                item.setCount(0);
            }
            return this.count;
        } else {
            return -1;
        }
    }
}