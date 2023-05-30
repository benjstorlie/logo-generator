// Runs the application using imports from lib/

const {Shape, Triangle, Circle, Square} = require('./lib/shapes.js')
const Logo = require('./lib/logo.js')
const {colorFilter, colorValidate, answersColor, questions} = require('./lib/questions.js')
const { writeToFile, titleFileName} = require('./lib/fsUtils.js');

// Import Inquirer for command-line interaction
const inquirer = require('inquirer');



function buildSVG() {

  console.log('buildSVG')

  inquirer.prompt(questions,{cont: false}).then((answers) => {
    console.log('ans:'+answers)
    const { shape,
      text,
      textColorList,
      textColorInput,
      fontSizeList,
      fillColorList,
      fillColorInput
    } = answers;
    let logo = new Logo({
      textColor: answersColor(textColorList,textColorInput),
      text: text,
    });
    fontSizeList.pop();
    logo.setTextSize({value: Number(fontSizeList)})
    if (shape !== 'no shape') {
      logo.setFillColor(answersColor(fillColorList, fillColorInput))
      logo.setShape(shape);
    } 

    try {
      writeToFile(titleFileName(text),logo.render(),'logos')
    } catch(err) {
      console.log(err);
      console.log(logo.render()) // At least you don't lose your data and have to do it all over again if it doesn't save correctly.
    }
    })

    answers.continue = true
    inquirer.prompt(questions,answers)
    
}


function edit(logo, edit) {
  edit.continue = true;
  inquirer.prompt(questions,edit).then((answers) => {

  })
}

function init() {
  buildSVG();
}

init()