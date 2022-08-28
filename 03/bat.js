class Bat extends Enemy {
    constructor(x, y) {
        const spWidth = 293,
            spHeight = 155;
        super({
            pos: new Vector(x, y),
            width: spWidth / 2,
            height: spHeight / 2,
            sprite: new Sprite(spWidth, spHeight, 'assets/enemies/enemy1.png', 6)
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