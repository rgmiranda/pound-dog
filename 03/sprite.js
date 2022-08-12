class Sprite {
    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {string} img 
     * @param {number} length 
     */
    constructor (width, height, img, length) {
        /** @type {number} width */
        this.width = parseInt(width);
        /** @type {number} height */
        this.height = parseInt(height);
        /** @type {string} img */
        this.img = img;
        /** @type {number} length */
        this.length = parseInt(length);
    }
}