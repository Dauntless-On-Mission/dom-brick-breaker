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

const soundEl = document.getElementById("bg-sound");

let CURRENT_LEVEL = 0;

const levelsBrickStructure = [
  [
    [true, false, true, false, true],
    [false, true, false, true, false],
    [true, false, true, false, true],
    [false, true, false, true, false],
    [true, false, true, false, true],
    [false, true, false, true, false],
    [true, false, true, false, true]
  ],
  [
    [true, true, true, true, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, true, true, true, true]
  ],
  [
    [true, true, true, true],
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false],
    [true, true, false, false],
    [true, true, true, false],
    [true, true, true, true]
  ],
  [
    [false, false, false, true, false, false, false],
    [false, false, true, true, true, false, false],
    [false, true, true, true, true, true, false],
    [true, true, true, true, true, true, true],
    [false, true, true, true, true, true, false],
    [false, false, true, true, true, false, false],
    [false, false, false, true, false, false, false]
  ],
  [
    [true, false, false, false, false, false, false, true, false, true],
    [true, true, false, false, false, false, true, true, false, true],
    [true, true, true, false, false, true, true, true, false, true],
    [true, true, true, true, true, true, true, true, false, true],
    [true, true, true, false, false, true, true, true, false, true],
    [true, true, false, false, false, false, true, true, false, true],
    [true, false, false, false, false, false, false, true, false, true]
  ]
];
const levels = [];

levelsBrickStructure.forEach(structure => {
  levels.push(new Level(structure));
});

function getGame(l) {
  // console.log(CURRENT_LEVEL);
  score.innerText = "0";
  level.innerText = CURRENT_LEVEL + 1;
  life.innerText = "3";
  /* LEVEL */
  // console.log(l);
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
  // console.log(BricksArr);

  /* PLAYER */
  const player = new Player(
    canvas.width / 2 - COL_WIDTH / 2,
    canvas.height - 3 * COL_HEIGHT,
    (3 * COL_WIDTH) / 2,
    (2 * COL_HEIGHT) / 3
  );
  // console.log(player);

  /* BALL */
  const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, CURRENT_LEVEL);
  // console.log(ball);
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
    // let img = new Image();
    // img.src = "./assets/night.png";
    // canvas.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    // canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  (function animateGame() {
    life.innerText = player.life;
    if (player.life <= 0) {
      // console.log("Game Over!");
      return;
    } else if (player.isWon) {
      // console.log("Player Won!");
      CURRENT_LEVEL += 1;
      if (CURRENT_LEVEL < levels.length) getGame(levels[CURRENT_LEVEL]);
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

  $(window).mousemove(function (event) {
    oldX = event.pageX;
    setTimeout(() => checkMovement(event, oldX), 35);
    oldX = event.pageX;
  });

  const checkMovement = (event, oldX) => {
    player.x += (oldX - event.pageX) / 3;
  };
}

let volume = 1;

document.querySelector(".playBut").addEventListener("click", removeHome);
document.querySelector(".volume").addEventListener("click", muteSound);
document.querySelector("#left").addEventListener("click", showHome);
document.querySelector("#right").addEventListener("click", startGame);
document.querySelector("#one").addEventListener("click", () => startLevel(0));
document.querySelector("#two").addEventListener("click", () => startLevel(1));
document.querySelector("#three").addEventListener("click", () => startLevel(2));
document.querySelector("#four").addEventListener("click", () => startLevel(3));
document.querySelector("#five").addEventListener("click", () => startLevel(4));
document.querySelector("#six").addEventListener("click", () => startLevel(5));
window.addEventListener("load", move);
// window.onload = move;

function removeHome() {
  var obj = document.getElementsByClassName("home-screen");
  obj[0].style.display = "none";
  var obj = document.getElementsByClassName("bottom");
  obj[0].style.display = "flex";
  // getGame(levels[CURRENT_LEVEL]);
  showLevelScreen();
}

function showHome() {
  var obj = document.getElementsByClassName("loading");
  obj[0].style.display = "none";

  var obj = document.getElementsByClassName("container-level");
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

function showLevelScreen() {
  var obj = document.getElementsByClassName("bottom");
  obj[0].style.display = "none";
  var obj = document.getElementsByClassName("container-level");
  obj[0].style.display = "flex";
  // getGame(levels[CURRENT_LEVEL]);
}

function allNone() {
  var obj = document.getElementsByClassName("loading");
  obj[0].style.display = "none";

  var obj = document.getElementsByClassName("container-level");
  obj[0].style.display = "none";

  var obj = document.getElementsByClassName("home-screen");
  obj[0].style.display = "none";
}

function showGameCard() {
  var obj = document.getElementsByClassName("bottom");
  obj[0].style.display = "flex";
}

function startGame() {
  allNone();
  showGameCard();
  getGame(levels[CURRENT_LEVEL]);
}

function startLevel(level) {
  CURRENT_LEVEL = level;
  allNone();
  showGameCard();
  getGame(levels[CURRENT_LEVEL]);
}

function muteSound() {
  console.log(volume);
  var obj = document.getElementsByClassName("volume");
  if (volume % 2 != 0) {
    obj[0].id = "mute";
    soundEl.pause();
  } else {
    obj[0].id = "sound";
    soundEl.play();
  }
  volume++;
}
