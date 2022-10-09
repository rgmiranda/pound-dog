window.addEventListener('load', function() {
    /** @type { HTMLCanvasElement } */
    const canvas = this.document.getElementById('main-canvas');
    const cvWidth = (canvas.width = 800);
    const cvHeight = (canvas.height = 600);

    /** @type { CanvasRenderingContext2D } */
    const ctx = canvas.getContext('2d');

    class InputHandler {
        constructor() {
            this.keys = [];
            const self = this;
            window.addEventListener('keydown', function(e) {
                if (e.key.indexOf('Arrow') === 0 && self.keys.indexOf(e.key) === -1) {
                    self.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', function(e) {
                const idx = self.keys.indexOf(e.key);
                if (idx !== -1) {
                    self.keys.splice(idx, 1);
                }
            });

        }
    }

    class Player {

        sprites = {
            stand: {
                pos: 0,
                count: 7,
            },
            run: {
                pos: 3,
                count: 9
            }
        };

        constructor (gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.spritFrameInterval = 50;
            this.spriteFrameLastUpdate = 0;
            this.spriteX = 0;
            this.spriteY = 3;
            this.spriteWidth = 575;
            this.spriteHeight = 523;
            this.spriteCount = 8;
            this.image = new Image();
            this.image.src = 'dog.png';
            this.width = this.spriteWidth * 0.3;
            this.height = this.spriteHeight * 0.3;
            this.x = (gameWidth + this.width) * 0.5;
            this.y = gameHeight - this.height;

            this.speedX = 0;
            this.speedY = 0;
            this.weight = 1;
        }

        /**
         * 
         * @param { CanvasRenderingContext2D } ctx 
         */
        draw(ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        /**
         * 
         * @param { number } timestamp 
         * @param { InputHandler } input 
         */
        update(timestamp, input) {
            const deltaTime = timestamp - this.spriteFrameLastUpdate;
            if (deltaTime > this.spritFrameInterval) {
                this.spriteX = (this.spriteX + 1) % this.spriteCount;
                this.spriteFrameLastUpdate = timestamp;
            }

            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speedX = 5;
                this.spriteY = 3;
                this.spriteCount = 8;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speedX = -5;
                this.spriteY = 3;
                this.spriteCount = 8;
            } else {
                this.speedX = 0;
                this.spriteY = 0;
                this.spriteCount = 7;
            }

            if ((input.keys.indexOf('ArrowUp') > -1) && this.onGround()) {
                this.speedY += -20;
                this.spriteY = 3;
                this.spriteCount = 8;
            }

            this.x += this.speedX;
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width;
            }
            this.y += this.speedY;
            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height;
            }
            if (!this.onGround()) {
                this.speedY += this.weight;
                this.spriteY =
            } else {
                this.speedY = 0;
            }
            
        }

        /**
         * 
         * @param { CanvasRenderingContext2D } ctx 
         */
        draw(ctx) {
            const sx = this.spriteX * this.spriteWidth,
                sy = this.spriteY * this.spriteHeight,
                sw = this.spriteWidth,
                sh = this.spriteHeight,
                dx = this.x,
                dy = this.y,
                dw = this.width,
                dh = this.height;
            ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {
        constructor(srcImg, width, speed) {
            this.position = 0;
            this.image = new Image();
            this.image.src = srcImg;
            this.width = width;
            this.speed = speed;
        }
    
        move() {
            this.position -= this.speed;
            if (this.position < -this.width) {
                this.position = this.position + this.width;
            }
        }
    
        draw(ctx) {
            ctx.drawImage(this.image, this.position, 0);
            if (this.position < -this.width + CV_WIDTH) {
                ctx.drawImage(this.image, this.position + this.width, 0);
            } 
        }
    }
    
    const layersMeta = [
        {
            img: './assets/bgl/layer-1.png',
            h: 720,
            w: 2400
        },
        {
            img: './assets/bgl/layer-2.png',
            h: 720,
            w: 2400
        },
        {
            img: './assets/bgl/layer-3.png',
            h: 720,
            w: 2400
        },
        {
            img: './assets/bgl/layer-4.png',
            h: 720,
            w: 2400
        },
        {
            img: './assets/bgl/layer-5.png',
            h: 720,
            w: 2400
        },
    ];
    
    const layers = layersMeta.map( (item, idx) => new Background(item.img, item.w, Math.floor((gameSpeed * (idx + 1)) / layersMeta.length)) );

    function handleEnemies() {

    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(cvWidth, cvHeight);

    function animate(timestamp) {
        ctx.clearRect(0, 0, cvWidth, cvHeight);
        player.update(timestamp, input);
        player.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});