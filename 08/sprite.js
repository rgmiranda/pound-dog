export class Sprite {

  /** @type { HTMLImageElement } */
  #img;
  /** @type { number } */
  #width;
  /** @type { number } */
  #height;

  /**
   * 
   * @param { HTMLImageElement } img 
   * @param { number } width 
   * @param { number } height 
   */
  constructor(img, width, height) {
    if (!img instanceof HTMLImageElement) {
      throw new TypeError('HTMLImageElement expected');
    }
    this.#img = img;
    this.#width = width;
    this.#height = height;
  }

  get img() {
    return this.#img;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }
}
