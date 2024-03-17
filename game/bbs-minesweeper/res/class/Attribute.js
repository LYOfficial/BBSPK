class Attribute {
    constructor(name = '', base = 0, from = '') {
        this.name = name;
        this.base = base;
        this.from = from;

        if (name == 'health_max' && this.base % 2 != 0) this.base++;
    }
}