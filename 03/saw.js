class Saw extends Enemy {
    constructor(x, y, cvWidth, cvHeight) {
        const spWidth = 213,
            spHeight = 212;
        super({
            pos: new Vector(x, y),
            width: spWidth / 2,
            height: spHeight / 2,
            sprite: new Sprite(spWidth, spHeight, 'assets/enemies/enemy4.png', 9)
        });
        this.speed = Math.random() * 4 + 1;
        this.cvHeight = cvHeight;
        this.cvWidth = cvWidth;
        this.spriteSpeed = Math.floor(Math.random() * 3 + 2);
        this.interval = Math.floor(Math.random() * 80 + 70);
        this.newX = Math.random() * (this.cvWidth - this.width);
        this.newY = Math.random() * (this.cvHeight - this.height);

        console.log(this);
    }
    
    /**
     * 
     * @param {number} gameframe 
     */
    move(gameframe) {
        if ( gameframe % this.spriteSpeed === 0 ) {
            this.spriteFrame = (this.spriteFrame + 1) % this.sprite.length;
        }
        if ( gameframe % this.interval === 0 ) {
            this.newX = Math.random() * (this.cvWidth - this.width);
            this.newY = Math.random() * (this.cvHeight - this.height);
        }
        const dx = this.pos.x - this.newX;
        const dy = this.pos.y - this.newY;
        this.pos.x -= dx / this.interval;
        this.pos.y -= dy / this.interval;
    }
}