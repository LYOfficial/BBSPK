class PixelHotkeys {
    constructor() {
        this.name   = 'pixel-hotkeys';
        this.images = [];
        this.maps   = [];
        this.index  = [];
    }

    setImage(url, index = -1) {
        if (index != -1) {
            if (index > this.images.length) return;
            return this.images[index] = url;
        } else {
            return this.images.push(url);
        }
    }

    setMap(data, index = -1) {
        if (index != -1) {
            if (index > this.maps.length) return;
            return this.maps[index] = data;
        } else {
            return this.maps.push(data);
        }
    }

    setIndex(data, index = -1) {
        let objNew = {};
        for (const e in data) {
            if (Object.hasOwnProperty.call(data, e)) {
                const element = data[e];
                objNew[e] = e;
                element.forEach(e2 => {
                    objNew[e2] = e;
                });
            }
        }

        if (index != -1) {
            if (index > this.index.length) return;
            return this.index[index] = objNew;
        } else {
            return this.index.push(objNew);
        }
    }

    _getPos(value) {
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        let int = [ 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15];
        value = value.toLowerCase();
        let x = [
            value.substr(0,1),
            value.substr(1,1)
        ];

        x.forEach(e => {
            if (hex[e] == undefined) return;
        });

        return [
            int[hex.indexOf(x[0])],
            int[hex.indexOf(x[1])]
        ];
    }

    getKeyStyle() {
        let style = '';
        for (const key in this.maps) {
            if (Object.hasOwnProperty.call(this.maps, key)) {
                const element = this.maps[key];
                for (const key2 in element) {
                    if (Object.hasOwnProperty.call(element, key2)) {
                        const element2 = element[key2];
                        let pos = this._getPos(element2.pos);
                        style += `.${this.name}-key[data-${this.name}-name="${key2}"]{--${this.name}-pos-x:-${pos[0]};--${this.name}-pos-y:-${pos[1]};}`
                    }
                }
            }
        }
        return style;
    }

    getKeyDOM(expression, label = '') {
        expression = expression.replace(/\s{2,}/g, ' ');
        let label2 = expression.split('|');
        let exp = label2[0].toLowerCase().split(' ');

        if (label == '' && label2[1] != undefined) label = label2[1].replace(/(^\s*)|(\s*$)/g, '');

        let keys = [];
        exp.forEach(e => {
            for (const key in this.index) {
                if (Object.hasOwnProperty.call(this.index, key)) {
                    const e2 = this.index[key];
                    if (e2[e] != undefined) {
                        keys.push({
                            index: key,
                            key: e2[e],
                            size: this.maps[key][e2[e]].size
                        });
                        break;
                    }
                }
            }
        });

        let str = '';
        keys.forEach(e => {
            str += `<span class="${this.name}-key${e.size == 2 ? ' pixel-hotkeys-key-long' : '' }" data-${this.name}-name="${e.key}"></span>`
        });

        return `<span class="${this.name}-key-box">${str}<span class="${this.name}-key-label">${label}</span></span>`;
    }
}