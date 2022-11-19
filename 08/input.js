
const enabledKeys = Object.freeze([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]);
export class InputHandler {
  /** @type { string[] } */
  #keys;
  constructor() {
    this.#keys = [];
    const self = this;
    window.addEventListener('keydown', function(e) {
      if (enabledKeys.indexOf(e.key) !== -1 && self.#keys.indexOf(e.key) === -1) {
          self.#keys.push(e.key);
      }
    });
    window.addEventListener('keyup', function(e) {
        const idx = self.#keys.indexOf(e.key);
        if (idx !== -1) {
            self.#keys.splice(idx, 1);
        }
    });
  }

  isKeyPress(key) {
    return this.#keys.indexOf(key) !== -1;
  }
}
