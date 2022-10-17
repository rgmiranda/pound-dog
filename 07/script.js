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

        constructor(proportion) {
            
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

        constructor (gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.sprite = {
                frameX: 0,
                frameY: 0,
                frameCount: 0,
                image: new Image(),
                width: 575,
                height: 523,
            };
            this.frameInterval = 1000 / 30;
            this.frameTimer = 0;
            this.sprite.image.src = 'dog.png';
            this.width = this.sprite.width * 0.3;
            this.height = this.sprite.height * 0.3;
            this.x = (gameWidth + this.width) * 0.5;
            this.y = gameHeight - this.height;

            this.speedX = 0;
            this.speedY = 0;
            this.weight = 15;

            this.setAction('stand');
        }

        /**
         * 
         * @param { string } action 
         */
        setAction(action) {
            if (!this.sprites[action]) {
                return;
            }
            this.sprite.frameCount = this.sprites[action].count;
            this.sprite.frameY = this.sprites[action].pos;
            this.sprite.frameX = this.sprite.frameX % this.sprite.frameCount;
        }

        /**
         * 
         * @param { number } deltaTime 
         * @param { InputHandler } input 
         */
        update(deltaTime, input) {

            if (this.frameTimer < this.frameInterval) {
                this.frameTimer += deltaTime;
                return;
            }
            this.frameTimer = 0;
            this.sprite.frameX = (this.sprite.frameX + 1) % this.sprite.frameCount;

            if (input.keys.indexOf('ArrowDown') > -1) {
                this.speedX = 0;
                this.setAction('duck');
            } else if (input.keys.indexOf('ArrowRight') > -1) {
                this.speedX = 15;
                this.setAction('run');
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speedX = -15;
                this.setAction('run');
            } else {
                this.speedX = 0;
                this.setAction('stand');
            }

            if ((input.keys.indexOf('ArrowUp') > -1) && this.onGround()) {
                this.speedY += -80;
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
                    this.setAction('jump');
                } else {
                    this.setAction('land');
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
            const sx = this.sprite.frameX * this.sprite.width,
                sy = this.sprite.frameY * this.sprite.height,
                sw = this.sprite.width,
                sh = this.sprite.height,
                dw = this.width,
                dh = this.height;
            ctx.drawImage(this.sprite.image, sx, sy, sw, sh, this.x, this.y, dw, dh);
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Worm {
        constructor(gameWidth, gameHeight) {
            const proportion = Math.random() * 0.3 + 0.2 
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.sprite = {
                image: new Image(),
                width: 229,
                height: 171,
                frames: 6
            }
            this.sprite.image.src = 'enemies/worm.png';
            this.width = this.sprite.width * proportion;
            this.height = this.sprite.height * proportion;
            this.x = gameWidth;
            this.y = gameHeight - this.height;

            this.speedX = Math.random() * 5 + 5;
            this.frameUpdateInterval = 1000 / (Math.random() * 10 + 20);
            this.frameTimer = 0;
            this.frameX = 0;
            this.active = true;
        }

        /**
         * 
         * @param { number } deltaTime 
         */
        update(deltaTime) {
            if (this.frameTimer > this.frameUpdateInterval) {
                this.frameTimer = 0;
                this.frameX = (this.frameX + 1) % this.sprite.frames;
                this.x -= this.speedX;
                if (this.x + this.width < 0) {
                    this.active = false;
                }
            } else {
                this.frameTimer += deltaTime;
            }
        }

        /**
         * 
         * @param { CanvasRenderingContext2D } ctx 
         */
        draw(ctx) {
            const sx = this.frameX * this.sprite.width,
                sy = 0,
                sw = this.sprite.width,
                sh = this.sprite.height,
                dw = this.width,
                dh = this.height;
            ctx.drawImage(this.sprite.image, sx, sy, sw, sh, this.x, this.y, dw, dh);
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
            if (this.position < -this.width + cvWidth) {
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

    class EnemiesHandler {
        constructor(gameWidth, gameHeight) {
            this.enemies = [];
            this.enemyTypes = [Worm];
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
        }

        /**
         * 
         * @param { number } deltaTime 
         */
        handle(deltaTime, ctx) {

            if ( this.enemyTimer > this.enemyInterval ) {
                const newEnemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
                this.enemies.push(new newEnemyType(this.gameWidth, this.gameHeight));
                this.lastSpawnTime = deltaTime;
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            let i = 0;
            while (i < this.enemies.length) {
                this.enemies[i].update(deltaTime);
                if (!this.enemies[i].active) {
                    this.enemies.splice(i, 1);
                    continue;
                }
                this.enemies[i].draw(ctx);
                i++;
            }
        }
    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(cvWidth, cvHeight);
    const enemyHandler = new EnemiesHandler(cvWidth, cvHeight);
    let previousTimestamp = 0;

    function animate(timestamp) {
        const deltaTime = timestamp - previousTimestamp;
        previousTimestamp = timestamp;
        ctx.clearRect(0, 0, cvWidth, cvHeight);
        player.update(deltaTime, input);
        player.draw(ctx);
        enemyHandler.handle(deltaTime, ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});