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

    class DogSprite {

        sprites = {
            stand: {
                pos: 0,
                count: 7,
            },
            run: {
                pos: 3,
                count: 9
            },
            jump: {
                pos: 1,
                count: 7
            },
            land: {
                pos: 2,
                count: 7
            },
            duck: {
                pos: 7,
                count: 7
            },
            roll: {
                pos: 6,
                count: 7
            },
            duck: {
                pos: 5,
                count: 5
            },
        };

        constructor(proportion) {
            this.frameX = 0;
            this.frameY = 0;
            this.setAction('stand');
            this.image = new Image();
            this.image.src = 'dog.png';
            this.frameWidth = 575;
            this.frameHeight = 523;
            this.width = this.frameWidth * proportion;
            this.height = this.frameHeight * proportion;
            this.frameInterval = 50;
            this.frameLastUpdate = 0;
        }

        /**
         * 
         * @param { string } action 
         */
        setAction(action) {
            if (!this.sprites[action]) {
                return;
            }
            this.frameCount = this.sprites[action].count;
            this.frameY = this.sprites[action].pos;
            this.frameX = this.frameX % this.frameCount;
        }

        /**
         * 
         * @param { number } timestamp 
         */
        update(timestamp) {
            const deltaTime = timestamp - this.frameLastUpdate;
            if (deltaTime > this.frameInterval) {
                this.frameX = (this.frameX + 1) % this.frameCount;
                this.frameLastUpdate = timestamp;
            }
        }

        /**
         * 
         * @param { number } x 
         * @param { number } y 
         * @param { CanvasRenderingContext2D } ctx 
         */
        draw(x, y, ctx) {
            const sx = this.frameX * this.frameWidth,
                sy = this.frameY * this.frameHeight,
                sw = this.frameWidth,
                sh = this.frameHeight,
                dw = this.width,
                dh = this.height;
            ctx.drawImage(this.image, sx, sy, sw, sh, x, y, dw, dh);
        }
    }

    class Player {
        constructor (gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.sprite = new DogSprite(0.3);
            this.width = this.sprite.width;
            this.height = this.sprite.height;
            this.x = (gameWidth + this.width) * 0.5;
            this.y = gameHeight - this.height;

            this.speedX = 0;
            this.speedY = 0;
            this.weight = 1;
        }

        /**
         * 
         * @param { number } timestamp 
         * @param { InputHandler } input 
         */
        update(timestamp, input) {

            this.sprite.update(timestamp);

            if (input.keys.indexOf('ArrowDown') > -1) {
                this.speedX = 0;
                this.sprite.setAction('duck');
            } else if (input.keys.indexOf('ArrowRight') > -1) {
                this.speedX = 5;
                this.sprite.setAction('run');
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speedX = -5;
                this.sprite.setAction('run');
            } else {
                this.speedX = 0;
                this.sprite.setAction('stand');
            }

            if ((input.keys.indexOf('ArrowUp') > -1) && this.onGround()) {
                this.speedY += -20;
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
                if (this.speedY < 0) {
                    this.sprite.setAction('jump');
                } else {
                    this.sprite.setAction('land');
                }
            } else {
                this.speedY = 0;
            }
            
        }

        /**
         * 
         * @param { CanvasRenderingContext2D } ctx 
         */
        draw(ctx) {
            this.sprite.draw(this.x, this.y, ctx);
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
    
    //const layers = layersMeta.map( (item, idx) => new Background(item.img, item.w, Math.floor((gameSpeed * (idx + 1)) / layersMeta.length)) );

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