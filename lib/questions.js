const colorWordList = require('./colors.json')


/**
 * @typedef Question
 * @type {Object}
 * @property {String} type - The type of question, 'list' or 'input' for example
 * @property {String} name - Name to identify the question. The property name for this question's answer in the inquirer object 'answers'
 * @property {String} message - The message shown to the user in the console.
 * @property {String[]} [choices] - An array of choices for a question of type 'list' or 'rawlist'
 * @property {Function} [when] - Returns a Boolean for whether to show the question or not.
 * @property {Function} [filter] - A filtering function for the answer. answers.name will show the output of the filter function
 * @property {Function} [validate] - Whether the user's typed input is valid. Returns either the Boolean 'true', or an error, prompting the user to edit their response.
*/



const colorOpt = 'Enter custom color';


/**
 * @type {Object}
 */
const questionsObject = {
  shape: {
    type: 'list',
    name: 'shape',
    message: 'What shape do you want?',
    choices: [
      'Triangle',
      'Circle',
      'Square',
      'no shape'
    ],
    when(answers) {return continueLoop(answers)},
    askAnswered: true
  },
  text: {
    input: 'list',
    name: 'text',
    message: 'Enter the text for your logo.',
    when(answers) {return continueLoop(answers)},
    askAnswered: true
  },
  textColorList: {
    type: 'list',
    name: 'textColorList',
    message: 'Choose the color for the text.',
    choices: [
      'red',
      'green',
      'blue',
      colorOpt
    ],
    when(answers) {return continueLoop(answers)},
    askAnswered: true
  },
  textColorInput: {
    type: 'input',
    name: 'textColorInput',
    message: 'Enter a hex value or color keyword',
    when(answers) {
      return (answers.textColorList === 'Enter custom color') && continueLoop(answers)
    },
    validate(input) {
      return colorValidate(input)
    },
    filter(input) {
      return colorFilter(input)
    },
    askAnswered: true
  },
  fillColorList: {
    type: 'list',
    name: 'fillColorList',
    message: 'Choose the color for the shape.',
    choices: [
      'red',
      'green',
      'blue',
      colorOpt
    ],
    when(answers) {
      return (answers.shape !=='no shape') && continueLoop(answers)
    },
    askAnswered: true
  },
  fillColorInput: {
    type: 'input',
    name: 'fillColorInput',
    message: 'Enter a hex value or color keyword',
    when(answers) {
      return (answers.fillColorList === 'Enter custom color') && continueLoop(answers)
    },
    validate(input) {
      return colorValidate(input)
    },
    filter(input) {
      return colorFilter(input)
    },
    askAnswered: true
  },
  fontSizeList: {
    type: 'list',
    name: 'fontSizeList',
    message: 'What font size would you like?',
    choices: [
      '200%',
      '150%',
      '100%',
      '75%'
    ],
    when(answers) {return continueLoop(answers)},
    askAnswered: true
  },
  allDone: {
    type: 'confirm',
    name: 'allDone',
    message: 'Check out your svg. Are you satisfied?',
    when(answers) {
      return answers.continue
    },
    askAnswered: true
  },
  nextStep: {
    type: 'list',
    name: 'nextStep',
    message: 'Would you like to just change the font size, or start all over?',
    choices: [
      'change the font size',
      'start over',
      'I am satisfied.'
    ],
    when(answers) {
      return (answers.continue && !answers.allDone)
    },
    askAnswered: true
  }
}

const continueLoop = (ans) => ((ans.continue && (ans.nextStep === 'start over') && !ans.allDone)|| !ans.continue)

function colorValidate(input) {
  input = colorFilter(input);
  if (input[0] === '#') {
    return true  // The # was only added in colorFilter if it already matched a hex color code
  } else if (colorWordList.includes(input)) {
    return true
  } else {
    return 'Please enter a valid color'
  }

}

function colorFilter(input) {
  const hexRegExp = new RegExp(/^[a-fA-F\d]{6}$/);
  input = input.replace(/[^\w\d]/g,'').toLowerCase();
  if (hexRegExp.test(input)) {
    input = '#' + input;
  }
  return input
}

/**
 * This function returns the array of questions to be given to inquirer, from 'questionsObject' where the questions can be entered in any order.
 * @param  {...String} questionNames - The names of the questions in the order you want them listed.
 * @returns {Question[]}
 */
function questionsArray(...questionNames) {
  let questions = [];
  for (let name of questionNames) {
    if (questionsObject[name]) {
      questions.push(questionsObject[name])
    } else {
      console.error(`There is no question named '${name}', so it was not added to the list of questions.`)
    }
  }
  return questions
}

const questions = questionsArray(
  'allDone',
  'nextStep',
  'shape',
  'text',
  'textColorList',
  'textColorInput',
  'fontSizeList',
  'fillColorList',
  'fillColorInput',
);

function answersColor(colorList,colorInput) {
  return (colorList === colorOpt ?colorInput : colorList)
}

module.exports = {colorFilter, colorValidate, answersColor, questions}