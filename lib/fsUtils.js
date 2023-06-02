const fs = require('fs')

/**
 * Writes svg to the directory specified
 * @param {String} fileName - the name of the file to save
 * @param {String} data - The rendered svg code
 * @param {String} directory - The directory to save the file under
 */
function writeToFile(fileName, data, directory) {
  fs.writeFile(`./${directory}/${fileName}.svg`,data, function (err) {
    if (err) {
      throw new Error("An error occured while writing data to file.");
    }
    console.log(`Generated ${fileName}.svg`);
    });
}

/**
 * Reformats the title to be a  filename.  This way different projects won't be saved with the same name.
 * @param {String} title 
 */
function titleFileName(title) {

  let fileName = title.trim()
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/[^\w-]/g, '')  // Remove special characters except hyphens and underscores
    .toLowerCase();

  return fileName;

}

module.exports = { writeToFile, titleFileName}