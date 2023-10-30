class Triangle extends Shape {
    constructor(fill, size) {
      super(fill);
      this.size = size;
    }
  
    draw(draw) {
      return draw.polygon(`0,${this.size} ${this.size},${this.size} ${this.size / 2},0`).fill(this.fill).center(150, 150);
    }
  }
  
  module.exports = Triangle;
