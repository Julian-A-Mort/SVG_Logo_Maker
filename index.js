const inquirer = require('inquirer');
const fs = require('fs');
const SVG = require('@svgdotjs/svg.js');
const Square = require('./lib/square');
const Circle = require('./lib/circle');
const Triangle = require('./lib/triangle');

inquirer.prompt({
  type: 'input',
  name: 'logoAcronym',
  message: 'Enter Three Letters:',
  validate: function(input) {
    const pattern = /^[a-zA-Z]{3}$/;
    if (pattern.test(input)) {
      return true;
    }
    return 'I said three letters!';
  }
})
.then(answers => {
  return inquirer.prompt({
    type: 'input',
    name: 'colourInput',
    message: 'Enter Colour:',
    validate: function(input) {
      const colorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
      const colorKeywords = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white"];
      if (colorPattern.test(input) || colorKeywords.includes(input.toLowerCase())) {
        return true;
      }
      return 'Please enter a valid color keyword or hexadecimal color code.';
    }
  })
  .then(colourAnswer => {
    return {...answers, ...colourAnswer};
  });
})
.then(answers => {
  return inquirer.prompt({
    type: 'input',
    name: 'shapeInput',
    message: 'Enter Shape:',
    validate: function(input) {
      const shapeKeywords = ["circle", "triangle", "square"];
      if (shapeKeywords.includes(input.toLowerCase())) {
        return true;
      }
      return 'Please choose from Circle, Triangle, or Square!';
    }
  })
  .then(shapeAnswer => {
    return {...answers, ...shapeAnswer};
  });
})
.then(finalAnswers => {
    const { logoAcronym, colourInput, shapeInput } = finalAnswers;
    
    const draw = SVG().size(300, 300);
    
    let shape;
    if (shapeInput.toLowerCase() === 'circle') {
      shape = new Circle(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'square') {
      shape = new Square(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'triangle') {
      shape = new Triangle(colourInput, 100);
    }
    
    if (shape) {
      shape.draw(draw);
      fs.writeFileSync('output.svg', draw.svg());
      console.log('SVG file created successfully!');
    } else {
      console.log('Invalid shape input');
    }
  });