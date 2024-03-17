class Player {
    constructor(world) {
        this.health       = 6;
        this.healthMax    = 6;
        this.isDead       = false;
        this.attribute    = [];
        this.lastPos      = [0, 0];
        this.inventory    = [];
        this.hotbar       = [];
        this.selectedSlot = 0;
        this.discarded    = [];
        this.world        = {};
        this.messager     = {};
        this.statistics   = {};
        this.lastDamage   = {};

        this.__inGiveItems = false;

        this.boundEvent   = {
            goto:               function() {},
            healthDamage:       function() {},
            healthRegeneration: function() {},
            dead:               function() {},
            updateAttribute:    function() {},
            updateHotbar:       function() {},
            updateInventory:    function() {},
            updateMap:          function() {}
        };

        this.create(world);
    }

    /**
     * 创建玩家
     * @param {World} world 玩家所在世界
     */
    create(world) {
        this.world  = world;
        this.attribute.push(new Attribute('health_max', 6, 'system'));
        this.health = 6;
        this.statistics = new Statistics();
    }

    /**
     * 绑定事件
     * @param {String} event 事件名称
     * @param {Function} action 事件过程
     * @returns {Function} 事件过程
     */
    bind(event, action = function() {}) {
        return this.boundEvent[event] = action;
    }

    /**
     * 新建属性
     * @param {String} name 属性名称
     * @param {Number} base 基值
     * @param {String} from 来源
     */
    newAttribute(name, base = 0, from = 'system') {
        this.attribute.push(new Attribute(name, base, from));
        this.updateAttribute();
    }

    /**
     * 设置属性
     * @param {String} name 属性名称
     * @param {Number} base 基值
     * @param {String} from 来源
     * @returns {Object} 修改后的属性
     */
    setAttribute(name, base = 0, from = 'system') {
        let a = this.attribute.find(function(e) {
            return e.name == name && e.from == from;
        });
        if (a != undefined) {
            a.base = base;
            this.updateAttribute();
            return a;
        } else {
            return;
        }
    }

    /**
     * 更新属性值
     * @returns {Object} 更新后的属性
     */
    updateAttribute() {
        this.healthMax = 0;
        this.attribute.forEach(e => {
            switch (e.name) {
                case 'health_max':
                    this.healthMax += e.base;
                    break;
            
                default:
                    break;
            }
        });

        this.boundEvent.updateAttribute({
            attribute: this.attribute,
            health:    this.health,
            healthMax: this.healthMax
        });

        return {
            attribute: this.attribute,
            health:    this.health,
            healthMax: this.healthMax
        };
    }

    /**
     * 玩家移动到指定位置
     * @param {Number} y Y坐标
     * @param {Number} x X坐标
     * @returns {Object} 方块数据
     */
    goto(y, x) {
        if (this.isDead && !game.debug.player_dead_action) return;
        let block = this.world.getSelectedRoom().getSelectedStage().map[y][x];
        if (block.searched) {
            if (block.type != 'stair') return;
            this.switchStage(this.world.getSelectedRoom().stage.length);
            return;
        }
        this.lastPos = [y, x];
        this.clearDiscard();

        this.statistics.setStatistic('custom', 'move', 1);

        let r = this.world.getSelectedRoom().getSelectedStage().goto(y, x);

        // 处理物品使用异常的变量
        let itemUsingException = undefined;
        let itemNowRemove = false;

        if (r.type == 'monster') {
            let killFail = false,
                defFail  = false;
            if (this.hotbar[this.selectedSlot]?.type == 'weapon') {
                // 攻击阶段
                let atk = this.hotbar[this.selectedSlot].attack();
                if (atk.state == 'success') {
                    // 攻击发动成功
                    if (atk.data.attack >= r.data.health) {
                        // 击杀成功
                        r.block.damaged = true;
                        if (r.block?.data?.loot_table != undefined) {
                            let chestLootTable = new LootTable(
                                r.block.data.loot_table,
                                {
                                    world:  this.world,
                                    room:   this.world.getSelectedRoom(),
                                    stage:  this.world.getSelectedRoom().getSelectedStage(),
                                    player: this,
                                    item:   this.getSelectedItem()
                                }
                            );
        
                            this.giveItems(chestLootTable.getItem());
                        }
                    } else {
                        // 击杀失败
                        killFail = true;
                    }
                    this.statistics.setStatistic('custom', 'damage_dealt', Math.min(r.data.health, atk.data.attack));
                    if (atk.data.disabled) itemNowRemove = true;
                } else {
                    killFail = true;
                    itemUsingException = atk;
                }

                // 防御阶段
                if (killFail) {
                    let def = this.hotbar[this.selectedSlot].defense(r.data.attack);
                    if (def.state == 'success') {
                        this.statistics.setStatistic('custom', 'damage_defended', def.data.defense);
                        this.damage(
                            def.data.undefendedDamage,
                            r.data.damage_type,
                            {
                                type: 'monster',
                                name: r.id
                            }
                        );
                        if (atk.data.disabled) itemNowRemove = true;
                    } else {
                        defFail = true;
                        itemUsingException = def;
                    }
                }
            } else {
                defFail = true;
            }
            
            if (defFail) {
                this.damage(
                    r?.data?.attack ? r.data.attack : 0,
                    r.data.damage_type,
                    {
                        type: 'monster',
                        name: r.block.id
                    }
                );
            }
        } else if (r.type == 'chest') {
            let openChest = true;
            // 手持武器
            if (this.hotbar[this.selectedSlot]?.type == 'weapon') {
                // 尝试攻击
                let atk = this.hotbar[this.selectedSlot].attack();
                if (atk.state == 'success' && !this.hotbar[this.selectedSlot].data?.not_damage_chest) {
                    // 攻击成功，宝箱损坏
                    r.block.damaged = true;
                    openChest = false;
                    if (atk.data.disabled) itemNowRemove = true;
                } else {
                    itemUsingException = atk;
                }
            }

            if (openChest) {
                if (r.block?.data?.loot_table != undefined) {
                    let chestLootTable = new LootTable(
                        r.block.data.loot_table,
                        {
                            world:  this.world,
                            room:   this.world.getSelectedRoom(),
                            stage:  this.world.getSelectedRoom().getSelectedStage(),
                            player: this,
                            item:   this.getSelectedItem()
                        }
                    );

                    this.giveItems(chestLootTable.getItem());
                }
            }
        } else {
            if (this.hotbar[this.selectedSlot]?.type == 'weapon') {
                let atk = this.hotbar[this.selectedSlot].attack();
                if (atk.state == 'success') {
                    if (atk.data.disabled) itemNowRemove = true;
                } else {
                    itemUsingException = atk;
                }
            }
        }

        if (r.type != 'monster' && this.hotbar[this.selectedSlot].id == 'soul_trace_boomerang') {
            this.damage(
                this.hotbar[this.selectedSlot].attribute.attack,
                'boomerang',
                {
                    type: 'item',
                    name: this.hotbar[this.selectedSlot]
                }
            );
        }

        this.boundEvent.goto(r);

        if (itemUsingException != undefined || itemNowRemove) this.itemUsedFail(itemUsingException, itemNowRemove);

        this.stepUpdateInventory();
        this.updateHotbar();

        return r;
    }

    /**
     * 处理物品使用异常
     * @param {Object} msg 物品使用返回消息
     */
    itemUsedFail(msg, nowRemove = false) {
        if (msg?.failReason == 'item_disabled' || nowRemove) {
            this.removeSelectedItem();
        }
    }

    /**
     * 每回合更新物品栏
     */
    stepUpdateInventory() {
        // 待施工
        this.updateInventory();
    }

    /**
     * 伤害玩家
     * @param {Number} value 伤害值
     * @returns {Number} 剩余HP
     */
    damage(value, type = 'unknow', form = {}) {
        if (this.isDead || game.debug.player_no_damage)         return StateMessage.getFail('invalid_request');
        value = Math.ceil(value);
        if (value       >  game.config.security.damage_maximum) value = game.config.security.damage_maximum;
        if (value       <= 0)                                   return StateMessage.getFail('invalid_number');
        let lastHealth  = this.health;
        let deathDefend = false;
        if (value == this.health && value > 1) {
            value--;
            deathDefend = true;
        }
        this.health -= Math.min(this.health, value);
        this.boundEvent.healthDamage({
            health:      this.health,
            healthMax:   this.healthMax,
            lastHealth:  lastHealth,
            damage:      Math.min(lastHealth, value),
            deathDefend: deathDefend
        });

        this.statistics.setStatistic('custom', 'damage_taken', Math.min(lastHealth, value));

        if (this.health <= 0) this.dead(type, form, this.lastDamage);

        this.lastDamage = {
            damage: value,
            type:   type,
            form:   form
        };
        
        if (this.healthMax <= 0) {
            log.error('Player Health Exception: Player.healthMax <= 0', 'class/Player.js > Player > damage()');
        }

        return StateMessage.getSuccess(
            {
                damage: Math.min(lastHealth, value),
                health: this.health
            },
            Math.min(lastHealth, value)
        );
    }

    /**
     * 治疗玩家
     */
    regeneration(value) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        value = Math.ceil(value);
        if (value       <= 0)                              return StateMessage.getFail('invalid_number');
        if (this.health >= this.healthMax)                 return StateMessage.getFail('health_maximum');
        let lastHealth  = this.health;
        
        this.health += Math.min(this.healthMax - this.health, value);
        this.boundEvent.healthRegeneration({
            health:      this.health,
            healthMax:   this.healthMax,
            lastHealth:  lastHealth,
            rollback:    Math.min(this.healthMax - lastHealth, value)
        });

        this.lastDamage = {};

        // this.statistics.setStatistic('custom', 'damage_taken', Math.min(this.health, value));

        return StateMessage.getSuccess(
            {
                rollback: Math.min(this.healthMax - lastHealth, value),
                health:   this.health
            },
            Math.min(this.healthMax - lastHealth, value)
        );
    }

    effect(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }

        value.forEach(e => {
            switch (e.id) {
                case 'instant_damage':
                    this.damage(
                        e.level,
                        'magic',
                        {
                            type: 'effect',
                            name: e.id
                        }
                    );
                    break;

                case 'instant_health':
                    this.regeneration(e.level);
                    break;
            
                default:
                    break;
            }
        });
    }

    /**
     * 给予物品
     * @param {Item} item 物品
     * @returns {Object} 状态和数据
     */
    give(item) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        if (item instanceof Item == false)                 return StateMessage.getFail('invalid_item');
        if (item.id == '')                                 return StateMessage.getFail('item_void');

        // 查找同类物品
        let items = this.inventory.filter(function(e) {
            return e.id == item.id;
        });

        if (items.length <= 0) {
            // 未找到同类物品
            this.inventory.push(item);
            item.bind(this, this.world);
        } else {
            // 找到同类物品，尝试合并
            let joined = false;
            items.forEach(e => {
                let r = e.join(item);
                if (r != -1) {
                    joined = true;
                    return;
                }
            });
            // 合并失败
            if (!joined) {
                this.inventory.push(item);
                item.bind(this, this.world);
            }
        }

        if (!this.__inGiveItems) this.updateInventory();

        return StateMessage.getSuccess(
            {
                item: item,
            }
        );
    }

    /**
     * 给予多个物品
     * @param {Array<Item>} items 物品列表
     * @returns {Array<Object>} 状态和数据
     */
    giveItems(items = []) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        let rs = [];

        this.__inGiveItems = true;
        items.forEach(e => {
            rs.push(this.give(e));
        });
        this.__inGiveItems = false;

        this.updateInventory();

        return StateMessage.getSuccess(
            {
                returns: rs
            }
        );
    }

    /**
     * 通过物品ID过滤物品栏物品
     * @param {String} itemId 物品ID
     * @returns {Object} 包含计数和物品列表的消息
     */
    filterInventoryItemsById(itemId) {
        let items = this.inventory.filter((e) => {
            return e.id === itemId;
        });

        let count = 0;
        items.forEach(e => {
            count += e.count;
        });

        return {
            count: count,
            items: items
        };
    }

    /**
     * 支付物品
     * @param {String} itemId 物品ID
     * @param {Number} count 物品数量
     * @returns {Object} 消息
     */
    payCostItem(itemId, count = 0) {
        let obj = this.filterInventoryItemsById(itemId);
        if (count <= 0 || typeof count != 'number') return StateMessage.getFail('invalid_request');
        if (obj.count < count)                      return StateMessage.getFail('insufficient_funds');

        for (let i = 0; i < obj.items.length; i++) {
            let msg = obj.items[i].removeCount(count);
            if (msg.residue > 0) {
                count = msg.residue;
            } else {
                count = 0
                break;
            }
        }

        this.updateInventory();

        if (count > 0) {
            log.error('Logic Error: Unknow Exception', 'class/Player.js > Player > payCostItem()');
            return StateMessage.getFail('exception');
        }

        return StateMessage.getSuccess();
    }

    /**
     * 替换物品
     * @param {Number} index 物品栏索引
     * @param {Item} item 物品
     * @returns {Object} 状态和数据
     */
    replaceItem(index, item) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        if (item instanceof Item == false)                 return StateMessage.getFail('item_invalid');
        this.inventory[index] = item;
        return StateMessage.getSuccess(
            {
                item:           item,
                inventoryIndex: index
            },
            index
        );
    }

    /**
     * 切换快捷栏物品
     * @param {Number} solt 快捷栏槽位
     * @param {Number} index 物品栏索引
     * @returns {Object} 状态和数据
     */
    switchHotbarItem(solt, index) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        let item, hotbarItem;
        if (this.inventory[index] == undefined && this.hotbar[solt] == undefined) {
            return StateMessage.getFail('null');
        } else if (this.hotbar[solt] == undefined) {
            item                  = this.inventory.splice(index, 1)[0];
            this.hotbar[solt]     = item;
        } else if (this.inventory[index] == undefined) {
            hotbarItem            = this.hotbar[solt];
            this.hotbar[solt]     = undefined;
            this.inventory.push(hotbarItem);
        } else {
            item                  = this.inventory[index];
            hotbarItem            = this.hotbar[solt];
            this.inventory[index] = hotbarItem;
            this.hotbar[solt]     = item;
        }

        this.updateHotbar();
        this.updateInventory();

        return StateMessage.getSuccess(
            {
                solt: solt,
                inventoryIndex: index
            },
            index
        );
    }

    /**
     * 获取已选择的物品
     * @returns {Object} 物品
     */
    getSelectedItem() {
        return this.hotbar[this.selectedSlot];
    }

    /**
     * 切换楼层
     * @param {Number} stage 楼层索引
     */
    switchStage(stage) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        this.clearDiscard();
        this.world.switchStage(stage);
        this.boundEvent.updateMap(this.world.getSelectedRoom().getSelectedStage());
        this.statistics.setStatistic('custom', 'stage_switch', 1);
    }

    /**
     * 选择快捷栏栏位
     * @param {Number} value 栏位索引
     */
    selectSlot(value) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        this.selectedSlot = value;
        this.updateHotbar();
    }

    /**
     * 使用物品栏物品
     * @param {Number} index 栏位索引
     */
    useInventoryItem(index) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        let r;
        if (this.inventory[index] != undefined) {
            switch (this.inventory[index].type) {
                case 'chest':
                    r = this.inventory[index].open();
                    if (r.state == 'success') {
                        this.giveItems(r.data.items);
                    }
                    break;

                case 'water_bottle':
                    r = this.inventory[index].drink();
                    if (r.state == 'success') {
                        this.give(r.data.item);
                    }
                    break;
            
                default:
                    break;
            }
        }

        if (r.state == 'success') this.updateInventory();

        return r;
    }

    /**
     * 更新快捷栏
     */
    updateHotbar() {
        this.boundEvent.updateHotbar({
            hotbar:       this.hotbar,
            selectedSlot: this.selectedSlot
        });
    }

    /**
     * 更新物品栏
     */
    updateInventory() {
        for (let i = this.inventory.length - 1; i >= 0; i--) {
            if (this.inventory[i].count <= 0) this.removeInventoryItem(i);
        }
        this.boundEvent.updateInventory(this.inventory);
    }
    
    /**
     * 丢弃物品
     * @param {Number} index 栏位索引
     */
    discardItem(index) {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        if (this.inventory[index] != undefined) {
            let item = this.inventory.splice(index, 1)[0];
            this.discarded.unshift(item);
            this.updateInventory();
        }
    }

    /**
     * 回收最后一个丢弃的物品
     */
    recoveryItem() {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        if (this.discarded.length > 1) {
            let item = this.discarded.shift();
            this.inventory.push(item);
            this.updateInventory();
        }
    }

    /**
     * 清空丢弃物品
     */
    clearDiscard() {
        if (this.isDead && !game.debug.player_dead_action) return StateMessage.getFail('invalid_request');
        this.discarded = [];
        this.updateInventory();
    }

    /**
     * 摧毁手持物品
     */
    removeSelectedItem() {
        this.hotbar[this.selectedSlot] = undefined;
        this.selectedSlot = 0;
    }

    /**
     * 摧毁物品栏物品
     * @param {Number} index 栏位索引
     */
    removeInventoryItem(index) {
        if (this.inventory[index] != undefined) {
            this.inventory.splice(index, 1)[0];
        }
    }

    /**
     * 设置玩家死亡
     */
    dead(type = 'unknow', form = {}, lastDamage = {}) {
        this.isDead = true;
        this.boundEvent.dead({
            lastPos: this.lastPos
        });

        switch (type) {
            case 'chest_open_cost':
                if (this.deadFormCheck(form) == 'item') {
                    this.deadMessage('chest_open_cost', { name: $t( 'item.' + form.name + '.name' ) });
                } else {
                    this.deadMessage('chest_open_cost_unknow');
                }
                break;

            case 'magic':
                if (this.deadFormCheck(form) == 'effect') {
                    this.deadMessage('magic_effect', { name: $t( 'effect.' + form.name + '.name' ) });
                } else {
                    this.deadMessage('magic_unknow');
                }
                break;

            case 'monster_attack':
                if (this.deadFormCheck(form) == 'monster') {
                    if (lastDamage?.type == 'chest_open_cost') {
                        this.deadMessage('monster_attack_at_chest_open_cost', { name: $t( 'block.' + form.name ) });
                    } else {
                        this.deadMessage('monster_attack', { name: $t( 'block.' + form.name ) });
                    }
                } else {
                    this.deadMessage('monster_attack_unknow');
                }
                break;
        
            default:
                this.deadMessage(type);
                break;
        }
    }

    deadFormCheck(form = {}) {
        if (form?.type == undefined || form?.name == undefined) return 'unknow';
        return form.type;
    }

    deadMessage(key, variable = {}) {
        this.messager.send($t( 'dead.' + key, variable ));
    }
}