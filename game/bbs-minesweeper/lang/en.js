const lang_en = {
    gui: {
        action: {
            attack: "Attack",
            drink: "Drink",
            equip: "Equip",
            open: "Open",
            search: "Search"
        }
    },
    commands: {
        common: {
            fail: {
                exceed_maximum_value: "逻辑错误：'{n}' 太大了，最大只能为 {max}",
                exceed_minimum_value: "逻辑错误：'{n}' 太小了，最小只能为 {min}",
                invalid_json: "语法错误：无效的 JSON",
                invalid_number: "语法错误：无效的数字",
                invalid_block: "不存在名为 '{value}' 的方块",
                invalid_item: "不存在名为 '{value}' 的物品",
                invalid_loottable: "不存在名为 '{value}' 的战利品表",
                missing_parameter: "语法错误：缺少必要参数"
            }
        },
        damage: {
            success: "Has dealt {n} damage to player.",
            fail: {
                invalid_request: "Unable to cause damage to player."
            }
        },
        give: {
            success: "Gave {name} * {n} to player.",
            fail: {
                invalid_request: "Unable to give player item."
            }
        },
        kill: {
            success: "player killed.",
            fail: {
                invalid_request: "Unable to kill player."
            }
        },
        loottable: {
            success: {
                ok: "已生成战利品表并给予玩家",
                no_item: "已生成战利品表，但没有获得任何物品"
            },
            fail: {
                invalid_request: "Unable to give player item."
            }
        },
        regeneration: {
            success: "已使玩家恢复 {n} 点生命",
            fail: {
                health_maximum: "玩家生命已达最大值",
                invalid_request: "无法使玩家恢复生命"
            }
        }
    },
    dead: {
        chest_open_cost: "你在开启 {name} 时透支了所有生命",
        chest_open_cost_unknow: "你在开启宝箱时透支了所有生命",
        magic_effect: "You were killed by a magic called {name}.",
        magic_unknow: "You were killed by magic.",
        monster_attack: "You were killed by {name}.",
        monster_attack_at_chest_open_cost: "你因为开启宝箱支付了过多生命而被 {name} 终结了",
        monster_attack_unknow: "You were killed by monster.",
        system: "你被来自系统的力量杀死了",
        unknow: "你被一股未知的神秘力量杀死了"
    },
    block: {
        air: "Air",
        chest: "Chest",
        slime: "Slime",
        stair: "Stairs",
        tentacle: "Tentacle"
    },
    effect: {
        level: {
            "0": "",
            "1": "I",
            "2": "II",
            "3": "III",
            "4": "IV",
            "5": "V",
            "6": "VI",
            "7": "VII",
            "8": "VIII",
            "9": "IX",
            "10": "X"
        },
        instant_damage: {
            name: "Instant Damage"
        },
        instant_health: {
            name: "Instant Health"
        }
    },
    item: {
        blood_chest: {
            name: "Blood Chest",
            description: "以你的生命作为开启宝箱的代价。"
        },
        bottle: {
            name: "Bottle",
            description: "A container that can hold liquids."
        },
        broadsword: {
            name: "Broadsword",
            description: "举起它十分费力，造成的伤害也十分可观。"
        },
        copper_chest: {
            name: "Copper Chest",
            description: "普通的宝箱。"
        },
        crowbar: {
            name: "Crowbar",
            description: "结实可靠的物理学圣剑。"
        },
        dagger: {
            name: "Dagger",
            description: "小巧灵活，可攻可守。"
        },
        emerald: {
            name: "Emerald",
            description: "A gemstone that can serve as currency."
        },
        emerald_chest: {
            name: "Emerald Chest",
            description: "支付绿宝石作为开启宝箱的代价。"
        },
        golden_chest: {
            name: "Golden Chest",
            description: "华丽的宝箱。"
        },
        hammer: {
            name: "Hammer",
            description: "结实可靠的动能武器。"
        },
        instant_damage_potion_t2: {
            name: "伤害药水",
            description: "看起来很危险，不是饮料。"
        },
        instant_health_potion_t2: {
            name: "治疗药水",
            description: "可以略微恢复生命。"
        },
        knife: {
            name: "Knife",
            description: "小巧灵活，适合突袭，甚至可以充当异世界转生装置。"
        },
        kunai: {
            name: "Kunai",
            description: "可远程攻击，攻击力不亚于常见武器。"
        },
        magnifier: {
            name: "Magnifier",
            description: "探索所需的必备道具。"
        },
        monster_crystal: {
            name: "Monster Crystal",
            description: "A part of the monster's heart, which is the energy source of the monster."
        },
        rapier: {
            name: "Rapier",
            description: "比短剑更长，但同时也保留了灵活性。作为代价，它很容易损坏。"
        },
        silver_chest: {
            name: "Silver Chest",
            description: "精致的宝箱。"
        },
        soul_camera: {
            name: "Soul Camera",
            description: "一种用途未知的古物。"
        },
        soul_camera_used: {
            name: "Expired Soul Camera",
            description: "一种用途未知的古物，看起来已经被使用过了。"
        },
        soul_camera_using: {
            name: "Activated Soul Camera",
            description: "一种用途未知的古物，看起来内部的装置正在运转，并发出了奇妙的光芒。"
        },
        spear: {
            name: "Spear",
            description: "更长的攻击距离会让你更有优势。"
        },
        sword: {
            name: "Sword",
            description: "A common melee weapon that is both offensive and defensive."
        },
        teach_weapon: {
            name: "Teach Wooden Sword",
            description: "一种练习道具，无法造成伤害。"
        },
        water_bottle: {
            name: "Water Bottle",
            description: "普通的一瓶水。"
        }
    },
    item_popup: {
        attribute: {
            attack: "ATK: {n}",
            defense: "DEF: {n}",
            health: "Durability: {n} / {max}"
        }
    }
}