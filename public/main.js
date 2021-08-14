//@ts-check
/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let accountValues = {
  score: 0,
};

// function updateAccount(key, value) {
//   let element = document.getElementById(key);
//   if (element) {
//     element.textContent = value;
//   }
// }

let board = new Board(ctx);
