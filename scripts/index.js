import Canvas from "./canvas.js";
import Brick from "./brick.js";
import Player from "./player.js";
import Ball from "./ball.js";

const canvas = new Canvas(document.getElementById("canvas"));
window.addEventListener("resize", canvas.setWidthHeight);

const BRICK_AMOUNT = 50;
const COL = 10;
const ROW = 5;
const COL_WIDTH = canvas.width / 10;
const COL_HEIGHT = 40;
const PADDING = 10;

const BricksArr = [];

for (let i = 0; i < ROW; i = i + 1) {
  for (let j = 0; j < COL; j = j + 1) {
    const x = COL_WIDTH * j + PADDING / 2;
    const y = COL_HEIGHT * i + PADDING / 2;
    BricksArr.push(new Brick(x, y, COL_WIDTH - PADDING, COL_HEIGHT - PADDING));
  }
}

console.log(BricksArr);

function drawBricks() {
  BricksArr.forEach(brick => {
    brick.draw(canvas.ctx);
  });
}

const player = new Player(
  canvas.width / 2 - COL_WIDTH / 2,
  canvas.height - 2 * COL_HEIGHT,
  COL_WIDTH,
  (2 * COL_HEIGHT) / 3
);

console.log(player);

const ball = new Ball(canvas.width / 2, canvas.height / 2, 25);
console.log(ball);

function drawGame() {
  ball.draw(canvas.ctx);
  drawBricks();
  player.draw(canvas.ctx);
}

function updateGame() {
  ball.update(canvas);
}

function clearGame() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animateGame() {
  clearGame();
  drawGame();
  updateGame();
  requestAnimationFrame(animateGame);
}

animateGame();
