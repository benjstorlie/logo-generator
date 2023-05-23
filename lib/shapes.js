// Exports `Triangle`, `Circle`, and `Square` classes

/**
 * Handles all the data to render the full svg code
 */
class Logo {
  static defaults = {
    fillColor: 'transparent',
    text: '',
    textColor: '#000000',
    textSize: {value: 1, unit: 'em'},
    shape: 'none'
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
    this.text = textString
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
}


/**
 * The super class for Triangle, Circle, etc.  Shape is not intended to be used on its own.
 */
class Shape {

  static attr = {cx: 150, cy: 100, r: 80, x: 70, y: 20, width: 160, height: 160} 

  /**
   * Sets default property values for a new Shape instance
   */
  constructor({fillColor}={}) {
    this.fillColor = fillColor || Logo.defaults.fillColor;
  }

  /**
   * Sets the 'fillColor' property of a 'Shape' instance
   * This method is not inherited from the setFillColor Logo method, but the Logo method does call the Shape method to set both the Logo.fillColor and the Logo.shape.fillColor properties
   * @param {String} fillColorString - either a color keyword or hexadecimal number, for the fillColor of the shape itself
   */
  setFillColor(fillColorString) {
    this.fillColor = fillColorString
  }

  /**
   * This basic Shape.render method is here as a placeholder.  In the subclasses with specific shapes, render returns a string of svg code to insert in the logo svg code.
   * @returns an empty string
   */
  render() {
    return ``
  }

}


class Circle extends Shape {
  /**
   * Sets default properties for a new Circle instance
   */
  constructor(...args) {
    super(...args);
  }

  render() {
    return `<circle cx="${Circle.attr.cx}" cy="${Circle.attr.cy}" r="${Circle.attr.r}" fill="${this.fillColor}" />`
  }

}

class Triangle extends Shape {
  /**
   * Sets default properties for a new Circle instance
   */
  constructor(...args) {
    super(...args);
  }

  render() {
    `<polygon points="150, 18 244, 182 56, 182" fill="${this.fillColor}" />`
  }
}

class Square extends Shape {
  /**
   * Sets default properties for a new Circle instance
   */
  constructor(...args) {
    super(...args);
  }

  render() {

    return `<rect x="${Square.attr.x}" y="${Square.attr.y}" width="${Square.attr.width}" height="${Square.attr.height}" fill="${this.fillColor}" />`
  }

}
