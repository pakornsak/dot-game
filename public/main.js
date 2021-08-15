//@ts-check
const $controls = document.getElementById("controls");
const offsetTop = $controls.offsetHeight;
const dpr = window.devicePixelRatio || 1;

/**
 * Setup canvas element
 * - detect and setup canvas size
 * - set dpi
 */
/** @type {HTMLCanvasElement} */
// @ts-ignore
const $canvas = document.getElementById("board");
$canvas.width = document.body.clientWidth * dpr;
$canvas.height = (document.body.clientHeight - offsetTop) * dpr;
const $ctx = $canvas.getContext("2d");
$ctx.scale(dpr, dpr);

/**
 * Setup slider element
 * - read min,max from config
 */
const $silder = document.getElementById("slider");
$silder.setAttribute("min", SPEED_MIN.toString());
$silder.setAttribute("max", SPEED_MAX.toString());

/**
 * Update controls DOM with new value
 * @param {any} target
 * @param {string} key
 * @param {string} value
 * @returns
 */
const updateControls = (target, key, value) => {
  target[key] = value;
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
  return true;
};

/**
 * Game component, desgined to:
 * - handle all events from user
 * - keep game settings
 * - manipulate dots (add, remove)
 */
class Game {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.controls = new Proxy({}, { set: updateControls });
  }

  /**
   * Initilize controls and board sections
   */
  init = () => {
    // render controls
    this.controls.score = 0;
    this.controls.speed = SPEED_MIN;

    // setup first dot and drop rate
    this.board.addDot();
    this.timerId = setInterval(() => {
      this.board.addDot();
    }, DOT_DROP_RATE);
  };

  /**
   * Rerender the canvas with ~60 fps (frame per sec)
   * @param {number} time
   */
  animate = (time = 0) => {
    this.board.draw(time, this.controls.speed);
    this.requestId = requestAnimationFrame(this.animate);
  };

  /**
   * Setup game settings and start game
   */
  play = () => {
    this.init();
    this.animate();
  };

  /**
   * Update game speed
   * @param {any} e
   */
  updateSpeed = (e) => {
    this.controls.speed = Number(e.target.value);
  };

  /**
   * Handle when canvas is clicked, check if dot is clicked
   * - if true, remove dot and calculate score
   * - otherwise, do nothing
   * @param {MouseEvent} e
   */
  handleClick = (e) => {
    const [found, dot] = this.board.checkCollision(e.x, e.y - offsetTop);
    if (dot) {
      this.board.removeDot(found);

      const score = Math.floor(50 / dot.radius);
      this.controls.score += score;
    }
  };
}

/**
 * create game instance and addEventListener
 */
const game = new Game($ctx);
$silder.oninput = game.updateSpeed;
$canvas.onclick = game.handleClick;
game.play();

/**
 * restart game if window resize is detected
 */
window.onresize = () => window.location.reload();
