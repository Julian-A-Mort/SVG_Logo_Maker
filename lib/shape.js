class Shape {
    constructor(fill) {
      this.fill = fill;
    }
  
    draw() {
      throw new Error('Draw method must be implemented in child classes');
    }
  }
  module.exports = Shape;
