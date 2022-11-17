export class Vector {
  #mag = 0;
  #x = 0;
  #y = 0;
  #angle = 0;

  constructor (x, y) {
    if (arguments.length !== 2) {
      throw Error('Two parameteres are required');
    }
    this.#x = parseFloat(x);
    this.#y = parseFloat(y);
    this.#generateValues();
  }

  static fromAngle(angle) {
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return new Vector(x, y);
  }

  #generateValues() {
    this.#mag = Math.sqrt(this.#x * this.#x + this.#y * this.#y);
    this.#angle = this.#mag > 0 ? Math.abs(Math.asin(this.#x / this.#mag)) : 0;
  }

  get mag() {
    return this.#mag;
  }

  get angle() {
    return this.#angle;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = parseFloat(value);
    this.#generateValues();
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = parseFloat(value);
    this.#generateValues();
  }

  mult(num) {
    this.#x *= parseFloat(num);
    this.#y *= parseFloat(num);
    this.#generateValues();
  }

  add (v) {
    if (!v instanceof Vector) {
      throw new TypeError('Vector class expected')
    }
    this.#x += v.x;
    this.#y += v.y;
    this.#generateValues();
  }

  sub (v) {
    if (!v instanceof Vector) {
      throw new TypeError('Vector class expected')
    }
    this.#x -= v.x;
    this.#y -= v.y;
    this.#generateValues();
  }
}
