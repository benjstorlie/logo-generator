// Runs the application using imports from lib/

//const {Shape, Triangle, Circle, Square} = require('./lib/shapes.js')
const Logo = require('./lib/logo.js')
const {questions} = require('./lib/questions.js')
const { writeToFile, titleFileName} = require('./lib/fsUtils.js');

// Import Inquirer for command-line interaction
const inquirer = require('inquirer');

function buildSVG() {

  inquirer.prompt(questions).then((answers) => {
    const { shape,
      text,
      textColorList,
      textColorInput,
      fillColorList,
      fillColorInput
    } = answers;
    let logo = new Logo({
      textColor: textColorInput || textColorList, 
      text: text,
    });
    if (shape !== 'no shape') {
      logo.setFillColor(fillColorInput || fillColorList)
      logo.setShape(shape);
    } 

    try {
      writeToFile(titleFileName(text),logo.render(),'logos')
    } catch(err) {
      console.log(err);
      console.log(logo.render()) // At least you don't lose your data and have to do it all over again if it doesn't save correctly.
    }
    })
}

function init() {
  buildSVG();
}

init()