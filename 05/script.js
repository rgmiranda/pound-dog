
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const cvWidth = ( canvas.width = 800);
const cvHeight = ( canvas.height = 600);

const ravenInterval = 500;
let lastTime = 0;

/** @type {Raven[]} */
const ravens = [];

let canvasPosition = canvas.getBoundingClientRect();

const bgImage = new Image();
bgImage.src = 'background.png';

class Raven {
    constructor() {
        
        /** @type {FlyingState | ExplodingState} */
        this.state = new FlyingState(this);

        this.sizeModifier = Math.random() * 0.5 + 0.35;
        this.height = this.state.spriteHeight * this.sizeModifier;
        this.width = this.state.spriteWidth * this.sizeModifier;
        this.x = cvWidth;
        this.y = Math.random() * (cvHeight - this.height);
        this.active = true;

    }

    update(timestamp) {
        this.state.update(timestamp);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.state.draw(ctx);
    }

    /**
     * 
     * @param {FlyingState | ExplodingState} state 
     */
    setState(state) {
        this.state = state;
        this.height = this.state.spriteHeight * this.sizeModifier;
        this.width = this.state.spriteWidth * this.sizeModifier;
    }
}

class FlyingState {
    /**
     * 
     * @param {Raven} raven 
     */
    constructor (raven) {
        /**
         * @type {Raven}
         */
        this.raven = raven;

        this.spriteHeight = 194;
        this.spriteWidth = 271;
        this.spriteFrameCount = 6;
        this.spriteFrame = 0;
        this.spriteFameInterval = Math.random() * 50 + 50;
        this.spriteLastUpdate = 0;

        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;

        this.image = new Image();
        this.image.src = 'raven.png';
    }

    update(timestamp) {

        if (this.raven.y < 0 || this.raven.y > cvHeight - this.raven.height) {
            this.directionY *= -1;
        }

        const delta = timestamp - this.spriteLastUpdate;
        if (delta > this.spriteFameInterval) {
            this.spriteFrame = (this.spriteFrame + 1) % this.spriteFrameCount;
            this.spriteLastUpdate = timestamp;
        }

        this.raven.x -= this.directionX;
        this.raven.y += this.directionY;

        if (this.raven.x < -this.raven.width) {
            this.raven.active = false;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        const sx = this.spriteFrame * this.spriteWidth, sy = 0;
        ctx.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.raven.x, this.raven.y, this.raven.width, this.raven.height);
    }
}

class ExplodingState {
    /**
     * 
     * @param {Raven} raven 
     */
    constructor(raven) {
        /**
         * @type {Raven}
         */
        this.raven = raven;

        this.spriteHeight = 179;
        this.spriteWidth = 200;
        this.spriteFrameCount = 5;
        this.spriteFrame = 0;
        this.spriteFameInterval = 100;
        this.spriteLastUpdate = 0;

        this.image = new Image();
        this.image.src = 'boom.png';

    }

    update(timestamp) {

        const delta = timestamp - this.spriteLastUpdate;
        if (delta > this.spriteFameInterval) {
            this.spriteFrame++;
            this.spriteLastUpdate = timestamp;
        }

        if (this.spriteFrame >= this.spriteFrameCount) {
            this.raven.active = false;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        const sx = this.spriteFrame * this.spriteWidth, sy = 0;
        ctx.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.raven.x, this.raven.y, this.raven.width, this.raven.height);
    }
}

document.addEventListener('click', ev => {
    const px = ev.x - canvasPosition.left,
        py = ev.y - canvasPosition.top;
    for (let i = ravens.length - 1; i >= 0; i--) {
        let r = ravens[i];
        if (!r.active) {
            continue;
        }
        if (px < r.x || px > r.x + r.width) {
            continue;
        }
        if (py < r.y || py > r.y + r.height) {
            continue;
        }
        if (r.state instanceof ExplodingState) {
            continue;
        }
        r.setState(new ExplodingState(r));
        return;
    }
});

/**
 * 
 * @param {number} timestamp 
 */
function animate(timestamp) {
    ctx.clearRect(0, 0, cvWidth, cvHeight);

    ctx.drawImage(bgImage, 0, 0, cvWidth, cvHeight, 0, 0, cvWidth, cvHeight)

    let deltaTime = timestamp - lastTime;
    if (deltaTime > ravenInterval) {
        const newRaven = new Raven();
        if (ravens.length === 0) {
            ravens.push(newRaven);
        } else {
            let i, j, k;
            i = 0;
            k = ravens.length - 1;
            j = Math.floor((k + i) / 2);
            while (i < k) {
                if (ravens[j].width < newRaven.width) {
                    i = j + 1;
                } else {
                    k = j;
                }
                j = Math.floor((k + i) / 2);
            }
            if (ravens[j].width < newRaven.width) {
                ravens.splice(j + 1, 0, newRaven);
            } else {
                ravens.splice(j, 0, newRaven);
            }
        }
        lastTime = timestamp;
    }

    let i = 0;
    while (i < ravens.length) {
        ravens[i].draw(ctx);
        ravens[i].update(timestamp);
        if (!ravens[i].active) {
            ravens.splice(i, 1);
        } else {
            i++;
        }
    }

    requestAnimationFrame(animate);
}

animate(0);