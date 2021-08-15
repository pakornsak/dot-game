//@ts-check
/**
 * Random int by range between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const rand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

/**
 * Dot class, designed to keep all rendering props
 * - random diameter from 10px-100px
 * - one color for each diameter
 */
class Dot {
  /**
   * @param {number} width use to checking screen edges
   */
  constructor(width) {
    const i = rand(1, 10);
    const r = i * 5;

    this.x = rand(r, width - r); // random horizontal position
    this.y = -r; // start at the bottom of dot, for smoothly dropping
    this.radius = r;
    this.color = DOT_COLORS[i % DOT_COLORS.length];
  }
}
