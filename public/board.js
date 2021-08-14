//@ts-check
class Board {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    /** @type {Ball[]}*/
    this.balls = [];
  }

  addBall = () => {
    this.balls.push(new Ball());
  };

  /**
   * Draw a ball
   * @param {Ball} ball
   */
  drawBall = (ball) => {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = theme.colors.ball;
    this.ctx.fill();
    this.ctx.closePath();
  };

  /**
   * @param {number} time
   */
  draw = (time) => {
    const dpr = window.devicePixelRatio || 1;
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // clear outside balls
    this.balls = this.balls.filter((x) => x.y - x.radius <= canvas.height / dpr);

    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].y += 2;
      this.drawBall(this.balls[i]);
    }
  };

  /**
   * @param {number} x
   * @param {number} y
   */
  handleClick = (x, y) => {
    console.log(x, y);
  };
}
