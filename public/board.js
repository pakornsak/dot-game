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

  draw = () => {
    for (let i = 0; i < this.balls.length; i++) {
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
