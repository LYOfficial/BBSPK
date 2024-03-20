class SMath {
    constructor() {

    }

    static random(max = 1, min = 0, seed = 0) {
        if (seed == 0 || seed == '' || seed == undefined) {
            seed = Math.random() * Math.pow(2, 53);
        }

        let rnd = ((seed * 9301 + 49297) % 233280) / 233280.0;
        
        return Math.ceil( min + rnd * (max - min) );
    }

    static randomFloat(seed = 0) {
        if (seed == 0 || seed == '' || seed == undefined) {
            seed = Math.random() * Math.pow(2, 53);
        }

        return ((seed * 9301 + 49297) % 233280) / 233280.0;
    }
}