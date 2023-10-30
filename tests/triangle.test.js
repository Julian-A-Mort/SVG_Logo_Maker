const Triangle = require('../lib/square');

test('Triangle color is set correctly', () => {
  const triangle = new Triangle('blue', 50, 50, 50);
  const svgString = triangle.render();
  const colorMatch = svgString.match(/fill="([^"]+)"/);
  const colorInSVG = colorMatch ? colorMatch[1] : null;
  expect(colorInSVG).toBe('blue');
});
