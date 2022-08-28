class Bat extends Enemy {
    constructor(x, y, cvWidth, cvHeight) {
        const spWidth = 266,
            spHeight = 188;
        super({
            pos: new Vector(x, y),
            width: spWidth / 2,
            height: spHeight / 2,
            sprite: new Sprite(spWidth, spHeight, 'assets/enemies/enemy2.png', 6)
        });
        this.flap = Math.floor(Math.random() * 6 + 1);
        this.speed = Math.random() * 4 + 1;
        this.cvHeight = cvHeight;
        this.cvWidth = cvWidth;
        this.angle = Math.random() * 5;
        this.angleSpeed = Math.random() * .2;
        this.waveAmp = Math.random() * 6 + 1;
    }
    
    /**
     * 
     * @param {number} gameframe 
     */
    move(gameframe) {
        if ( gameframe % this.flap === 0 ) {
            this.spriteFrame = (this.spriteFrame + 1) % this.sprite.length;
        }
        // Horizontal position update
        this.pos.x -= this.speed;
        if (this.pos.x + this.width < 0) {
            this.pos.x = this.cvWidth
        }

        // Vertical position update
        this.pos.y += this.waveAmp * Math.sin(this.angle);
        this.angle += this.angleSpeed;
    }
}