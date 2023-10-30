const Square = require('../lib/square');

test('Square color is set correctly', () => {
  const square = new Square('red', 100);
  const svgString = square.render();
  const colorMatch = svgString.match(/fill="([^"]+)"/);
  const colorInSVG = colorMatch ? colorMatch[1] : null;
  expect(colorInSVG).toBe('red');
});
