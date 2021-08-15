//@ts-check
const $controls = document.getElementById("controls");
const offsetTop = $controls.offsetHeight;
const dpr = window.devicePixelRatio || 1;

/** @type {HTMLCanvasElement} */
// @ts-ignore
const $canvas = document.getElementById("board");
$canvas.width = document.body.clientWidth * dpr;
$canvas.height = (document.body.clientHeight - offsetTop) * dpr;
const $ctx = $canvas.getContext("2d");
$ctx.scale(dpr, dpr);

// setup slider element
// - read min,max from config
const $silder = document.getElementById("slider");
$silder.setAttribute("min", SPEED_MIN.toString());
$silder.setAttribute("max", SPEED_MAX.toString());

// util to sync controls state
const updateControls = (target, key, value) => {
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
    this.controls = new Proxy({}, { set: updateControls });
    this.init();
  }

  init = () => {
    // render display section
    this.controls.score = 0;
    this.controls.speed = SPEED_MIN;

    this.board.addDot();
    this.timerId = setInterval(() => {
      this.board.addDot();
    }, DOT_SPAWN_RATE);
  };

  /**
   * @param {number} time
   */
  animate = (time = 0) => {
    this.board.draw(time, this.controls.speed);
    this.requestId = requestAnimationFrame(this.animate);
  };

  play = () => {
    this.animate();
  };

  /**
   * @param {any} e
   */
  updateSpeed = (e) => {
    const speed = e.target.value;
    this.controls.speed = Number(speed);
  };

  /**
   * @param {MouseEvent} e
   */
  handleClick = (e) => {
    const [found, dot] = this.board.checkCollision(e.x, e.y - offsetTop);
    if (dot) {
      this.board.removeDot(found);

      const score = Math.floor(dot.radius / 10);
      this.controls.score += score;
    }
  };
}

// create game instance and addEventListener
const game = new Game($ctx);
$silder.oninput = game.updateSpeed;
$canvas.onclick = game.handleClick;
game.play();

// reload screen if window is resized
window.onresize = () => window.location.reload();
