let db_items = [
    {
        id: 'magnifier',
        type: 'search',
        quality: 'normal'
    }, {
        id: 'emerald',
        type: 'item',
        quality: 'normal'
    }, {
        id: 'monster_crystal',
        type: 'item',
        quality: 'normal'
    }, {
        id: 'soul_camera',
        type: 'item',
        quality: 'senior'
    }, {
        id: 'soul_camera_using',
        type: 'item',
        quality: 'senior'
    }, {
        id: 'soul_camera_used',
        type: 'item',
        quality: 'senior'
    }, {
        id: 'sword',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 2,
                defense: 1,
                attack_cost: 1,
                defense_cost: 0,
                health: 50
            }
        }
    }, {
        id: 'dagger',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 1,
                defense: 1,
                attack_cost: 0,
                defense_cost: 1,
                health: 75
            }
        }
    }, {
        id: 'knife',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 1,
                defense: 0,
                attack_cost: 0,
                defense_cost: 0,
                health: 25
            }
        }
    }, {
        id: 'spear',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 2,
                defense: 0,
                attack_cost: 1,
                defense_cost: 0,
                health: 50
            }
        }
    }, {
        id: 'kunai',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 3,
                defense: 0,
                attack_cost: 1,
                defense_cost: 0,
                health: 100
            }
        }
    }, {
        id: 'broadsword',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 4,
                defense: 3,
                attack_cost: 3,
                defense_cost: {
                    type: 'lens',
                    value: {
                        max: 3,
                        min: 1
                    }
                },
                health: 100
            }
        }
    }, {
        id: 'hammer',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 3,
                defense: 0,
                attack_cost: 2,
                defense_cost: 0,
                health: 200
            }
        }
    }, {
        id: 'crowbar',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 2,
                defense: 1,
                attack_cost: 1,
                defense_cost: 1,
                health: 500
            }
        }
    }, {
        id: 'rapier',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 2,
                defense: 2,
                attack_cost: 1,
                defense_cost: 0,
                health: 35
            }
        }
    }, {
        id: 'teach_weapon',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 0,
                defense: 1,
                attack_cost: 1,
                defense_cost: 0,
                health: 35
            }
        }
    }, {
        id: 'soul_trace_boomerang',
        type: 'weapon',
        quality: 'senior',
        data: {
            attribute: {
                attack: 6,
                defense: 0,
                attack_cost: 1,
                defense_cost: 0,
                health: 75
            },
            not_damage_chest: true
        }
    }, {
        id: 'debug_sword',
        type: 'weapon',
        quality: 'super_rarity',
        data: {
            attribute: {
                attack: 1024,
                defense: 1024,
                attack_cost: 0,
                defense_cost: 0,
                health: 32768
            },
            not_damage_chest: true
        }
    }, {
        id: 'golden_chest',
        type: 'chest',
        quality: 'super_rarity'
    }, {
        id: 'silver_chest',
        type: 'chest',
        quality: 'rarity'
    }, {
        id: 'copper_chest',
        type: 'chest',
        quality: 'senior'
    }, {
        id: 'blood_chest',
        type: 'chest',
        quality: 'rarity',
        data: {
            chest: {
                open_cost: {
                    health: 1
                }
            }
        }
    }, {
        id: 'emerald_chest',
        type: 'chest',
        quality: 'rarity',
        data: {
            chest: {
                open_cost: {
                    item: {
                        id: 'emerald',
                        count: 1
                    }
                }
            }
        }
    }, {
        id: 'bottle',
        type: 'water_bottle',
        quality: 'normal'
    }, {
        id: 'water_bottle',
        type: 'water_bottle',
        quality: 'normal',
        data: {
            liquid: 'water'
        }
    }, {
        id: 'instant_health_potion_t2',
        type: 'water_bottle',
        quality: 'senior',
        data: {
            effect: [
                {
                    id: 'instant_health',
                    level: 4,
                    round: 1
                }
            ],
            liquid: 'water'
        }
    }, {
        id: 'instant_damage_potion_t2',
        type: 'water_bottle',
        quality: 'senior',
        data: {
            effect: [
                {
                    id: 'instant_damage',
                    level: 4,
                    round: 1
                }
            ],
            liquid: 'water'
        }
    }, {
        id: 'firewall_t1',
        type: 'weapon',
        quality: 'normal',
        data: {
            attribute: {
                attack: 1,
                defense: 1,
                attack_cost: 1,
                defense_cost: 0,
                health: 10
            }
        }
    }, {
        id: 'firewall_t2',
        type: 'weapon',
        quality: 'rarity',
        data: {
            attribute: {
                attack: 2,
                defense: 1,
                attack_cost: 1,
                defense_cost: 0,
                health: 20
            }
        }
    }, {
        id: 'firewall_t3',
        type: 'weapon',
        quality: 'super_rarity',
        data: {
            attribute: {
                attack: 3,
                defense: 2,
                attack_cost: 1,
                defense_cost: 0,
                health: 50
            }
        }
    }, {
        id: 'firewall_t1_s',
        type: 'weapon',
        quality: 'senior',
        data: {
            attribute: {
                attack: 1,
                defense: 0,
                attack_cost: 1,
                defense_cost: 0,
                health: 30
            }
        }
    }
];