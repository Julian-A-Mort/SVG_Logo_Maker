const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { fabric } = require('fabric');
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
  .then(colourInput => {
    return {...answers, ...colourInput};
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
    
    //created canvas size to allow for letter placement//
    const canvasSize = 300; 

    const canvas = new fabric.StaticCanvas(null, { width: canvasSize, height: canvasSize });

    //add shape with colour//
    let shape; 
    if (shapeInput.toLowerCase() === 'circle') {
      shape = new Circle(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'square') {
      shape = new Square(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'triangle') {
      shape = new Triangle(colourInput, 100);
    }
    
    //add logo //
    if (shape) {
        canvas.add(shape.getFabricObject().set({
          left: canvasSize / 2,
          top: canvasSize / 2
        })); 

        const text = new fabric.Text(logoAcronym, {
          fontSize: 40,
          fill: '#fff',
          originX: 'center', 
          originY: 'center',
          left: canvasSize / 2,
          top: canvasSize / 2,
        });
    
        canvas.add(text);
        canvas.renderAll();
    
        const outputPath = path.join(__dirname, 'examples', 'logo.svg');
        fs.writeFileSync(outputPath, canvas.toSVG());
        console.log('SVG file created successfully!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
});