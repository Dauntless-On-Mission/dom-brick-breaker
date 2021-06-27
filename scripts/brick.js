export default class Brick {
  constructor(x, y, width, height, isVisible) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "orange";
    this.isVisible = isVisible;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
