//@ts-check
/**
 * Board component, designed to:
 * - keep track all dots
 * - render dots
 */
class Board {
  /**
   * An array to keep all dots in board
   * @type {Dot[]}
   * */
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
   * Draw a given dot
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
   * check if the click point is inside any dot
   * - if true, return found dot and its index
   * - otherwise, return null and index as -1
   * @param {number} x click-point x
   * @param {number} y click-point y
   * @return {[number, Dot | null]} both foundIndex and dot
   */
  checkCollision = (x, y) => {
    const foundIndex = this.dots.findIndex((dot) => {
      const distance = Math.sqrt(Math.pow(x - dot.x, 2) + Math.pow(y - dot.y, 2));
      return distance < dot.radius;
    });
    return [foundIndex, this.dots[foundIndex]];
  };
}
