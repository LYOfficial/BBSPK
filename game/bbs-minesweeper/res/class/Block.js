class Block {
    constructor(id = 'air', y = 0, x = 0) {
        this.name     = 'block';
        this.id       = 'air';
        this.type     = 'air';
        this.data     = {};
        this.searched = false;
        this.damaged  = false;
        this.search   = {
            stair:   0,
            chest:   0,
            monster: 0
        };
        this.pos      = {
            x: x,
            y: y
        };

        if (id != 'air') this.create(id);
    }

    // 我在搞什么玩意儿？
    create(id = 'air') {
        this.id   = id;
        this.type = id;
        return this;
    }

    set(id, data = undefined) {
        let b = resource.getBlock(id);
        if (b == undefined) return;
        this.id   = b.id;
        this.type = b.type;
        this.data = {};

        if (b?.data != undefined) {
            this.data = b.data;
        }
        
        if (data != undefined) {
            this.data = {...this.data, ...data};
        }

        return this;
    }
}