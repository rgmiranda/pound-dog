import { Player } from "./player.js";
import { StantingState } from "./state.js";

window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';

  /** @type { HTMLCanvasElement } */
  const canvas = document.getElementById('main-canvas');

  /** @type { CanvasRenderingContext2D } */
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const player = new Player(canvas.width, canvas.height);
  player.state = new StantingState(player);

  let lastTime = 0;

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastTime = timestamp;

    player.update(deltaTime);
    player.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
