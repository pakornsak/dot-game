//@ts-check
const silder = document.getElementById("slider");
const controls = document.getElementById("controls");
const dpr = window.devicePixelRatio || 1;

/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("board");
canvas.width = document.body.clientWidth * dpr;
canvas.height = (document.body.clientHeight - controls.offsetHeight) * dpr;
const ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.requestId = -1;

    this.speed = 10;
    this.score = 0;
  }

  animate = () => {
    this.board.draw();
    // this.requestId = requestAnimationFrame(this.animate);
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

  // updateScore = (x) => {

  // }
}

const game = new Game(ctx);
game.play();

silder.oninput = (e) => game.updateSpeed(e.target.value);
