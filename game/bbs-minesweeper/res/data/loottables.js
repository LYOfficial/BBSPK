let db_loottable = {
    test: {
        type: 'generic',
        pools: [
            {
                entries: [
                    {
                        type: 'item',
                        name: 'sword'
                    }, {
                        type: 'item',
                        name: 'dagger'
                    }
                ]
            }
        ]
    },
    chest_generic: {
        type: 'chest',
        pools: [
            {
                entries: [
                    {
                        type: 'item',
                        name: 'emerald'
                    }, {
                        type: 'item',
                        name: 'firewall_t1',
                        weight: 0.1
                    }, {
                        type: 'item',
                        name: 'firewall_t2',
                        weight: 0.05
                    }, {
                        type: 'item',
                        name: 'firewall_t3',
                        weight: 0.0125
                    }
                ]
            }
        ]
    },
    chest_generic_weapon: {
        type: 'chest',
        pools: [
            {
                entries: [
                    {
                        type: 'item',
                        name: 'emerald'
                    }, {
                        type: 'item',
                        name: 'firewall_t1',
                        weight: 0.3
                    }, {
                        type: 'item',
                        name: 'firewall_t2',
                        weight: 0.2
                    }, {
                        type: 'item',
                        name: 'firewall_t3',
                        weight: 0.1
                    }
                ]
            }
        ]
    },
    chest_generic_potion: {
        type: 'chest',
        pools: [
            {
                entries: [
                    {
                        type: 'item',
                        name: 'instant_health_potion_t2'
                    }, {
                        type: 'item',
                        name: 'instant_damage_potion_t2',
                        weight: 0.3
                    }
                ]
            }
        ]
    },
    monster_generic: {
        type: 'monster',
        pools: [
            {
                entries: [
                    {
                        type: 'item',
                        name: 'monster_crystal'
                    }
                ]
            }
        ]
    },
    void: {
        type: 'chest',
        pools: [
            {
                entries: []
            }
        ]
    }
};