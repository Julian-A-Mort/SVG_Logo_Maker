const { fabric } = require('fabric');
const Shape = require('./shape');

class Circle extends Shape {
  constructor(fill, radius) {
    super(fill);
    this.radius = radius;
  }

  getFabricObject() {
    return new fabric.Circle({
      radius: this.radius,
      fill: this.fill,
      originX: 'center',
      originY: 'center',
    });
  }
}

module.exports = Circle;
