const colorWordList = require('./colors.json')

const questions = {
  shape: {
    type: list,
    name: shape,
    message: 'What shape do you want?',
    choices: [
      'Triangle',
      'Circle',
      'Square',
      'no shape'
    ]
  },
  text: {
    input: list,
    name: text,
    message: 'Enter the text for your logo',
  }
}

function colorValidate(input) {
  hexRegExp = new RegExp(/#?[a-fA-F\d]{6}/);
  
}

function colorFilter(input) {

}