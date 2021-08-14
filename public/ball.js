//@ts-check
/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const rand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

class Ball {
  constructor() {
    const r = rand(1, 10) * 10;

    this.x = rand(r, 576 - r);
    this.y = -r; // make it smooth falling
    this.radius = r;
    this.point = r / 10;
  }
}
