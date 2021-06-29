export default class Brick {
  constructor(x, y, width, height, isVisible) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    let r = Math.floor(Math.random() * (255 - 140 + 1) + 140);
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    this.color = `rgb(${r},${g},${b})`;
    this.isVisible = isVisible;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
