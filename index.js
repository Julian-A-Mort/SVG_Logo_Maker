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
    
    //created canvas size to allow for letter placement
    const canvasWidth = 300;
    const canvasHeight = 200;
    
    const canvas = new fabric.StaticCanvas(null, { width: canvasWidth, height: canvasHeight });
    
    //add shape with colour
    let shape; 
    if (shapeInput.toLowerCase() === 'circle') {
      shape = new Circle(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'square') {
      shape = new Square(colourInput, 100);
    } else if (shapeInput.toLowerCase() === 'triangle') {
      shape = new Triangle(colourInput, 100);
    }
    
    //add logo 
    if (shape) {
        canvas.add(shape.getFabricObject().set({
          left: canvasWidth / 2,
          top: canvasHeight / 2
        }));       

        let fontSize = 40;
        let textTopAdjustment = 0;
        
        //handles font issues with triangles
        if (shapeInput.toLowerCase() === 'triangle') {
          fontSize = 25;
          textTopAdjustment = 20;
        }

        //add text
        const text = new fabric.Text(logoAcronym, {
            fontSize: fontSize,
            fill: '#fff',
            originX: 'center', 
            originY: 'center',
            left: canvasWidth / 2,
            top: canvasHeight / 2 + textTopAdjustment,
          });
    
        canvas.add(text);
        canvas.renderAll();
    
        const outputPath = path.join(__dirname, 'examples', 'logo.svg');
        fs.writeFileSync(outputPath, canvas.toSVG());
        console.log('Generated logo.svg!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
});