
const {Shape, Triangle, Circle, Square} = require('./shapes.js')

/**
 * Handles all the data to render the full svg code
 */
class Logo {
  static defaults = {
    fillColor: 'transparent',
    text: '',
    textColor: '#000000',  // Black
    textSize: {value: 3, unit: 'em'},  // These are separated in case calculations need to be done on the font size value.  For example, in an 'increase' or 'decrease font size' method.
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
    // If the shape property of this has already been set, the shape's fillColor property must be updated as well.
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
   * This is a less restrictive way to set the textSize properties.  Accepts '1em' '1' 'em' '1 em' 'em 1' 'em, 1'.  If only one of the properties is included, only that property will be updated.
   * @param {String} fontSizeString - a string with the font size value and/or unit included as the first range of numbers and/or letters, respectively
   */
  set fontSize(fontSizeString) {
    // String.prototype.match returns an array if there is a match, and null if it does not
    let value = fontSizeString.match(/[0-9]+/);
    let unit = fontSizeString.match(/[A-Za-z]+/);
    if (value) {this.textSize.value = Number(value[0])}
    if (unit) {this.textSize.unit = unit[0]}
  }

  /**
   * Sets the 'shape' property of a 'Logo' instance
   * @param {String} shapeString - either 'circle', 'triangle', or 'square'
   */
  setShape(shapeString) {
    shapeString = shapeString.trim().toLowerCase();
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
    if (this.shape instanceof Triangle) {
      return `<text x="150" y="130" font-size="${this.fontSize}" font-family="sans-serif" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`
    } else {
      // y = "108" makes the text about vertically centered in a square or circle.
      return `<text x="150" y="115" font-size="${this.fontSize}" font-family="sans-serif" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`
    }
    
  }

  render() {
    return Logo.svg.start +
    '\n\t'+this.shape.render() +
    '\n\t'+this.textRender() +
    '\n'+Logo.svg.end
  }

}

module.exports = Logo