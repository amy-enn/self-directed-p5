function butterflySketch(p) {

    let canvasWidth;
    let canvasHeight;


    p.setup = () => {
        canvasWidth = p.windowWidth * 0.8;
        canvasHeight = p.windowHeight * 0.5;
        // baseUnit = canvasWidth / 20;

        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDiv');
        canvas.style('border', '5px solid sienna');
        canvas.style('border-radius', '15px');

        p.noLoop();
    }

    p.draw = () => {
        p.background(255);

        // sky
        p.fill(173, 216, 230);
        p.noStroke();
        p.rect(0, 0, canvasWidth, canvasHeight * 2 / 3);

        // earth
        p.fill(79, 121, 66);
        p.noStroke();
        p.rect(0, canvasHeight * 2 / 3, canvasWidth, canvasHeight * 1 / 3);

        // sun
        p.fill(255, 195, 0);
        p.noStroke();
        p.circle(0, 0, canvasWidth * 0.15);

        drawButterfly(canvasWidth / 2, canvasHeight / 2);
        drawAnt(canvasWidth / 4, canvasHeight * 3 / 4);
        drawBee(canvasWidth * 3/4, canvasHeight / 4);
    }

    function drawButterfly(x, y) {

        // Wings of the butterfly
        drawWing(x - 28, y + 20, 40, 60, 45, 'plum'); // Lower left wing
        drawWing(x + 28, y + 20, 40, 60, -45, 'plum'); // Lower right wing
        drawWing(x - 28, y - 20, 40, 60, -45, 'pink'); // Upper left wing
        drawWing(x + 28, y - 20, 40, 60, 45, 'pink'); // Upper right wing

        // Body of the butterfly
        p.fill('black');
        p.ellipse(x, y, 10, 50);

        // Antennas of the butterfly
        p.stroke('black');
        p.line(x - 2, y - 25, x - 15, y - 45);
        p.line(x + 2, y - 25, x + 15, y - 45);
    }

    // larger butterfly
    // function drawButterfly(x, y) {

    //     // Scaling factor
    //     let scale = 2;

    //     // Wings of the butterfly
    //     drawWing(x - 28 * scale, y + 20 * scale, 40 * scale, 60 * scale, 45, 'plum'); // Lower left wing
    //     drawWing(x + 28 * scale, y + 20 * scale, 40 * scale, 60 * scale, -45, 'plum'); // Lower right wing
    //     drawWing(x - 28 * scale, y - 20 * scale, 40 * scale, 60 * scale, -45, 'pink'); // Upper left wing
    //     drawWing(x + 28 * scale, y - 20 * scale, 40 * scale, 60 * scale, 45, 'pink'); // Upper right wing

    //     // Body of the butterfly
    //     p.fill('black');
    //     p.ellipse(x, y, 10 * scale, 50 * scale);

    //     // Antennas of the butterfly
    //     p.stroke('black');
    //     p.line(x - 2 * scale, y - 25 * scale, x - 15 * scale, y - 45 * scale);
    //     p.line(x + 2 * scale, y - 25 * scale, x + 15 * scale, y - 45 * scale);
    // }


    function drawWing(x, y, w, h, angle, color) {
        p.push(); // Save the current state
        p.translate(x, y); // Move to the position where the wing should be drawn
        p.rotate(angle); // Rotate by the specified angle
        p.fill(color);
        p.noStroke(); // Remove stroke for aesthetic purposes
        p.ellipse(0, 0, w, h); // Draw the wing
        p.pop(); // Restore the state
    }



    function drawAnt(x, y) {
        // Ant body segments
        let segmentSize = 35;
        p.fill('black');
        p.ellipse(x, y, segmentSize, segmentSize); // Head
        p.ellipse(x + 35, y, segmentSize, segmentSize); // Middle
        p.ellipse(x + 70, y, segmentSize, segmentSize); // Rear

        // Ant legs
        for (let i = 0; i < 3; i++) {
            p.line(x + i * 20, y + 8, x + i * 20 - 10, y + 18); // Left legs
            p.line(x + i * 20, y + 8, x + i * 20 + 10, y + 18); // Right legs
        }

        // Ant antennas
        p.line(x, y - 8, x - 10, y - 18);
        p.line(x, y - 8, x + 10, y - 18);
    }

    function drawBee(x, y) {

        let bodyLength = 50;
        let bodyHeight = 30;

        //furthest wing
        p.fill('gainsboro');
        p.noStroke();
        p.ellipse(x, y - 10, bodyHeight * 0.8, bodyLength * 0.8);


        // body
        p.fill('yellow');
        p.noStroke();
        p.ellipse(x, y, bodyLength, bodyHeight);

        // stripes
        p.fill('black');
        p.noStroke();
        p.rect(x - 5, y - 7, 10, bodyHeight - 6);
        p.rect(x + 5, y - 7, 10, bodyHeight - 6);

        //closest wing
        p.fill('white');
        p.noStroke();
        p.ellipse(x + 6, y - 10, bodyHeight * 0.8, bodyLength * 0.8);
    }


}





export { butterflySketch };