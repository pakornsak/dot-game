//@ts-check

/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const silder = document.getElementById("slider");

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

  // updateScore = (x) => {

  // }
}

const game = new Game(ctx);
game.play();

silder.oninput = (e) => game.updateSpeed(e.target.value);
