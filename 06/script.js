
window.addEventListener('load', function() {
    /** @type { HTMLCanvasElement } */
    const canvas = document.getElementById('main-canvas');

    /** @type { CanvasRenderingContext2D } */
    const ctx = canvas.getContext('2d');
    const cvWidth = (canvas.width = 800);
    const cvHeight = (canvas.height = 600);

    let lastTime = 0;
    
    class Game {
        /**
         * 
         * @param { CanvasRenderingContext2D } ctx 
         * @param { number } width 
         * @param { number } height 
         */
        constructor(ctx, width, height) {

            this.width = width;
            this.height = height;
            this.ctx = ctx;

            /** @type { Enemy[] } */
            this.enemies = [];

            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyTypes = [
                Ghost,
                Worm,
                Spider
            ];
        }
    
        update(deltaTime) {
            this.enemies = this.enemies.filter(e => !e.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(e => e.update(deltaTime));
        }
    
        draw() {
            this.enemies.forEach(e => e.draw());
        }
    
        #addNewEnemy() {
            const enemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            this.enemies.push(new enemyType(this));
        }
    }
    
    class Enemy {
        /**
         * 
         * @param { Game } game 
         */
        constructor(game) {
            this.spriteWidth= 0;
            this.spriteHeight= 0;
            this.spriteFrame= 0;
            this.spriteCount= 0;
            this.spriteInterval= 0;
            this.spriteDeltaTime= 0;
            this.image = undefined;
            this.width = 100;
            this.height = 100;
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height - this.height;

            this.markedForDeletion = false;
        }
    
        update(deltaTime) {
        }

        draw() {
            const sx = this.spriteFrame * this.spriteWidth,
                sy = 0,
                sw = this.spriteWidth,
                sh = this.spriteHeight;
            this.game.ctx.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.vxSpeed = Math.random() * 0.1 + 0.1;
            this.image = new Image();
            this.image.src = 'worm.png';
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.spriteFrame = 0;
            this.spriteCount = 6;
            this.spriteInterval = 200 * this.vxSpeed;;
            this.spriteDeltaTime = 0;
            this.sizePercent = Math.random() * 0.3 + 0.2;

            this.width = this.spriteWidth * this.sizePercent;
            this.height = this.spriteHeight * this.sizePercent;
            this.y = this.game.height - this.height;
            this.x = this.game.width;
        }

        update(deltaTime) {
            if (this.spriteDeltaTime > this.spriteInterval) {
                this.spriteFrame = (this.spriteFrame + 1) % this.spriteCount;
                this.spriteDeltaTime = 0;
            } else {
                this.spriteDeltaTime += deltaTime;
            }
            this.x -= this.vxSpeed * deltaTime;
            if (this.x + this.width < 0) {
                this.markedForDeletion = true;
            }
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.vxSpeed = Math.random() * 0.1 + 0.1;
            this.image = new Image();
            this.image.src = 'ghost.png';
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.spriteFrame = 0;
            this.spriteCount = 6;
            this.spriteInterval = 200 * this.vxSpeed;;
            this.spriteDeltaTime = 0;
            this.sizePercent = 0.5;

            this.width = this.spriteWidth * this.sizePercent;
            this.height = this.spriteHeight * this.sizePercent;
            this.y = Math.random() * (this.game.height - this.height * 2);
            this.x = this.game.width;
            this.alpha = Math.random() * 0.2 + 0.6;
            this.angle = 0;
            this.amplitude = Math.random() + 1;
        }

        update(deltaTime) {
            if (this.spriteDeltaTime > this.spriteInterval) {
                this.spriteFrame = (this.spriteFrame + 1) % this.spriteCount;
                this.spriteDeltaTime = 0;
            } else {
                this.spriteDeltaTime += deltaTime;
            }
            this.x -= this.vxSpeed * deltaTime;
            this.y += Math.sin(this.angle) * this.amplitude;
            this.angle += 0.05;
            if (this.x + this.width < 0) {
                this.markedForDeletion = true;
            }
        }

        draw() {
            this.game.ctx.save();
            this.game.ctx.globalAlpha = this.alpha;
            super.draw();
            this.game.ctx.restore();
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.vySpeed = Math.random() * 0.1 + 0.1;
            this.maxY = Math.random() * this.game.height * 0.7;
            this.max
            this.image = new Image();
            this.image.src = 'spider.png';
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.spriteFrame = 0;
            this.spriteCount = 6;
            this.spriteInterval = 200 * this.vySpeed;
            this.spriteDeltaTime = 0;
            this.sizePercent = 0.5;

            this.width = this.spriteWidth * this.sizePercent;
            this.height = this.spriteHeight * this.sizePercent;
            this.y = -this.height;
            this.x = Math.random() * (this.game.width - this.width);
            this.alpha = Math.random() * 0.2 + 0.6;
            this.angle = 0;
            this.amplitude = Math.random() + 1;
        }

        update(deltaTime) {
            if (this.spriteDeltaTime > this.spriteInterval) {
                this.spriteFrame = (this.spriteFrame + 1) % this.spriteCount;
                this.spriteDeltaTime = 0;
            } else {
                this.spriteDeltaTime += deltaTime;
            }
            this.y += this.vySpeed * deltaTime;
            if (this.y > this.maxY) {
                this.vySpeed *= -1;
            }
            if (this.y + this.height < 0) {
                this.markedForDeletion = true;
            }
        }

        draw() {
            const ctx = this.game.ctx;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width * 0.5, 0);
            ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5);
            ctx.stroke();
            ctx.closePath();
            super.draw();
        }
    }
    
    const game = new Game(ctx, cvWidth, cvHeight);

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, cvWidth, cvHeight);

        game.draw();
        game.update(deltaTime);

    
        requestAnimationFrame(animate);
    }
    
    animate(0);
});
