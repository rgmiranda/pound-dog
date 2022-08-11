const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const CV_HEIGHT = canvas.height;
const CV_WIDTH = canvas.width;

let gameSpeed = 8;

class Layer {
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

const layers = layersMeta.map( (item, idx) => new Layer(item.img, item.w, Math.floor((gameSpeed * (idx + 1)) / layersMeta.length)) );

function animate() {
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    layers.forEach((item) => {
        item.move();
        item.draw(ctx);
    });
    requestAnimationFrame(animate);
}

animate();