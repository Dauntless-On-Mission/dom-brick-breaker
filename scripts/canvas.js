export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 600;
    this.height = window.innerHeight;
    this.canvas.width = this.width - 1;
    this.canvas.height = this.height - 1;
  }
  setWidthHeight() {
    this.width = 600 - 1;
    this.height = window.innerHeight - 1;
  }
}
