const Circle = require('../lib/circle');

test('Circle color is set correctly', () => {
    const circle = new Circle('red', 50);
    const svgString = circle.render();
    const colorMatch = svgString.match(/fill="([^"]+)"/);
    const colorInSVG = colorMatch ? colorMatch[1] : null;
    expect(colorInSVG).toBe('red');
  });