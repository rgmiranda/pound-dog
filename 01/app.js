const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const CV_HEIGHT = canvas.height;
const CV_WIDTH = canvas.width;

const SP_WIDTH = 575;
const SP_HEIGTH = 523;

const selectAction = document.getElementById('select-action');

const playerImage = new Image();
playerImage.src = 'assets/shadow_dog.png';

const spriteAnimations = [];
const animationStates = [
    {
        name: 'Idle',
        frames: 7,
    },
    {
        name: 'Jump',
        frames: 7,
    },
    {
        name: 'Jump Off',
        frames: 7,
    },
    {
        name: 'Run',
        frames: 9,
    },
    {
        name: 'Power',
        frames: 11,
    },

];

animationStates.forEach((state, idx) => {
    let frames = {
        loc: []
    };
    let op = document.createElement('option');
    for (let k = 0; k < state.frames; k++) {
        frames.loc.push({x: k * SP_WIDTH, y: idx * SP_HEIGTH});
    }
    spriteAnimations.push(frames);
    op.value = idx;
    op.innerHTML = state.name;
    selectAction.add(op);
});

let x = 0, selectedAction = 0;
const step = .2;

selectAction.addEventListener('change', function () {
    selectedAction = parseInt(this.value);
    console.log(selectedAction, animationStates);
});

function animate() {
    const availFrames = animationStates[selectedAction].frames;
    const currentFrame = Math.floor(x) % availFrames;
    const px = spriteAnimations[selectedAction].loc[currentFrame].x;
    const py = spriteAnimations[selectedAction].loc[currentFrame].y;
    
    ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);


    ctx.drawImage(playerImage, px, py, SP_WIDTH, SP_HEIGTH, 0, 0, CV_WIDTH, CV_HEIGHT);
    x += step;
    requestAnimationFrame(animate);
};

animate();