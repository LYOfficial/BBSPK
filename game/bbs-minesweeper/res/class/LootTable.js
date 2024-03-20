class LootTable {
    constructor(value, from = {}, stackDepth = 0) {
        this.data = {
            type:       'generic',
            randomSeed: 0,
            pools:      []
        };
        this.from = {
            world:  undefined,
            room:   undefined,
            stage:  undefined,
            player: undefined,
            item:   undefined
        };
        this.stackDepth = stackDepth + 1;

        this.create(value, from);
    }

    /**
     * 创建战利品表
     * @param {String|Object} value 战利品表ID或战利品表对象
     * @param {Object} from 来源信息
     */
    create(value, from = {}) {
        if (typeof value == 'object') {
            this.data = {...this.data, ...value};
        } else if (typeof value == 'string') {
            let d = resource.getLootTable(value);
            if (d != undefined) {
                this.data = {...this.data, ...d};
            }
        }
        if (typeof from == 'object') {
            this.from = {...this.from, ...from};
        }
    }

    /**
     * 获取战利品
     * @returns {Array<Item>} 物品列表
     */
    getItem() {
        let items = [];
        // 禁止套娃
        if (this.stackDepth >= game.config.security.loot_table_stack_depth_limit) {
            log.error('Loot Table Error: Stack Overflow', 'class/LootTable.js > LootTable > getItem()');
            return items;
        }
        // 随机池
        this.data.pools.forEach(e => {
            let b = this.conditionsTest(e?.conditions);

            if (b && e.entries.length > 0) {
                let r = e?.rolls != undefined ? e.rolls : 1
                if (typeof r == 'object') {
                    r = new NumberProviders(r).getValue();
                }
                for (let i = 0; i < r; i++) {
                    let item = undefined;
                    let doi = 0;
                    do {
                        item = this.weightedRandom(e.entries);
                        doi++;
                        if (doi > 64) break;
                    } while (item == undefined);
                    if (item == undefined) {
                        log.error('Loot Table Error: Random Exception', 'class/LootTable.js > LootTable > getItem()');
                        return [];
                    }

                    if (this.conditionsTest(item?.conditions)) {
                        switch (item.type) {
                            case 'item':
                                items.push(ItemGenerator.get(item.name));
                                break;
                            
                            case 'loot_table':
                                let lt = new LootTable(item.name, this.from, this.stackDepth);
                                items = [...items, ...lt.getItem()];
                                break;
                        
                            case 'empty':
                            default:
                                break;
                        }
                    }
                }
            }
        });

        return items;
    }

    /**
     * 测试条件列表
     * @param {Array<Object>} value 条件列表
     * @returns {Boolean} 测试是否通过
     */
    conditionsTest(value) {
        let b = true;
        try {
            if (value != undefined) {
                value.forEach(e => {
                    let p = new Predicate(e, this.data.randomSeed);
                    b = p.test() && b;
                });
            }
        } catch (error) {
            log.error('Loot Table Conditions Error: ' + error.name, 'class/LootTable.js > LootTable > conditionsTest()');
            return false;
        }
        return b;
    }

    weightedRandom(options) {
        let i;
    
        let weights = [];
    
        for (i = 0; i < options.length; i++) {
            options[i].weight = options[i]?.weight != undefined ? options[i].weight : 1;
            weights[i]        = options[i] .weight + (weights[i - 1] || 0);
        }
        
        let random = SMath.randomFloat(this.randomSeed) * weights[weights.length - 1];
        
        for (i = 0; i < weights.length; i++)
            if (weights[i] > random)
                break;
        
        return options[i];
    }
}

class Predicate {
    constructor(value, seed = 0) {
        this.data = {
            condition: 'empty'
        };
        this.randomSeed = 0;

        this.create(value, seed);
    }

    /**
     * 创建战利品表谓词
     * @param {Object} value 战利品表谓词
     */
    create(value, seed = 0) {
        this.data = {...this.data, ...value};
        this.randomSeed = seed;
    }

    /**
     * 测试条件
     * @returns {Boolean} 测试是否通过
     */
    test() {
        switch (this.data.condition) {
            // 空
            case 'empty':
                return true;
            
            // 检查设备时间
            case 'device_time_check':
                let d   = new Date();
                let now = d.getTime();

                if (this.data.max > now && this.data.min < now) return true;
                return false;

            // 掷硬币
            case 'random_chance':
                let r = SMath.randomFloat(this.randomSeed);

                if (r < this.data.chance) return true;
                return false;

            // 不可能
            case 'impossible':
            default:
                return false;
        }
    }
}

class ItemModifier {
    constructor() {
        
    }
}