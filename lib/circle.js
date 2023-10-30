class Circle extends Shape {
    constructor(fill, radius) {
      super(fill);
      this.radius = radius;
    }
  
    draw(draw) {
      return draw.circle(this.radius * 2).fill(this.fill).center(150, 150);
    }
  }
  module.exports = Circle;
