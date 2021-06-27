export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width - 1;
    this.canvas.height = this.height - 1;
  }
  setWidthHeight() {
    this.width = window.innerWidth - 1;
    this.height = window.innerHeight - 1;
  }
}
