// Jest tests for shapes

const {Logo, Shape, Triangle, Circle, Square} = require('./shapes.js')

// Describe a testing suite for checking the functionality of the Shapes class and its subclasses.

// For now, these tests are based on 
// Shapes.attr = {cx: 150, cy: 100, r: 80, x: 70, y: 20, width: 160, height: 160}
// If those values change for whatever reason, these tests will be invalid

describe('Shapes', () => {

  describe('Triangle render', () => {
    it('should return svg code for the default transparent triangle', () => {
      const shape = new Triangle();
      expect(shape.render()).toEqual(`<polygon points="150, 18 244, 182 56, 182" fill="transparent" />`);
    });
    it('should return svg code for a blue triangle', () => {
      const shape = new Triangle();
      shape.setFillColor("blue");
      expect(shape.render()).toEqual(`<polygon points="150, 18 244, 182 56, 182" fill="blue" />`);
    });

  });

  describe('Circle render', () => {
    it('should return svg code for the default transparent circle', () => {
      const shape = new Circle();
      expect(shape.render()).toEqual(`<circle cx="150" cy="100" r="80" fill="transparent" />`);
    });
    it('should return svg code for a blue circle', () => {
      const shape = new Circle();
      shape.setFillColor("blue");
      expect(shape.render()).toEqual(`<circle cx="150" cy="100" r="80" fill="blue" />`);
    });
  });

  describe('Square render', () => {
    it('should return svg code for the default transparent square', () => {
      const shape = new Square();
      expect(shape.render()).toEqual(`<rect x="70" y="20" width="160" height="160" fill="transparent" />`);
    });
    it('should return svg code for a blue square', () => {
      const shape = new Square();
      shape.setFillColor("blue");
      expect(shape.render()).toEqual(`<rect x="70" y="20" width="160" height="160" fill="blue" />`);
    });
  });

  describe('Fill color option', () => {
    it('should return the list option if the input option is undefined', () => {
      const answers = {fillColorList: 'red'};
      const {fillColorList, fillColorInput} = answers;
      const shape = new Square();
      shape.setFillColor(fillColorInput || fillColorList);
      expect(shape.render()).toEqual(`<rect x="70" y="20" width="160" height="160" fill="red" />`);
    })
  })
});
