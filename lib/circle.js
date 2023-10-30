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

  render() {
    return `<svg width="${this.radius * 2}" height="${this.radius * 2}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${this.radius}" cy="${this.radius}" r="${this.radius}" fill="${this.fill}" />
    </svg>`;
  }
}

module.exports = Circle;
