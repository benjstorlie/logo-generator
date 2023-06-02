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


/**
 * The last of the list of choices for colors. This value is used to compared to in order to tell if the users did choose to enter a custom color
 * @type {String}
 */
const colorOpt = 'Enter custom color';

/**
 * @type {Question[]}
 */
const questions = [
  {
    input: 'list',
    name: 'text',
    message: 'Enter the text for your logo.'
  },
  {
    type: 'list',
    name: 'textColorList',
    message: 'Choose the color for the text.',
    choices: randomColors().concat(colorOpt),
  },
  {
    type: 'input',
    name: 'textColorInput',
    message: 'Enter a hex value or color keyword',
    when: (answers) => (answers.textColorList === colorOpt),
    validate: (input) => colorValidate(input),
    filter: (input) => colorFilter(input),
  },
  {
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
  {
    type: 'list',
    name: 'fillColorList',
    message: 'Choose the color for the shape.',
    choices: randomColors().concat(colorOpt),
    when: (answers) => (answers.shape !=='no shape'),
  },
  {
    type: 'input',
    name: 'fillColorInput',
    message: 'Enter a hex value or color keyword',
    when: (answers) => (answers.fillColorList === colorOpt),
    validate: (input) => colorValidate(input),
    filter: (input) => colorFilter(input),
  },
]

/**
 * Validates the custom color input from the user by checking whether it is a 6-digit hex color code, or is a color keyword from the imported list 'colorWordList'
 * @param {String} input - the text inputted by the user
 * @returns {Boolean | String} either 'true' or an error message to show on the console
 */
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

/**
 * The filter function for the typed color input. It eliminates everything but letters and numbers, and if it is in the form of a hex color code, it adds a # to the front.
 * @param {String} input - the text inputted by the user
 * @returns {String} the filtered color string
 */
function colorFilter(input) {
  const hexRegExp = new RegExp(/^[a-fA-F\d]{6}$/);
  input = input.replace(/[^\w\d]/g,'').toLowerCase();
  if (hexRegExp.test(input)) {
    input = '#' + input;
  }
  return input
}

/**
 * Gets a number of random colors from the list of valid svg color keywords
 * @param {Number} total - How many random colors, default value is 4
 * @returns {String[]} an array of length n 
 */
function randomColors(total=4) {
  const len = colorWordList.length
  let colors = [];
  while (colors.length < total) {
    let rand = Math.floor(len * Math.random());
    if (!(colors.includes(rand))) {
      colors.push(rand)
    }
  }
  colors = colors.map(e => colorWordList[e])
  return colors
}

module.exports = {colorFilter, colorValidate, randomColors, questions}