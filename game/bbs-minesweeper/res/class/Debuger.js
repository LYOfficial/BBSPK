class Debuger {
    constructor() {
        this.__master         = false;
        this.__item           = {
            no_damage:          false
        };
        this.__player         = {
            dead_action:        true,
            no_damage:          false
        };

        this.boundEvent  = {
            debugMessageOutput: function() {}
        };
    }

    bind(event, action = function() {}) {
        return this.boundEvent[event] = action;
    }

    debugOutput(name, value) {
        this.boundEvent.debugMessageOutput({
            name:  name,
            value: value
        });
    }

    debugSet(type, path, value, valueType = 'boolean') {
        if (typeof value !== valueType || value === this['__' + type][path]) return;
        this.debugOutput(type + '_' + path, value);
        return this['__' + type][path] = value;
    }

    get master() {
        return this.__master;
    }

    set master(value) {
        if (typeof value !== 'boolean' || value === this.__master) return;
        this.debugOutput('master', value);
        return this.__master = value;
    }

    get player_dead_action() {
        return this.__master && this.__player.dead_action;
    }

    set player_dead_action(value) {
        return this.debugSet('player', 'dead_action', value);
    }

    get player_no_damage() {
        return this.__master && this.__player.no_damage;
    }

    set player_no_damage(value) {
        return this.debugSet('player', 'no_damage', value);
    }

    get item_no_damage() {
        return this.__master && this.__item.no_damage;
    }

    set item_no_damage(value) {
        return this.debugSet('item', 'no_damage', value);
    }
}