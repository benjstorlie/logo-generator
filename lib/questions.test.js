const {colorFilter, colorValidate} = require('./questions.js');
const colorWordList = require('./colors.json');

describe('colorFilter', () => {

  describe('eliminate whitespace', () => {
    it('should filter out all whitespace', () => {
      const input = `  Cornflower  Blue`
      expect(colorFilter(input)).toEqual(`cornflowerblue`);
    });
    it('should filter out all punctuation', () => {
      const input = `#Corn,flower,Blue-.,^`
      expect(colorFilter(input)).toEqual(`cornflowerblue`);
    });
  });
})