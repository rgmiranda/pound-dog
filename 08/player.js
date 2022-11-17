import { Sprite } from "./sprite.js";
import { State } from "./state.js";
import { Vector } from "./vector.js";

export class Player {

  /** @type { number } */
  #gameWidth;
  /** @type { number } */
  #gameHeight;
  /** @type { State } */
  #state;
  /** @type { Sprite } */
  #sprite;
  /** @type { number } */
  #width;
  /** @type { number } */
  #height;
  /** @type { Vector } */
  #position;

  /**
   * 
   * @param { number } gameWidth 
   * @param { number } gameHeight 
   */
  constructor (gameWidth, gameHeight) {
    const p = 0.6;
    this.#gameHeight = gameHeight;
    this.#gameWidth = gameWidth;
    this.#state = undefined;
    this.#sprite = new Sprite(document.getElementById('dog-sprite'), 200, 181.83);
    this.#width = this.#sprite.width * p;
    this.#height = this.#sprite.height * p;
    this.#position = new Vector((gameWidth - this.#width) * 0.5, this.#gameHeight - this.#height);
  }

  /**
   * 
   * @param { CanvasRenderingContext2D } ctx 
   */
  draw (ctx) {
    const img = this.#sprite.image,
      sx = this.#sprite.width * this.#sprite.x,
      sy = this.#sprite.height * this.#sprite.y,
      sw = this.#sprite.width,
      sh = this.#sprite.height,
      dx = this.#position.x,
      dy = this.#position.y,
      dw = this.#width,
      dh = this.#height;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  /**
   * 
   * @param { number } deltaTime 
   */
  update(deltaTime) {
    if (this.#state) {
      this.#state.update(deltaTime);
    }
  }

  /**
   * 
   * @param { CanvasRenderingContext2D } ctx 
   */
  draw(ctx) {
    if (this.#state) {
      this.#state.draw(ctx);
    }
  }

  set state(st) {
    if (!st instanceof State) {
      throw new TypeError('State expected');
    }
    this.#state = st;
  }

  get state() {
    return this.#state;
  }

  get sprite() {
    return this.#sprite;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get position() {
    return this.#position;
  }
}
