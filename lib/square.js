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

  render() {
    return `<svg width="${this.sideLength}" height="${this.sideLength}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${this.sideLength}" height="${this.sideLength}" fill="${this.fill}" />
    </svg>`;
  }
}

module.exports = Square;
