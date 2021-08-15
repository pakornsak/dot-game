//@ts-check
class Board {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    /** @type {Ball[]}*/
    this.balls = [];

    const dpr = window.devicePixelRatio || 1;
    this.canvasWidth = this.ctx.canvas.width / dpr;
    this.canvasHeight = this.ctx.canvas.height / dpr;
  }

  addBall = () => {
    this.balls.push(new Ball(this.canvasWidth));
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
   * @param {number} speed
   */
  draw = (time, speed) => {
    // clear previous render
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // remove outside balls
    this.balls = this.balls.filter((x) => x.y - x.radius <= this.canvasHeight);

    const dt = time - this.lastRenderTime;
    const px = (speed / 1000) * dt;

    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].y += px;
      this.drawBall(this.balls[i]);
    }

    this.lastRenderTime = time;
  };

  /**
   * @param {number} x
   * @param {number} y
   * @return {Ball | null}
   */
  checkCollision = (x, y) => {
    //check
    return null;
  };
}
