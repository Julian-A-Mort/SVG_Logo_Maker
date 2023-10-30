const { fabric } = require('fabric');
const Shape = require('./shape');

class Square extends Shape {
  constructor(fill, sideLength) {
    super(fill);
    this.sideLength = sideLength;
  }

  getFabricObject() {
    return new fabric.Rect({
      width: this.sideLength,
      height: this.sideLength,
      fill: this.fill,
      originX: 'center',
      originY: 'center',
    });
  }
}

module.exports = Square;
