//@ts-check
/**
 * Board class, designed as follows:
 * - keep track for all dots
 * - manipulate dots
 * - provide utility functions for dots
 */
class Board {
  /** @type {Dot[]}*/
  dots;

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    this.dots = [];

    const dpr = window.devicePixelRatio || 1;
    this.canvasWidth = this.ctx.canvas.width / dpr;
    this.canvasHeight = this.ctx.canvas.height / dpr;
  }

  /**
   * Add a new dot
   */
  addDot = () => {
    this.dots.push(new Dot(this.canvasWidth));
  };

  /**
   * Remove existing dot by index
   * @param {number} index
   */
  removeDot = (index) => {
    this.dots.splice(index, 1);
  };

  /**
   * Draw a dot
   * @param {Dot} dot
   */
  drawDot = (dot) => {
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = dot.color;
    this.ctx.fill();
    this.ctx.closePath();
  };

  /**
   * Redraw all dots in board
   * @param {number} time
   * @param {number} speed
   */
  draw = (time, speed) => {
    // clear previous render
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // remove outside dots
    this.dots = this.dots.filter((dot) => dot.y - dot.radius <= this.canvasHeight);

    const dt = time - this.lastRenderTime;
    const px = (speed / 1000) * dt;

    for (let i = this.dots.length - 1; i >= 0; i--) {
      this.dots[i].y += px;
      this.drawDot(this.dots[i]);
    }

    this.lastRenderTime = time;
  };

  /**
   * @param {number} x
   * @param {number} y
   * @return {[number, Dot | null]}
   */
  checkCollision = (x, y) => {
    const found = this.dots.findIndex((dot) => {
      const distance = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
      return distance < dot.radius;
    });
    return [found, this.dots[found]];
  };
}
