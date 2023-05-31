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
    ]
  },
  text: {
    input: 'list',
    name: 'text',
    message: 'Enter the text for your logo.'
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
    ]
  },
  textColorInput: {
    type: 'input',
    name: 'textColorInput',
    message: 'Enter a hex value or color keyword',
    when: (answers) => (answers.textColorList === colorOpt),
    validate: (input) => colorValidate(input),
    filter: (input) => colorFilter(input),
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
    when: (answers) => (answers.shape !=='no shape'),
  },
  fillColorInput: {
    type: 'input',
    name: 'fillColorInput',
    message: 'Enter a hex value or color keyword',
    when: (answers) => (answers.fillColorList === colorOpt),
    validate: (input) => colorValidate(input),
    filter: (input) => colorFilter(input),
  },
}

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
  'shape',
  'text',
  'textColorList',
  'textColorInput',
  'fontSizeList',
  'fillColorList',
  'fillColorInput',
);

/**
 * A function just for interpreting the user's chosen color.  Since the colorInput value would be undefined if the user chose a color from the list, I suppose this could be replaced with just color = colorInput || colorList
 * @param {String} colorList - the answer chosen from the fillColorList or textColorList question - either a color keyword or the value of the variable colorOpt, which is something like "choose a custom color"
 * @param {String | undefined} colorInput - the filtered input from the fillColorInput or textColorInput question. It should only be defined if the answer to colorList was to enter a custom color.
 * @returns {String} the chosen color for the shape or the text
 */
const answersColor = (colorList,colorInput) => (colorList === colorOpt ?colorInput : colorList);

module.exports = {colorFilter, colorValidate, answersColor, questions}