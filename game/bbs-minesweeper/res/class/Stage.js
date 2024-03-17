class Stage {
    constructor(generator) {
        this.name      = 'stage';
        this.size      = {
            height: 5,
            width:  5
        };
        this.map       = [];
        this.generator = generator;
        this.generated = false;
        this.features  = {
            chaos:       false,
            foggy:       false,
            waterlogged: false
        };

        this.create();
    }

    create(height = '5', width = '5') {
        if (this.generator != undefined) {
            this.size.height = this.generator.size.height;
            this.size.width  = this.generator.size.width;
        } else {
            this.size.height = height;
            this.size.width  = width;
        }
        for (let i = 0; i < this.size.height; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.size.width; j++) {
                this.map[i][j] = new Block('air', i, j);
            }
        }
    }

    clear() {
        this.generated = false;
        this.map  = [];
        this.create();
    }

    search(y, x) {
        if (this.generated == false) this.generate([y, x]);
        if (y >= this.size.height || y < 0) return;
        if (x >= this.size.width  || x < 0) return;
        if (this.map[y][x].searched) return;
        let searchingBlock = [];

        let startX = 0;
        let startY = 0;
        let cutX   = 0;
        let cutY   = 0;

        if (x == 0) { startX = 0; cutX = 1; } else { startX = x - 1; }
        if (y == 0) { startY = 0; cutY = 1; } else { startY = y - 1; }

        let lenghtX = Math.min(this.size.width  - startX, 3 - cutX);
        let lenghtY = Math.min(this.size.height - startY, 3 - cutY);

        for (let i = 0; i < lenghtY; i++) {
            for (let j = 0; j < lenghtX; j++) {
                if (i != 1 - cutY || j != 1 - cutX) {
                    searchingBlock.push(this.map[startY + i][startX + j]);
                }
            }
        }

        // return searchingBlock;

        let search = {
            chaos:   this.features.chaos,
            stair:   0,
            chest:   0,
            monster: 0
        };

        searchingBlock.forEach(e => {
            switch (e.type) {
                case 'stair':
                    search.stair++;
                    break;

                case 'chest':
                    search.chest++;
                    break;

                case 'monster':
                    search.monster++;
                    break;
            
                default:
                    break;
            }
        });

        this.map[y][x].search   = search;
        this.map[y][x].searched = true;

        return search;
    }

    goto(y, x) {
        if (this.generated == false) this.generate([y, x]);
        if (this.map[y][x].type != 'air') {
            if (this.map[y][x].type == 'stair' && this.map[y][x].searched) {
                return {
                    state: 'stair',
                    pos:   [y, x],
                    type:  this.map[y][x].type,
                    data:  this.map[y][x]?.data,
                    block: this.map[y][x]
                }
            }
            this.map[y][x].searched = true;
            return {
                state: 'event',
                pos:   [y, x],
                type:  this.map[y][x].type,
                data:  this.map[y][x]?.data,
                block: this.map[y][x]
            }
        } else {
            let s = this.search(y, x);
            if (s != undefined) {
                return {
                    state:  'search',
                    pos:    [y, x],
                    search: s,
                    block:  this.map[y][x]
                }
            } else {
                return {
                    state: 'none',
                    pos:   [y, x],
                    block: this.map[y][x]
                }
            }
        }
    }

    setBlock(y, x, id, data = undefined) {
        if (y >= this.size.height || y < 0) return;
        if (x >= this.size.width  || x < 0) return;
        return this.map[y][x].set(id, data);
    }

    setMap(mapdata) {
        for (let i = 0; i < mapdata.length; i++) {
            for (let j = 0; j < mapdata[i].length; j++) {
                this.setBlock(i, j, mapdata[i][j].id, mapdata[i][j]?.data);
            }
        }
    }

    generate(start = [0, 0]) {
        if (this.generator != undefined) {
            if (this.generator?.features != undefined) {
                this.features = {...this.features, ...this.generator.features};
            }
            let chest   = this.generator.blocks.find(function(e) {
                return e.id == 'chest';
            });
            let monster = this.generator.blocks.find(function(e) {
                return e.id == 'monster';
            });
            let stair   = this.generator.blocks.find(function(e) {
                return e.id == 'stair';
            });
            let chestCount   = chest   != undefined ? chest  .count : 0;
            let monsterCount = monster != undefined ? monster.count : 0;
            let stairCount   = stair   != undefined ? stair  .count : 0;
            // this.setMap(game.randomStageGenerate(this.generator.size.height, this.generator.size.width, start, {chestCount:chestCount, monsterCount:monsterCount, stairCount: stairCount}));
            this.setMap(game.randomStageGenerate(this.generator.size.height, this.generator.size.width, start, {blocks: this.generator.blocks}));
        } else {
            this.setMap(game.randomStageGenerate(this.size.height, this.size.width, start, {chestCount:5, monsterCount:6, stairCount: 2}));
        }
        this.generated = true;
    }
}