class NumberProviders {
    constructor(data = {}) {
        this.data = {};

        this.create(data);
    }

    create(data) {
        if (typeof data == 'number') {
            this.data = {
                type:  'constant',
                value: data
            };
        } else if (typeof data == 'object') {
            switch (data.type) {
                case 'constant':
                case 'uniform':
                // case 'gaussian':
                case 'lens':
                    this.data = data;
                    break;
            
                default:
                    break;
            }
        } else {
            this.data = {
                type: 'NaN'
            };
        }

        return this.data;
    }

    getValue(...initValue) {
        switch (this.data.type) {
            // 常数
            case 'constant':
                return this.data?.value;

            // 随机平均分布
            case 'uniform':
                return Math.round(Math.random() * (this.data?.max - this.data?.min) + this.data?.min);

            // 随机正态分布
            // case 'gaussian':
            //     let u = 0, v = 0;
            //     while (u == 0) u = Math.random();
            //     while (v == 0) v = Math.random();
            //     let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            //     return Math.round(z * this.data.std + this.data.value);

            // 透镜
            case 'lens':
                if (this.data.input ?.min == undefined) this.data.input .min = 0;
                if (this.data.output?.min == undefined) this.data.output.min = 0;
                let inputLength  = this.data.input .max - this.data.input .min;
                let outputLength = this.data.output.max - this.data.output.min;
                let rate  = outputLength / inputLength;
                let value = Math.round((initValue[0] - this.data.input.min) * rate + this.data.output.min);
                if (value > this.data.output.max) value = this.data.output.max;
                if (value < this.data.output.min) value = this.data.output.min;
                return value;
        
            default:
                return;
        }
    }
}