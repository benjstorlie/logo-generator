
const {Shape, Triangle, Circle, Square} = require('./shapes.js')

/**
 * Handles all the data to render the full svg code
 */
class Logo {
  static defaults = {
    fillColor: 'transparent',
    text: '',
    textColor: '#000000',  // Black
    textSize: {value: 1, unit: 'em'},  // These are separated in case calculations need to be done on the font size value.  For example, in an 'increase' or 'decrease font size' method.
    shape: { render() {return ``} }     // If no shape is given, this.render can still call this.shape.render
  }

  static svg = {
    start: `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`,
    end: `</svg>`
  }

  constructor({fillColor, textColor, text, shape, textSize}={}) {
    this.fillColor = fillColor || Logo.defaults.fillColor;
    this.textColor = textColor || Logo.defaults.textColor;
    this.text = text || Logo.defaults.text;
    this.textSize = textSize || Logo.defaults.textSize;

    try {
      this.setShape(shape)  // sets this.shape as a new Shape instance
    } catch {
      this.shape = shape || Logo.defaults.shape
    }
  }

  // **It might be better to learn about setters and structure it that way, but this is fine for now**

  /**
   * Sets the 'fillColor' property of a 'Logo' instance
   * @param {String} fillColorString - either a color keyword or hexadecimal number, for the fillColor of the shape itself
   */
  setFillColor(fillColorString) {
    this.fillColor = fillColorString
    if (this.shape instanceof Shape) {
      this.shape.setFillColor(fillColorString)
    }
  }

  /**
   * Sets the 'text' property of a 'Logo' instance
   * @param {String} textString - text to put inside the shape
   */
  setText(textString) {
    this.text = textString.trim()
  }

  /**
   * Sets the 'textColor' property of a 'Logo' instance
   * @param {String} textColorString - either a color keyword or hexadecimal number, for the text to put inside the shape
   */
  setTextColor(textColorString) {
    this.textColor = textColorString
  }

  /**
   * Sets the 'textSize' property of a 'Logo' instance
   * @param {Object} textSize - The font size to be given to the svg file
   * @param {Number} textSize.value - The number value of the font size
   * @param {String} textSize.unit - the unit, ('em', 'px', etc.)
   */
  setTextSize({value, unit}) {
    if (value) {
      this.textSize.value = value
    }
    if (unit) {
      this.textSize.unit = unit
    }
  }
  
  /**
   * This just puts the textSize.value and textSize.unit together to use in rendering
   */
  get fontSize() {
    return this.textSize.value + this.textSize.unit
  }

  /**
   * Sets the 'shape' property of a 'Logo' instance
   * @param {String} shapeString - either 'circle', 'triangle', or 'square'
   */
  setShape(shapeString) {
    shapeString = shapeString.toLowerCase();
    if (shapeString === 'circle') {
      this.shape = new Circle({fillColor: this.fillColor})
    } else if (shapeString === 'triangle') {
      this.shape = new Triangle({fillColor: this.fillColor})
    } else if (shapeString === 'square') {
      this.shape = new Square({fillColor: this.fillColor})
    } else {
      throw new Error("shape must be either 'circle', 'triangle', or 'square'")
    }
  }

  textRender() {
    return `<text x="150" y="125" font-size="${this.fontSize}" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
    `
  }

  render() {
    return Logo.svg.start +
    this.shape.render() +
    this.textRender() +
    Logo.svg.end
  }

}

module.exports = Logo