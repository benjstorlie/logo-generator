const {colorFilter, colorValidate} = require('./questions.js');
const colorWordList = require('./colors.json');

describe('colorFilter', () => {

  describe('filter extraneous characters', () => {
    it('should filter out all whitespace', () => {
      const input = `  Cornflower  Blue`;
      expect(colorFilter(input)).toEqual(`cornflowerblue`);
    });
    it('should filter out all punctuation', () => {
      const input = `#Corn,flower,Blue-.,^`;
      expect(colorFilter(input)).toEqual(`cornflowerblue`);
    });
  });

  describe('hexcolors', () => {
    it('should output a hexstring with a #', () => {
      const input = `457892`;
      expect(colorFilter(input)).toEqual(`#457892`)
    });
    // adding a # for hex color codes here is the only thing the validate function looks at, so these passing correctly is important
    it('should fail for any non-hex characters', () => {
      const input = `4ge8c2`;
      expect(colorFilter(input)).toEqual(`4ge8c2`)
    });
    it('should fail for too long strings', () => {
      const input = `43e8c2aa`;
      expect(colorFilter(input)).toEqual(`43e8c2aa`)
    });
  })
});

describe('colorValidate', () => {

  describe('hexcolors', () => {
    it('should pass for 6 numbers', () => {
      const input = `457892`;
      expect(colorValidate(input)).toEqual(true)
    });
    it('should fail for any non-hex characters', () => {
      const input = `4ge8c2`;
      expect(colorValidate(input)).toEqual('Please enter a valid color')
    });
    it('should fail for too long strings', () => {
      const input = `4e8c2aa`;
      expect(colorValidate(input)).toEqual('Please enter a valid color')
    });
    it('should fail for too short strings', () => {
      const input = `47e`;
      expect(colorValidate(input)).toEqual('Please enter a valid color')
    });
  })

  describe('color keywords', () => {
    it('should pass for a color name in the list', () => {
      const input = `papayawhip`;
      expect(colorValidate(input)).toEqual(true)
    });
    it('should pass for a color name in the list, even with extra characters', () => {
      const input = ` PapaYa Whip-`;
      expect(colorValidate(input)).toEqual(true)
    });
    it('should fail for anything not included in the list', () => {
      const input = `tomatored`;
      expect(colorValidate(input)).toEqual('Please enter a valid color')
    });
  })
})