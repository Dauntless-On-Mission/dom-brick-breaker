export default class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "red";
    this.speed = 2;
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
  update(canvas) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // If Ball hits the wall
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.xVelocity *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius >= canvas.height) {
      this.yVelocity *= -1;
    }
  }
}
