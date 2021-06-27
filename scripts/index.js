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
let BRICKS_LEFT = 50;

for (let i = 0; i < ROW; i = i + 1) {
  for (let j = 0; j < COL; j = j + 1) {
    const x = COL_WIDTH * j + PADDING / 2;
    const y = COL_HEIGHT * i + PADDING / 2;
    BricksArr.push(new Brick(x, y, COL_WIDTH - PADDING, COL_HEIGHT - PADDING));
  }
}

console.log(BricksArr);

const player = new Player(
  canvas.width / 2 - COL_WIDTH / 2,
  canvas.height - 2 * COL_HEIGHT,
  (3 * COL_WIDTH) / 2,
  (2 * COL_HEIGHT) / 3
);

console.log(player);

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10);
console.log(ball);

function isBallCollideWithBrick(ball, brick) {
  return (
    ball.x + ball.radius > brick.x &&
    ball.x - ball.radius < brick.x + brick.width &&
    ball.y + ball.radius > brick.y &&
    ball.y - ball.radius < brick.y + brick.height
  );
}

function drawBricks() {
  BricksArr.forEach(brick => {
    if (brick.isVisible && isBallCollideWithBrick(ball, brick)) {
      brick.isVisible = false;
      player.score += 10;
      BRICKS_LEFT -= 1;
      ball.yVelocity *= -1;
    } else if (brick.isVisible) {
      brick.draw(canvas.ctx);
    }
  });
}

function drawGame() {
  ball.draw(canvas.ctx);
  drawBricks();
  player.draw(canvas.ctx);
}

function updateGame() {
  ball.update(canvas, player);
  player.update(canvas);
}

function clearGame() {
  canvas.ctx.fillStyle = "rgba(255, 255, 255, .3)";
  canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
}

(function animateGame() {
  if (player.life <= 0) {
    console.log("Game Over!");
    return;
  } else if (player.won) {
    console.log("Player Won!");
    return;
  }
  clearGame();
  drawGame();
  updateGame();
  requestAnimationFrame(animateGame);
})();

window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    player.isRight = true;
    player.isLeft = false;
  } else if (event.key === "ArrowLeft") {
    player.isRight = false;
    player.isLeft = true;
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    player.isRight = false;
    player.isLeft = false;
  }
});
