class Vector {
    constructor (x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        if (isNaN(this.x) || isNaN(this.y)) {
            throw 'Invalid value received';
        }
    }

    add(v) {
        if (v instanceof Vector) {
            return new Vector(this.x + v.x, this.y + v.y);
        }
        if (typeof v === 'object' && !isNaN(parseInt(v.x)) && !isNaN(parseInt(v.y))) {
            return new Vector(this.x + parseInt(v.x), this.y + parseInt(v.y));
        }
        if (!isNaN(parseInt(v))) {
            return new Vector(this.x + parseInt(v), this.y + parseInt(v));
        }
        throw 'Could not add the vector';
    }

    sub(v) {
        if (v instanceof Vector) {
            return new Vector(this.x - v.x, this.y - v.y);
        }
        if (typeof v === 'object' && !isNaN(parseInt(v.x)) && !isNaN(parseInt(v.y))) {
            return new Vector(this.x - parseInt(v.x), this.y - parseInt(v.y));
        }
        if (!isNaN(parseInt(v))) {
            return new Vector(this.x - parseInt(v), this.y - parseInt(v));
        }
        throw 'Could not sub the vector';
    }

    dist(v) {
        let dv = this.sub(v);
        return dv.mag();
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}