//@ts-check
class Board {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    /** @type {Ball[]}*/
    this.balls = [];
    this.balls.push(new Ball());
    this.balls.push(new Ball());
  }

  /**
   * Draw a ball
   * @param {Ball} ball
   */
  drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#c3fff3";
    ctx.fill();
    ctx.closePath();
  }

  draw() {
    for (let i = 0; i < this.balls.length; i++) {
      this.drawBall(this.balls[i]);
    }
  }
}
