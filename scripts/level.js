export default class Level {
  constructor(brickArr) {
    this.COL = brickArr.length;
    this.ROW = brickArr[0].length;
    this.ARR = brickArr;
  }
}
