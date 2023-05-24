// Exports `Triangle`, `Circle`, and `Square` classes

/**
 * The super class for Triangle, Circle, etc.  Shape is not intended to be used on its own.
 */
class Shape {

  // Currently, these size and location attributes for the logo's shape are not dynamic -- for example, the triangle cannot be scaled at all.  I'm just putting the building blocks in.
  static attr = {cx: 150, cy: 100, r: 80, x: 70, y: 20, width: 160, height: 160} 
  static defaults = {fillColor: 'transparent'}

  /**
   * Sets default property values for a new Shape instance
   */
  constructor({fillColor}={}) {
    this.fillColor = fillColor || Shape.defaults.fillColor;
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
   * Returns a string of svg code to insert the particular shape with its attributes in the logo svg code.
   * @returns {String}
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
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.fillColor}" />`
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


module.exports = {Shape, Triangle, Circle, Square}