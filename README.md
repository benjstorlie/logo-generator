# Logo Generator

## Table of Contents

1. [Description](#description)
    * [User Story](#user-story)
    * [Acceptance Criteria](#acceptance-criteria)
2. [Installation and Use](#installation-and-use)
    * [Example Use](#example-use)
3. [Comments](#comments)
    * [Future Ideas](#future-ideas) 

## Description

This is a command-line application that generates a simple svg logo, given a series of prompts to the user.

### User Story

```md
AS a freelance web developer
I WANT to generate a simple logo for my projects
SO THAT I don't have to pay a graphic designer
```

### Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I am prompted for text
THEN I can enter up to three characters
WHEN I am prompted for the text color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I am prompted for a shape
THEN I am presented with a list of shapes to choose from: circle, triangle, and square
WHEN I am prompted for the shape's color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I have entered input for all the prompts
THEN an SVG file is created named `logo.svg`
AND the output text "Generated logo.svg" is printed in the command line
WHEN I open the `logo.svg` file in a browser
THEN I am shown a 300x200 pixel image that matches the criteria I entered
```

## Installation and Usage

The readme generator requires nodejs and inquirer to support the command line prompts.  Start by installing the required packages with

`npm install`

Start the program by entering

`node index.js`

Your new logo will be saved in the folder `logos`, with a title based on the text of the logo.

### Example Use

[Link to example use video](https://drive.google.com/file/d/1JUvvsLufU_rw_gxJIlaTeVUuUzkQDn9U/view)

The above video shows an example logo being made. It shows how validation for the color inputs works, and how you can input both hex and color keywords, and that it is flexible with inputs. It also shows the jest tests passing.

## Comments

1. This is the second project I've turned in where I've used JSDoc for commenting in my code. This has been incredibly useful for modules, as when you mouseover a function imported from another file, VSCode can still read the comments from the other file so you know details about the function.  I've still not mastered all it can do.

2. As I build up code, I usually throw in extra functions, or keep things as variables that won't necessarily be changing in a Minimum Viable Product. I find it easier to build in flexibility from the start, while I'm already in that mindset, instead of having to go back later and add something. It does feel weird, however, to submit a project that has a lot of code that is not used.

### Future Ideas

1. I think it makes sense to allow the user to view their logo, and choose to change it or not.  I had started to work on having inquirer act more dynamically and conditionally, but there was a bug and I decided to revert to a working version

1. I've already coded the building blocks for allowing the user control over font size. It does not seem possible to easily have the text size change so it fits inside a given rectangle, especially considering support for a given font style. I think it makes sense, then, to have the user check the first result, and revise the font size accordingly.
  * Another consideration regarding text size is the vertical placement of the text.  The `y` coordinate is just for the base of the text. So if the font size increases, the `y` coordinate will have to increase as well, to ensure the text remains roughly vertically centered.

3. I would like to learn about coloring the command-line text, so that the user could see how the text color looks on top of the shape fill color. Because one of the two colors would be chosen first -- the text, say -- I'd have to have a function to get the Lightness of that color to determine whether the background would be white or black so that the text could still be read.

## Sources

1. I copy pasted the color keyword table from the [CSS documentation](https://www.w3.org/TR/css-color-3/#svg-color). It is the same list of color keywords as in the [SVG documentation](https://www.w3.org/TR/SVG11/types.html#ColorKeywords).  The CSS's table had both the hex and rgb values right in the row, which I thought might be helpful to have in the future. 

