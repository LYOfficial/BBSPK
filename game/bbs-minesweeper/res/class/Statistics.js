class Statistics {
    constructor() {
        this.__game_start_timestamp = 0;
        this.data = {
            custom: {
                // 造成的伤害
                damage_dealt: 0,
                // 防御的伤害
                damage_defended: 0,
                // 受到的伤害
                damage_taken: 0,
                // 开启的宝箱
                chest_open: 0,
                // 摧毁的宝箱
                chest_destroy: 0,
                // 怪物击杀数
                monster_kills: 0,
                // 移动步数
                move: 0,
                // 楼层切换数
                stage_switch: 0
            }
        }
    }

    getStatistic(type, name) {
        return this.data[type][name];
    }

    setStatistic(type, name, value, mode = 'add') {
        switch (mode) {
            case 'add'   :  this.data[type][name] += value; break;
            case 'remove':  this.data[type][name] -= value; break;
            case 'set'   :  this.data[type][name]  = value; break;
        
            default:                                        break;
        }

        return this.data[type][name];
    }
}