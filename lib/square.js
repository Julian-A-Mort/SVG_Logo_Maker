class Square extends Shape {
    constructor(fill, size) {
      super(fill);
      this.size = size;
    }
  
    draw(draw) {
      return draw.rect(this.size, this.size).fill(this.fill).center(150, 150);
    }
  }
  
  module.exports = Square;
