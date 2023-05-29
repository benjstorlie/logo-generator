// Runs the application using imports from lib/

const {Shape, Triangle, Circle, Square} = require('./lib/shapes.js')
const Logo = require('./lib/logo.js')
const {colorFilter, colorValidate, answersColor, questions} = require('./lib/questions.js')
const { writeToFile, titleFileName} = require('./lib/fsUtils.js');

// Import Inquirer for command-line interaction
const inquirer = require('inquirer');



function init() {

  inquirer.prompt(questions).then((answers) => {
    let logo = new Logo({
      textColor: answersColor(answers.textColorList,answers.textColorInput),
      text: answers.text,
    })
    if (answers.shape !== 'no shape') {
      logo.setFillColor(answersColor(answers.fillColorList, answers.fillColorInput))
      logo.setShape(answers.shape);
    } 

    try {
      writeToFile(titleFileName(answers.text),logo.render(),'logos')
    } catch(err) {
      console.log(err);
      console.log(logo.render()) // At least you don't lose your data and have to do it all over again if it doesn't save correctly.
    }

  });

  
}

init()