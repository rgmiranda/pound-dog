import { Player } from "./player.js";

export class State {

  /**
   * 
   * @param { Player } player 
   */
  constructor (player) {
    if (!player instanceof Player) {
      throw new TypeError('Player expected');
    }
    /** @type { Player } */
    this.player = player;

    /** @type { number } */
    this.spriteX = 0;
    
    /** @type { number } */
    this.spriteY = 0;
    
    /** @type { number } */
    this.spriteFrameCount = 0;
    
    /** @type { number } */
    this.animationInterval = 0;
    
    /** @type { number } */
    this.lastAnimationTime = 0;
  }

  /**
   * 
   * @param { number } deltaTime 
   */
   update(deltaTime) {
    this.lastAnimationTime += deltaTime;
    if (this.lastAnimationTime > this.animationInterval) {
      this.spriteX = (this.spriteX + 1) % this.spriteFrameCount;
      this.lastAnimationTime = 0;
    }
  }

  /**
   * 
   * @param { CanvasRenderingContext2D } ctx 
   * @param { HTMLImageElement } img
   */
  draw(ctx) {
    const img = this.player.sprite.img,
      sx = this.player.sprite.width * this.spriteX,
      sy = this.player.sprite.height * this.spriteY,
      sw = this.player.sprite.width,
      sh = this.player.sprite.height,
      dx = this.player.position.x,
      dy = this.player.position.y,
      dw = this.player.width,
      dh = this.player.height;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}

export class StantingState extends State {

  constructor(player) {
    super(player);
    this.animationInterval = 50;
    this.spriteFrameCount = 7;
    this.spriteY = 0;
  }

}

