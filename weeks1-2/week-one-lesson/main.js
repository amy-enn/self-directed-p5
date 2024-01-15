import './style.css';
import p5 from 'p5';



// important: the coordinate system starts with (0, 0) at the top left of the canvas


// initialize a new sketch
// sketch one - absolute size & pos.
new p5((p) => {

  // the setup function that creates the canvas and sets up for the sketch
  p.setup = () => {
    // create a canvas 400px x 400px
    p.createCanvas(400, 400);
  };

  // the draw function that draws the sketch itself
  p.draw = () => {
    // yellow background on the canvas
    p.background(255, 255, 0);
    p.strokeWeight(10);

    // ellipse & rect params: (x, y, width, height)
    // triangle params: (x1, y1, x2, y2, x3, y3)
    // line params: (x1, y1, x2, y2)
    // fill, stroke, etc params: rbg

    // create the circle, rectangle, triangle, and line
    p.fill(255, 0, 255);
    p.stroke(0, 255, 255);
    p.ellipse(75, 75, 80, 80);

    p.fill(0, 255, 0);
    p.stroke(255, 0, 0);
    p.rect(150, 100, 200, 100);

    p.fill(0, 0, 255);
    p.stroke(128, 0, 128);
    p.triangle(350, 350, 125, 380, 150, 250);

    p.stroke(0, 128, 128);
    // round the line edges
    p.strokeCap(p.ROUND);
    p.line(50, 150, 75, 240);
  };
});

// initialize a new sketch
// responsive
// second sketch: relative size & pos
new p5((p) => {

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
  };

  p.draw = () => {
    p.background(255, 255, 0);
    p.strokeWeight(10);

    let ellipseX = p.width * 0.2;
    let ellipseY = p.height * 0.2;
    let ellipseSize = p.width * 0.2;

    // rectangle scaling based on canvas width
    let rectWidth = p.width * 0.3;
    let rectHeight = rectWidth / 1.75;
    let rectX = p.width * 0.6;
    let rectY = p.height * 0.3;

    // triangle scaling based on canvas width
    let triBaseWidth = p.width * 0.3;
    let triHeight = triBaseWidth * Math.sqrt(3) / 2;
    let triCenterX = p.width * 0.6;
    let triCenterY = p.height * 0.8;

    let triX1 = triCenterX;
    let triY1 = triCenterY - triHeight / 2;
    let triX2 = triCenterX - triBaseWidth / 2;
    let triY2 = triCenterY + triHeight / 2;
    let triX3 = triCenterX + triBaseWidth / 2;
    let triY3 = triY2;

    let lineX1 = p.width * 0.15;
    let lineY1 = p.height * 0.4;
    let lineX2 = p.width * 0.25;
    let lineY2 = p.height * 0.6;

    // Draw the shapes
    p.fill(255, 0, 255);
    p.stroke(0, 255, 255);
    p.ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);

    p.fill(0, 255, 0);
    p.stroke(255, 0, 0);
    p.rect(rectX, rectY, rectWidth, rectHeight);

    p.fill(0, 0, 255);
    p.stroke(128, 0, 128);
    p.triangle(triX1, triY1, triX2, triY2, triX3, triY3);



    p.stroke(0, 128, 128);
    p.strokeCap(p.ROUND);
    p.line(lineX1, lineY1, lineX2, lineY2);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
  };
});


// third sketch
// some transformation/animation examples
new p5((p) => {
  let angle = 0;
  let hue = 0;
  let oscAngle = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
    // use HSB color made
    p.colorMode(p.HSB, 360, 100, 100);
  };

  p.draw = () => {
    p.background(150, 250, 75);
    p.strokeWeight(5);


    // move the ellipse to the center
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);
    // rotation speed
    angle += 0.05;


    let ellipseWidth = p.width * 0.5;
    let ellipseHeight = ellipseWidth / 2;
    // oscillation amplitude
    let y = p.sin(oscAngle) * 50;
    // osc speed
    oscAngle += 0.10;

    hue = (hue + 1) % 360;
    p.fill(hue, 100, 100);
    p.stroke(250, 50, 25);
    // apply the oscillaiton when building the ellipse since it will rerender the ellipse each time
    p.ellipse(0, 0, ellipseWidth + y, ellipseHeight);

    // reset the transformations so they don't accumulate
    p.resetMatrix();

  };

  // resize the canvas with the window size as necessary
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
  };
});





// fourth sketch
// timers, mouse clicks, and event handlers
new p5((p) => {

  let bgColor = 0;
  let ellipseColor = p.color(255, 204, 0);

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
    // use HSB color mode
    p.colorMode(p.HSB, 360, 100, 100);
  };

  p.draw = () => {
    p.background(bgColor, 100, 100);
    p.fill(ellipseColor);
    // this ellipse follows the mouse around by grabbing the mouse's coordinates on the canvas
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };

  // change background color on click
  p.mouseClicked = () => {
    // a random hue :)
    bgColor = p.random(360);
    // change ellipse color on click also for contrast
    ellipseColor = p.color((bgColor + 180) % 360, 100, 100);
  };

  // reset bgcolor and ellipse color when R key is pushed
  p.keyPressed = () => {
    if (p.key === 'r') {
      bgColor = 0;
      ellipseColor = p.color(255, 204, 0);
    }
  };

  // resize the canvas with the window size as necessary
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
  };
});

// the hover event
// 5th sketch
// the elusive ellipse lol
new p5((p) => {

  let ellipseX, ellipseY;
  const ellipseSize = 50;

  // initialize the canvas
  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
    updateEllipsePosition();
  };

  // draw the ellipse
  p.draw = () => {
    p.background(150, 250, 75);
    p.fill(60, 0, 100);
    p.noStroke();
    p.ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);
  };

  // detecting the hover
  function isMouseOverEllipse(x, y, size) {
    // p.dist calculates the distance between 2 points... x1 y1, and x2 y2
    // so this calculates the distance between the current couse position and the center of the ellipse
    const distance = p.dist(p.mouseX, p.mouseY, x, y);
    return distance < size / 2;
  }

  p.mouseMoved = () => {
    if (isMouseOverEllipse(ellipseX, ellipseY, ellipseSize)) {
      updateEllipsePosition();
    }
  };


  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
  };

  function updateEllipsePosition() {
    // ensure ellipse stays within the bounds of the canvas
    ellipseX = p.random(ellipseSize, p.width - ellipseSize);
    ellipseY = p.random(ellipseSize, p.height - ellipseSize);
  }


});