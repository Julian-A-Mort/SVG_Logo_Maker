const inquirer = require('inquirer');

inquirer
  .prompt({
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
}).then (() => {
    return inquirer.prompt({
        type: 'input',
        name: 'colourInput',
        message: 'Enter Colour',
        validate: function(input) {
            const colorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
            const colorKeywords = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white"];
            if (colorPattern.test(input) || colorKeywords.includes(input.toLowerCase())) {
              return true;
            }
            return 'Please enter a valid color keyword or hexadecimal color code.';
          }
    });
}).then (() => {
    return inquirer.prompt({
        type: 'input',
        name: 'shapeInput',
        message: 'Enter Shape',
        validate: function(input) {
            const shapeKeywords = ["circle", "triangle", "square"];
            if (shapeKeywords.includes(input.toLowerCase())) {
                return true;
              }
              return 'Please choose from Circle, Triangle or Square!';          }
    });
});

