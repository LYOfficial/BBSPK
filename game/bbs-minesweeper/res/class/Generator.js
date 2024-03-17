class Generator {
    constructor(value) {
        this.data = {
            type:   'generic',
            stages: []
        };

        this.create(value);
    }

    create(value) {
        if (typeof value == 'object') {
            this.data = {...this.data, ...value};
        } else if (typeof value == 'string') {
            let d = resource.getGenerator(value);
            if (d != undefined) {
                this.data = {...this.data, ...d};
            }
        }
    }

    getStage(index) {
        return this.data.stages.find(function(e) {
            return e.stage.max >= index && e.stage.min <= index;
        });
    }
}