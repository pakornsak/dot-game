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

let accountValues = {
  score: 0,
  speed: SPEED_MIN,
};

const updateAccount = (target, key, value) => {
  target[key] = value;
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
  return true;
};

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);

    this.account = new Proxy(accountValues, { set: updateAccount });
    this.init();
  }

  init = () => {
    // force render
    this.account.speed = this.account.speed;
    this.account.score = this.account.score;

    this.board.addBall();
    this.timerId = setInterval(() => {
      this.board.addBall();
    }, BALL_INTERVAL);
  };

  /**
   * @param {number} time
   */
  animate = (time = 0) => {
    this.board.draw(time, this.account.speed);
    requestAnimationFrame(this.animate);
  };

  play = () => {
    this.animate();
  };

  /**
   * @param {string} speed
   */
  updateSpeed = (speed) => {
    this.account.speed = Number(speed);
  };

  /**
   * @param {number} score
   */
  updateScore = (score) => {
    this.account.score = score;
  };

  /**
   * @param {MouseEvent} e
   */
  handleClick = (e) => {
    const [found, ball] = this.board.checkCollision(e.x, e.y - offsetTop);
    if (ball) {
      this.board.removeBall(found);

      const score = Math.floor(ball.radius / 10);
      this.account.score += score;
    }
  };
}

const game = new Game(_ctx);
game.play();

_silder.setAttribute("min", SPEED_MIN.toString());
_silder.setAttribute("max", SPEED_MAX.toString());
_silder.oninput = (e) => game.updateSpeed(e.target.value);
_canvas.onclick = (e) => game.handleClick(e);
