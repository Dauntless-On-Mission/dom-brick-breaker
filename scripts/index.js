import Canvas from "./canvas.js";
import Brick from "./brick.js";
import Player from "./player.js";
import Ball from "./ball.js";
import Level from "./level.js";

const score = document.getElementById("score");
score.innerText = "0";
const life = document.getElementById("life");
life.innerText = "3";
const level = document.getElementById("level");
level.innerText = "1";

const canvas = new Canvas(document.getElementById("canvas"));
window.addEventListener("resize", canvas.setWidthHeight);

let CURRENT_LEVEL = 1;

const levelsBrickStructure = [
  [
    [true, true, true, true],
    [false, false, false, true],
    [false, false, false, true],
    [false, false, false, true],
    [false, false, false, true],
    [false, false, false, true],
    [true, true, true, true]
  ],
  [
    [true, false, false, false],
    [true, true, false, false],
    [true, true, true, false],
    [true, true, true, true],
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false]
  ]
];
const levels = [];

levelsBrickStructure.forEach(structure => {
  levels.push(new Level(structure));
});

function getGame(l) {
  score.innerText = "0";
  level.innerText = CURRENT_LEVEL;
  life.innerText = "3";
  /* LEVEL */
  console.log(l);
  const COL = l.COL;
  const ROW = l.ROW;
  const COL_WIDTH = canvas.width / COL;
  const COL_HEIGHT = 40;
  const PADDING = 15;
  const BricksArr = [];
  let BRICKS_LEFT = 0;
  let oldX;

  for (let i = 0; i < ROW; i = i + 1) {
    for (let j = 0; j < COL; j = j + 1) {
      const x = COL_WIDTH * j + PADDING / 2;
      const y = COL_HEIGHT * i + PADDING / 2;
      BricksArr.push(
        new Brick(x, y, COL_WIDTH - PADDING, COL_HEIGHT - PADDING, l.ARR[j][i])
      );
      if (l.ARR[j][i]) {
        BRICKS_LEFT += 1;
      }
    }
  }
  console.log(BricksArr);

  /* PLAYER */
  const player = new Player(
    canvas.width / 2 - COL_WIDTH / 2,
    canvas.height - 3 * COL_HEIGHT,
    (3 * COL_WIDTH) / 2,
    (2 * COL_HEIGHT) / 3
  );
  console.log(player);

  /* BALL */
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
        score.innerText = player.score;
        ball.yVelocity *= -1;
        if (BRICKS_LEFT === 0) {
          player.isWon = true;
        }
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
    canvas.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  (function animateGame() {
    life.innerText = player.life;
    if (player.life <= 0) {
      console.log("Game Over!");
      return;
    } else if (player.isWon) {
      console.log("Player Won!");
      CURRENT_LEVEL += 1;
      if (CURRENT_LEVEL <= levels.length) getGame(levels[CURRENT_LEVEL - 1]);
      return;
    }
    clearGame();
    drawGame();
    updateGame();
    requestAnimationFrame(animateGame);
  })();

  // window.addEventListener("keydown", function (event) {
  //   if (event.key === "ArrowRight") {
  //     player.isRight = true;
  //     player.isLeft = false;
  //   } else if (event.key === "ArrowLeft") {
  //     player.isRight = false;
  //     player.isLeft = true;
  //   }
  // });

  // window.addEventListener("keyup", function (event) {
  //   if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
  //     player.isRight = false;
  //     player.isLeft = false;
  //   }
  // });

  $(window).mousemove(function (event) {
    oldX = event.pageX;
    setTimeout(() => checkMovement(event, oldX), 35);
    oldX = event.pageX;
  });

  const checkMovement = (event, oldX) => {
    player.x += (oldX - event.pageX) / 3;
  };
}

document.querySelector(".playBut").addEventListener('click', removeHome);
window.addEventListener('load', move);
// window.onload = move;

function removeHome() {
  var obj = document.getElementsByClassName("home-screen");
  obj[0].style.display = "none";
  var obj = document.getElementsByClassName("bottom");
  obj[0].style.display = "flex";
  getGame(levels[CURRENT_LEVEL]);
}

function showHome() {
  var obj = document.getElementsByClassName("loading");
  obj[0].style.display = "none";
  var obj = document.getElementsByClassName("home-screen");
  obj[0].style.display = "flex";
}

function move() {
  var elem = document.getElementById("progress");
  var width = elem.value;
  var id = setInterval(frame, 18);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.value = width;
    }
  }
  setTimeout(showHome, 2100);
}