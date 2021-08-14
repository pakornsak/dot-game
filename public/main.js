//@ts-check
const _silder = document.getElementById("slider");
const controls = document.getElementById("controls");
const offsetTop = controls.offsetHeight;
const dpr = window.devicePixelRatio || 1;

/** @type {HTMLCanvasElement} */
// @ts-ignore
const _canvas = document.getElementById("board");
_canvas.width = document.body.clientWidth * dpr;
_canvas.height = (document.body.clientHeight - offsetTop) * dpr;
const _ctx = _canvas.getContext("2d");
_ctx.scale(dpr, dpr);

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.requestId = -1;

    this.speed = DEFAULT_SPEED;
    this.score = 0;

    this.onInit();
  }

  onInit = () => {
    this.board.addBall();

    this.timerId = setInterval(() => {
      this.board.addBall();
    }, BALL_INTERVAL);
  };

  /**
   * @param {number} time
   */
  animate = (time = 0) => {
    this.board.draw(time, this.speed);
    this.requestId = requestAnimationFrame(this.animate);
  };

  play = () => {
    this.animate();
  };

  /**
   * @param {string} speed
   */
  updateSpeed = (speed) => {
    this.speed = Number(speed);
    document.getElementById("speed").textContent = speed;
  };

  /**
   * @param {MouseEvent} e
   */
  handleClick = (e) => {
    const ball = this.board.checkCollision(e.x, e.y - offsetTop);
    if (ball) {
      // calculate score
      // update score board
    }
  };
}

const game = new Game(_ctx);
game.play();

_silder.oninput = (e) => game.updateSpeed(e.target.value);
_canvas.onclick = (e) => game.handleClick(e);
