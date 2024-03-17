class Tester {
    constructor(world, player, resource) {
        this.world = world;
        this.player = player;
        this.resource = resource;
    }

    mapClear(autoSlot = false) {
        let stage = this.world.getSelectedRoom().getSelectedStage()
        let size = stage.size;
        for (let i = 0; i < size.height; i++) {
            for (let j = 0; j < size.width; j++) {
                if (autoSlot) {
                    if (stage.map[i][j].type == 'monster') {
                        p.selectSlot(1);
                    } else {
                        p.selectSlot(0);
                    }
                }
                this.player.goto(i, j);
            }
        }
    }

    nextMapClear(autoSlot = false) {
        this.player.switchStage(this.world.getSelectedRoom().stage.length);
        this.mapClear(autoSlot);
    }

    giveMeAllWeapon() {
        let chest = new ItemChest('golden_chest');
        chest.data.chest.inventory = [
            new Weapon('sword'),
            new Weapon('dagger'),
            new Weapon('knife'),
            new Weapon('spear'),
            new Weapon('kunai'),
            new Weapon('broadsword'),
            new Weapon('hammer'),
            new Weapon('crowbar'),
            new Weapon('rapier'),
            new Weapon('teach_weapon')
        ]
        this.player.give(chest);
    }

    giveMeAllItem() {
        let items = [];
        this.resource.data.item.forEach(e => {
            items.push(ItemGenerator.get(e.id))
        });
        this.player.giveItems(items);
    }

    russianDolls() {
        let golden_chest = new ItemChest('golden_chest');
        let silver_chest = new ItemChest('silver_chest');
        let copper_chest = new ItemChest('copper_chest');
        copper_chest.data.chest.inventory = [new Item('emerald')];
        silver_chest.data.chest.inventory = [copper_chest];
        golden_chest.data.chest.inventory = [silver_chest];
        this.player.give(golden_chest);
    }

    getBloodChest() {
        let chest = new ItemChest('blood_chest');
        chest.data.chest.inventory = [new Item('monster_crystal')];
        this.player.give(chest);
    }

    getParadoxChest() {
        let chest = new ItemChest('golden_chest');
        chest.data.chest.inventory = [chest];
        chest.custom = {
            name: '悖论之箱',
            description: '这个箱子的内容物是它自己，也就是说你可以从箱子里源源不断地拿出箱子。但问题是，开启箱子的那一刻，箱子本身会被销毁，被拿出来的箱子也是被销毁的箱子，因此你无法获得任何东西。箱子越多，箱子越少。'
        };
        this.player.give(chest);
    }

    getParadoxChest2() {
        let chest = new ItemChest('emerald_chest');
        chest.data.chest.inventory = [new Item('emerald')];
        chest.data.chest.open_cost.item.id = 'emerald_chest';
        chest.custom = {
            name: '悖论之箱 · II',
            description: '开启这个箱子需要消耗一个绿宝石宝箱，但它自己就是绿宝石宝箱。那么问题来了，如果开启箱子，这个箱子会被作为开启代价销毁，还是成功开启后销毁？如何做到损失最小化？'
        };
        this.player.give(chest);
    }

    getDebugItem() {
        this.player.give(ItemGenerator.get('debug_sword'));
    }
}