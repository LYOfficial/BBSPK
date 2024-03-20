class Resource {
    constructor() {
        this.data = {
            block: [],
            effect: [],
            item: [],
            loottable: {},
            generator: {}
        };
    }

    getBlock(id) {
        return JSON.parse(JSON.stringify(this.data.block.find((e) => {
            return e.id == id;
        })));
    }

    getEffect(id) {
        return JSON.parse(JSON.stringify(this.data.effect.find((e) => {
            return e.id == id;
        })));
    }

    getItem(id) {
        return JSON.parse(JSON.stringify(this.data.item.find((e) => {
            return e.id == id;
        })));
    }

    getLootTable(id) {
        return this.data.loottable[id];
    }

    getGenerator(id) {
        return this.data.generator[id];
    }
}