/** @type {HTMLCanvasElement} canvas */
const canvas = document.getElementById('main-canvas');

/** @type {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#909090';

const CV_WIDTH = canvas.width = 1024;
const CV_HEIGHT = canvas.height = 720;
const ENEMY_COUNT = 10;
const enemies = [];

for (let i = 0; i < ENEMY_COUNT; i++) {
    enemies.push(new Bat(Math.random() * CV_WIDTH, Math.random() * CV_HEIGHT, CV_WIDTH, CV_HEIGHT));
}

let gameframe = 0;

function animate() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);

    enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.move(gameframe);
    });

    gameframe++;

    requestAnimationFrame(animate);
}

animate();