const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { fabric } = require('fabric');
const Square = require('./lib/square');
const Circle = require('./lib/circle');
const Triangle = require('./lib/triangle');

class App {
  async run() {
    try {
      const answers = await this.promptLogoAcronym();
      const colourInput = await this.promptColourInput(answers);
      const shapeInput = await this.promptShapeInput(colourInput);
      await this.generateLogo(shapeInput);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  promptLogoAcronym() {
    return inquirer.prompt({
      type: 'input',
      name: 'logoAcronym',
      message: 'Enter Three Letters:',
      validate: input => /^[a-zA-Z]{3}$/.test(input) || 'I said three letters!',
    });
  }

  promptColourInput(answers) {
    return inquirer.prompt({
      type: 'input',
      name: 'colourInput',
      message: 'Enter Colour:',
      validate: input => {
        const colorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
        const colorKeywords = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white"];
        return colorPattern.test(input) || colorKeywords.includes(input.toLowerCase()) || 'Please enter a valid color keyword or hexadecimal color code.';
      }
    }).then(colourInput => ({ ...answers, ...colourInput }));
  }

  promptShapeInput(answers) {
    return inquirer.prompt({
      type: 'input',
      name: 'shapeInput',
      message: 'Enter Shape:',
      validate: input => ["circle", "triangle", "square"].includes(input.toLowerCase()) || 'Please choose from Circle, Triangle, or Square!',
    }).then(shapeInput => ({ ...answers, ...shapeInput }));
  }

  async generateLogo(finalAnswers) {
    const { logoAcronym, colourInput, shapeInput } = finalAnswers;
    const color = colourInput.toLowerCase();

    // Create canvas size to allow for letter placement
    const canvasWidth = 300;
    const canvasHeight = 200;
    const canvas = new fabric.StaticCanvas(null, { width: canvasWidth, height: canvasHeight });

    // Add shape with color
    let shape; 

    if (shapeInput.toLowerCase() === 'circle') {
      shape = new Circle(color, 100);
    } else if (shapeInput.toLowerCase() === 'square') {
      shape = new Square(color, 100);
    } else if (shapeInput.toLowerCase() === 'triangle') {
      shape = new Triangle(color, 100);
    }

    // Add logo
    if (shape) {
      canvas.add(shape.getFabricObject().set({
        left: canvasWidth / 2,
        top: canvasHeight / 2
      }));

      // Set initial font size and top adjustment
      let fontSize = 40;
      let textTopAdjustment = 0;

      // Handle font size and adjustment for triangles
      if (shapeInput.toLowerCase() === 'triangle') {
        fontSize = 25;
        textTopAdjustment = 20;
      }

      // Add text
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

      // Save logo as SVG
      const outputPath = path.join(__dirname, 'examples', 'logo.svg');
      fs.writeFileSync(outputPath, canvas.toSVG());
      console.log('Generated logo.svg!');
    }
  }
}

module.exports = App;
