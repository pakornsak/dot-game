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
  /**
   * @param {number} width
   */
  constructor(width) {
    const i = rand(1, 10);
    const r = i * 10;

    this.x = rand(r, width - r);
    this.y = -r; // make it start smoothly
    this.radius = r;
    this.color = BALL_COLORS[i % BALL_COLORS.length];
  }
}
