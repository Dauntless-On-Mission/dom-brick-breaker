export default class Ball {
  constructor(x, y, radius, current_level) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "white";
    this.speed = 2 + current_level;
    this.xVelocity = Math.random() >= 0.5 ? this.speed : -this.speed;
    this.yVelocity = Math.random() >= 0.5 ? this.speed : -this.speed;
  }
  setRadomVelocity() {
    this.xVelocity = Math.random() >= 0.5 ? this.speed : -this.speed;
    this.yVelocity = Math.random() >= 0.5 ? this.speed : -this.speed;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  update(canvas, player) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // If Ball hits the wall
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.xVelocity *= -1;
    }
    if (this.y - this.radius < 0) {
      this.yVelocity *= -1;
    }

    // If Ball hits the Player
    const left = this.x + this.radius > player.x;
    const right = this.x - this.radius < player.x + player.width;
    const up = this.y + this.radius > player.y;
    const down = this.y - this.radius < player.y + player.height;

    if (left && right && up && down) {
      this.yVelocity *= -1;
    }

    // If Ball miss
    if (this.y + this.radius >= canvas.height) {
      player.life -= 1;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.setRadomVelocity();
    }
  }
}
