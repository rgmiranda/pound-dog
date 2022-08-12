class Bat extends Enemy {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 293 / 2,
            height: 155 / 2,
            sprite: new Sprite(293, 155, 'assets/enemies/enemy1.png', 6)
        });
        this.flap = Math.floor(Math.random() * 6 + 1);
    }
    
    /**
     * 
     * @param {number} gameframe 
     */
    move(gameframe) {
        if ( gameframe % this.flap === 0 ) {
            this.spriteFrame = (this.spriteFrame + 1) % this.sprite.length;
        }
        this.pos.x += Math.random() * 10 - 5;
        this.pos.y += Math.random() * 10 - 5;
    }
}