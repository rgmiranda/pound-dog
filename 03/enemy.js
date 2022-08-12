
class Enemy {
    constructor(options) {

        const config = {
            pos: null,
            width: 0,
            height: 0,
            sprite: null
        }

        Object.assign(config, options);

        if (!config.pos instanceof Vector) {
            throw 'Vector expected for position';
        }
        if (!config.sprite instanceof Sprite) {
            throw 'Sprite expected';
        }

        /** @type {Vector} pos */
        this.pos = config.pos;
        /** @type {number} width */
        this.width = parseInt(config.width);
        /** @type {number} height */
        this.height = parseInt(config.height);

        /** @type {Sprite} sprite */
        this.sprite = config.sprite;
        this.img = new Image();
        this.img.src = this.sprite.img;
        this.spriteFrame = 0;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * */
    draw(ctx) {
        ctx.strokeStyle = '#cccccc';
        ctx.drawImage(this.img, this.spriteFrame * this.sprite.width, 0, this.sprite.width, this.sprite.height, this.pos.x, this.pos.y, this.width, this.height);
    }

    /**
     * 
     * @param {number} gameframe 
     */
    move(gameframe) {
        throw new Error('Unimplemented method');
    }
}