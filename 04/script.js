
/**
 * @var {HTMLCanvasElement} canvas
 */
const canvas = document.getElementById('canvas');

/**
 * @var {CanvasRenderingContext2D} ctx
 */
const ctx = canvas.getContext('2d');

let canvasPosition = canvas.getBoundingClientRect();

const cvWidth = ( canvas.width = 800);
const cvHeight = ( canvas.height = 600);

class Explosion {
    constructor (x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';

        this.frame = 0;
        this.active = true;
        this.angle = Math.random() * Math.PI * 2;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
    }

    update() {
        if (!this.active) {
            return;
        }
        if (this.timer === 0) {
            this.sound.play();
        }
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
        if (this.frame >= 5) {
            this.active = false;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            - this.width * 0.5,
            - this.height * 0.5,
            this.width,
            this.height
        );
        ctx.restore();
    }
}

const explosions = [];

window.addEventListener('click', (ev) => {
    const px = ev.x - canvasPosition.left,
        py = ev.y - canvasPosition.top;
    explosions.push(new Explosion(px, py));
});

function animate() {
    let i = 0;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvWidth, cvHeight);
    while (i < explosions.length) {
        explosions[i].draw(ctx);
        explosions[i].update();
        if (explosions[i].active) {
            i++;
        } else {
            explosions.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

animate();