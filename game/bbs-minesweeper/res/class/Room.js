class Room {
    constructor(generator) {
        this.name             = 'room';
        this.stage            = [];
        this.selectedStage    = 0;
        this.generator        = undefined;
        this.lastCreatedStage = -1;

        this.create(generator);
    }

    create(generator) {
        this.setGenerator(generator);
        this.newStage();
    }

    newStage(stage) {
        if (stage == undefined) {
            stage = this.lastCreatedStage + 1;
        }
        this.lastCreatedStage = stage;

        let g;

        if (this.generator != undefined) {
            g = this.generator.getStage(stage);
        }

        let s = new Stage(g);
        
        this.stage[stage] = s;
    }

    search(stage, y, x) {
        return this.stage[stage].search(y, x);
    }

    goto(stage, y, x) {
        return this.stage[stage].goto(y, x);
    }

    switchStage(stage) {
        this.selectedStage = stage;
        if (this.stage[stage] == undefined) {
            this.newStage(stage);
        }
        return this.selectedStage;
    }

    setBlock(stage, y, x, id, data = undefined) {
        return this.stage[stage].setBlock(y, x, id, data);
    }

    getSelectedStage() {
        return this.stage[this.selectedStage];
    }

    setGenerator(generator) {
        this.generator = generator;
    }
}