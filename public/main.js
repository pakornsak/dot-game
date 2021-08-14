//@ts-check
/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.requestId = -1;

    this.speed = 10;
    this.score = 0;
  }

  animate(now = 0) {
    this.board.draw();
    this.requestId = requestAnimationFrame(this.animate);
  }

  play() {
    this.animate();
  }
}

const game = new Game(ctx);
game.play();
