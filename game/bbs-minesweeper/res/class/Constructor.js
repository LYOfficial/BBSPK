/**
 * 方块构造器
 * @class
 */
class BlockConstructor {
    constructor() {}

    /**
     * 构造方块
     * @param {Block} block 方块对象
     * @returns {String} DOM
     */
    static getBlock(block) {
        if (block.searched) {
            if (block.type == 'air') {
                let str = '';
                let strList = [];
                if (block.search.stair > 0) {
                    strList.push(`<div class="search-icon stair-${block.search.chaos ? 'n' : block.search.stair}"></div>`);
                }
                if (block.search.chest > 0) {
                    strList.push(`<div class="search-icon chest-${block.search.chaos ? 'n' : block.search.chest}"></div>`);
                }
                if (block.search.monster > 0) {
                    strList.push(`<div class="search-icon monster-${block.search.chaos ? 'n' : block.search.monster}"></div>`);
                }
    
                for (let i = 0; i < strList.length; i++) {
                    if (i % 2 == 0) {
                        str += `<div class="search-icon-row">${strList[i]}`
                        if (i + 1 >= strList.length) {
                            str += '</div>';
                        }
                    } else {
                        str += `${strList[i]}</div>`
                    }
                }
    
                return this.getBlockContainer(
                    str,
                    {
                        pos: {
                            x: block.pos.x,
                            y: block.pos.y
                        },
                        class: 'searched'
                    },
                    block
                );
            } else {
                switch (block.type) {
                    case 'chest':
                    case 'monster':
                        return this.getBlockContainer(
                            `<div class="event ${block.type} ${block.damaged ? 'damaged' : ''}"></div>`,
                            {
                                pos: {
                                    x: block.pos.x,
                                    y: block.pos.y
                                },
                                class: 'searched ' + block.type
                            },
                            block
                        );

                    case 'stair':
                        return this.getBlockContainer(
                            `<div class="event ${block.type}"></div>`,
                            {
                                pos: {
                                    x: block.pos.x,
                                    y: block.pos.y
                                },
                                class: 'searched ' + block.type
                            },
                            block
                        );

                
                    default:
                        return this.getBlockContainer(
                            block.type,
                            {
                                pos: {
                                    x: block.pos.x,
                                    y: block.pos.y
                                },
                                class: 'searched ' + block.type
                            },
                            block
                        );
                }
            }
        } else {
            if (block.type == 'wall') {
                return this.getBlockContainer(
                    '',
                    {
                        pos: {
                            x: block.pos.x,
                            y: block.pos.y
                        },
                        class: 'wall'
                    },
                    block
                );
            } else {
                return this.getBlockContainer(
                    '',
                    {
                        pos: {
                            x: block.pos.x,
                            y: block.pos.y
                        }
                    },
                    block
                );
            }
        }
    }

    static getBlockContainer(content = '', data = {}, block) {
        data = {
            ...{
                pos: {
                    x: 0,
                    y: 0
                },
                class: ''
            },
            ...data
        };
        return `<div id="map-${data.pos.y}-${data.pos.x}" class="map-block ${data.class}" data-id="${block.id}" data-pos-y="${data.pos.y}" data-pos-x="${data.pos.x}">${content}<div class="cover"><div class="attack"></div></div></div>`;
    }
}

/**
 * 地图构造器
 * @class
 */
class MapConstructor {
    constructor() {}

    /**
     * 构造地图
     * @param {Stage} stage 楼层对象
     * @returns {String} DOM
     */
    static getMap(stage) {
        let before = `<div id="map" style="--map-size: ${Math.max(stage.size.height, stage.size.width)}; --map-size-height: ${stage.size.height}; --map-size-width: ${stage.size.width};">`;
        let str    = '';
        for (let i = 0; i < stage.size.height; i++) {
            str += `<div id="map-${i}" class="map-row">`;
            for (let j = 0; j < stage.size.width; j++) {
                str += BlockConstructor.getBlock(stage.map[i][j]);
            }
            str += `</div>`;
        }
        return before + str + '</div>';
    }
}

/**
 * 物品栏构造器
 * @class
 */
class InventoryConstructor {
    constructor() {}

    /**
     * 构造物品格
     * @param {Item} item 物品
     * @param {Number} slot 栏位索引
     * @param {Object} data 数据
     * @returns {String} DOM
     */
    static getItem(item, slot, data = {}) {
        if (item == undefined) return InventoryConstructor.getAir(slot, data);
        return `<div ${data?.id ? `id="${data.id}"` : ''} class="inventory-item${data?.class ? ` ${data.class}` : ''}" data-slot="${slot}">
                <div class="item-icon" data-item-type="${item.type}" data-item-id="${item.id}"></div>
                ${InventoryConstructor.getDamageBar(item)}
                ${InventoryConstructor.getCount(item)}
            </div>`;
    }

    /**
     * 构造空物品格
     * @param {Number} slot 栏位索引
     * @param {Object} data 数据
     * @returns 
     */
    static getAir(slot, data = {}) {
        return `<div ${data?.id ? `id="${data.id}"` : ''} class="inventory-item${data?.class ? ` ${data.class}` : ''}" data-slot="${slot}">
                <div class="item-icon" data-item-type="air" data-item-id="air"></div>
            </div>`;
    }

    /**
     * 构造整个物品栏
     * @param {Array<Item>} inventory 物品栏
     * @returns {String} DOM
     */
    static getInventory(inventory) {
        let dom = '<div id="btn-inventory-close">CLOSE</div>';
        for (let i = 0; i < inventory.length; i++) {
            dom += InventoryConstructor.getItem(
                inventory[i],
                i,
                {
                    id: `inventory-slot-${i}`
                }
            );
        }

        return dom;
    }

    /**
     * 构造耐久度条
     * @param {Item} item 物品
     * @returns {String} DOM
     */
    static getDamageBar(item) {
        if (item?.attribute == undefined) {
            return '';
        } else if (item.attribute?.health == undefined || item.attribute?.health == 0) {
            return '';
        }

        let value = (item.attribute.health - item.damage) / item.attribute.health,
            type  = '';

        if(value >= 0.75) {
            
        } else if(value >= 0.5) {
            type = 'damage-1';
        } else if(value >= 0.25) {
            type = 'damage-2';
        } else if(value >= 0.1) {
            type = 'damage-3';
        } else {
            type = 'damage-4';
        }

        return `<div class="item-damage-bar${ item.damage > 0 ? '' : ' hide' }">
                <div class="item-damage-value ${type}" style="--value: ${ value * 100 }%;"></div>
            </div>`;
    }

    /**
     * 构造物品数量
     * @param {Item} item 物品
     * @returns {String} DOM
     */
    static getCount(item) {
        let str = item.count;
        if (item.count <= 1)        return ``;
        if (item.count > 9999)      str = '9999+';
        if (item.count == Infinity) str = '∞';

        return `<div class="item-count">${str}</div>`;
    }

    /**
     * 构造快捷栏
     * @param {Array<Item>} hotbar 快捷栏
     * @param {Number} selected 已选择的栏位
     * @returns {String} DOM
     */
    static getHotbar(hotbar, selected = 0) {
        let dom = '';
        for (let i = 0; i < hotbar.length; i++) {
            dom += InventoryConstructor.getItem(
                hotbar[i],
                i,
                {
                    id: `player-hotbar-${i}`,
                    class: `player-hotbar-item${ i == selected ? ' selected' : '' }`
                }
            );
        }

        dom += InventoryConstructor.getInventoryButton();

        return `<div id="player-hotbar" class="">${dom}</div>`;
    }

    /**
     * 构造打开物品栏按钮
     * @returns {String} DOM
     */
    static getInventoryButton() {
        return `<div id="btn-open-inventory" class="inventory-item">
                <div class="item-icon" data-item-type="system" data-item-id="inventory"></div>
            </div>`;
    }
}

/**
 * 物品悬浮框构造器
 * @class
 */
class ItemPopup {
    constructor() {}

    static getPopup(item) {
        return `<div class="item-popup quality-${item.quality}">
            ${ ItemPopup.getPopupTitle(item) }
            ${ ItemPopup.getPopupContent(item) }
        </div>`;
    }

    static getPopupTitle(item) {
        let str = $t( `item.${item.id}.name` );
        let cls = '';
        if (item?.custom?.name != undefined) {
            str = item.custom.name;
            cls = ' custom'
        }
        return `<div class="item-popup-title${cls}">${str}</div>`;
    }

    static getPopupContent(item) {
        return `<div class="item-popup-content">
                ${ ItemPopup.getDescription(item) }
                ${ item.type == 'weapon' ? ItemPopup.getWeaponData(item) : '' }
                ${ item.type == 'water_bottle' ? ItemPopup.getEffectData(item) : '' }
                ${ ItemPopup.getHotkeys(item) }
            </div>`;
    }

    static getLine() {
        return `<div class="item-popup-line"></div>`
    }

    static getDescription(item) {
        let str = $t( `item.${item.id}.description` );
        let cls = '';
        if (item?.custom?.description != undefined) {
            str = item.custom.description;
            cls = ' custom'
        }
        return `<div class="item-popup-description${cls}">${str}</div>`;
    }

    static getWeaponData(item) {
        let str = ItemPopup.getLine();
        str += `<div>${ $t( 'item_popup.attribute.attack', { n: item.attribute.attack } ) }</div>`;
        str += `<div>${ $t( 'item_popup.attribute.defense', { n: item.attribute.defense } ) }</div>`;
        str += `<div>${ $t( 'item_popup.attribute.health', { n: item.attribute.health - item.damage, max: item.attribute.health } ) }</div>`;
        return str;
    }

    static getEffectData(item) {
        if (item.data.effect.length == 0) return '';
        let str = ItemPopup.getLine();
        item.data.effect.forEach(e => {
            str += `<div${ resource.getEffect(e.id)?.is_debuff ? ` style="color: var(--ac-color-red);"` : '' }>${ $t( `effect.${e.id}.name` ) } ${ $t( `effect.level.${e.level}` ) }</div>`;
        });
        return str;
    }

    static getHotkeys(item) {
        let str = '',
            key = '';
        switch (item.type) {
            case 'chest':
                key = 'gui.action.open';
                break;

            case 'water_bottle':
                if (item.data.liquid == undefined) return '';
                key = 'gui.action.drink';
                break;

            case 'weapon':
                key = 'gui.action.equip'
                break;
        
            default:
                return '';
        }

        str = pixelHotkeys.getKeyDOM('msl', $t(key));

        return `<div class="item-popup-hotkeys">${str}</div>`;
    }
}

/**
 * 玩家状态条构造器
 * @class
 */
class HudState {
    constructor() {}

    static getSpirit() {
        return {
            heart:         ['none', '', 'heart-half', '',            '',                         ''                             ],
            heartDamage:   ['',     '', '',           'none damage', 'none damage-half',         'heart-half damage-right-half' ],
            heartRollback: ['',     '', '',           'rollback',    'heart-half rollback-half', 'rollback-right-half'          ]
        };
    }

    static getHeartContainer(addClass = undefined) {
        return `<span class="heart-bg${ addClass ? ' ' + addClass : '' }"><span class="heart"></span></span>`;
    }

    static getHeart(value, addClass = undefined) {
        return HudState.getHeartContainer(
            `${HudState.getSpirit().heart[value]}${ addClass ? ' ' + addClass : '' }`
        );
    }

    static getHeartDamage(value) {
        return HudState.getHeart(
            value,
            HudState.getSpirit().heartDamage[value]
        );
    }

    static getHeartRollback(value) {
        return HudState.getHeart(
            value,
            HudState.getSpirit().heartRollback[value]
        );
    }

    /**
     * 获取生命值图标动画序列
     * @param {Number} before 生命值变更前
     * @param {Number} after 生命值变更后
     * @param {Number} max 最大生命值
     * @returns 
     */
    static getHealthList(before, after, max) {
        let high = before,
            low  = after;
        if (after > before) {
            high = after;
            low  = before;
        }

        let highBin = Number('0b' + '1'.repeat(high)),
            lowBin  = Number('0b' + '1'.repeat(low));

        if (Number.isNaN(highBin)) highBin = 0;
        if (Number.isNaN(lowBin))  lowBin  = 0;

        let output  = String(Number(highBin.toString(2)) + Number(lowBin.toString(2))).split('').reverse(),
            list    = [];

        const index = {
            "00": 0,
            "10": 4,
            "11": 3,
            "20": 2,
            "22": 1,
            "21": 5,
        };
        
        for (let i = 1; i < max; i += 2) {
            let now = `${ output[i - 1] != undefined ? output[i - 1] : '0' }${ output[i] != undefined ? output[i] : '0' }`;
            list.push(index[now]);
        }

        return list;
    }

    static getHealthBar(before, after, max) {
        const list = HudState.getHealthList(before, after, max);
        let dom = '';
        let fn = HudState.getHeartDamage;
        if (before < after) fn = HudState.getHeartRollback;
        
        list.forEach(e => {
            dom += fn(e);
        });

        return dom;
    }
}