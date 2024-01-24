//using a hardcoded dataset for now, for all three charts
let data = [5, 12, 10, 20, 25, 22, 28, 35, 25];

// needed for the hover style over the line chart
let hoverIndex = -1;

// needed for the click style on the bar chart
let clickedBarIndex = -1;


// drawAxes function is shared between the line chart and the bar chart
function drawAxes(p, leftMargin, bottomMargin, topMargin, yMax, yScale, canvasWidth, canvasHeight) {
    p.stroke(0);
    p.strokeWeight(2);

    // y axis
    p.line(leftMargin, topMargin, leftMargin, canvasHeight - bottomMargin);

    // x axis
    p.line(leftMargin, canvasHeight - bottomMargin, canvasWidth, canvasHeight - bottomMargin);

    // axis labels and ticmarks
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);

    // X axis labels
    let spacing = (canvasWidth - leftMargin) / data.length;
    for (let i = 0; i < data.length; i++) {
        p.text(i + 1, leftMargin + i * spacing + spacing / 2, canvasHeight - bottomMargin + 15);
    }

    // y axis labels and ticks
    // how much between the ticks
    let stepValue = 5;
    // how many steps (based on maximum y value)
    let numSteps = Math.ceil(yMax / stepValue);
    for (let i = 0; i <= numSteps; i++) {
        let yVal = i * stepValue;
        let y = canvasHeight - bottomMargin - (yVal / yMax) * (canvasHeight - topMargin - bottomMargin);
        p.textAlign(p.RIGHT, p.CENTER);
        p.text(yVal, leftMargin - 10, y);
        // the tiny ticks that mark each segment
        p.line(leftMargin - 5, y, leftMargin + 5, y);
    }
}

// TOOLTIP FUNCTION FOR THE LINE CHART HOVERING
function drawTooltip(p, index, value, leftMargin, bottomMargin, yScale) {
    let spacing = (p.width - leftMargin) / data.length;
    let x = leftMargin + index * spacing;
    let y = p.height - bottomMargin - value * yScale;

    // tooltip styling
    p.fill(255);
    p.stroke(155, 100, 234);
    p.strokeWeight(2);
    p.rect(p.mouseX + 15, p.mouseY - 20, 75, 30, 10);

    // tooltip text styling
    p.fill(0);
    p.noStroke();
    // align the text within the tooltip rectangle
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Value: ${value}`, p.mouseX + 20, p.mouseY - 15);
}


// LINE CHART
function lineChart(p) {
    let canvasWidth, canvasHeight, leftMargin, bottomMargin, topMargin, yMax, yScale;

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.5;
        canvasHeight = p.windowHeight * 0.3;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('lineCanvas');
        // p5 has its own syntax for styling its objects...
        canvas.style('outline', '10px solid lime');
        canvas.style('border-radius', '15px');


        // set up the margins
        leftMargin = canvasWidth * 0.1;
        bottomMargin = canvasHeight * 0.1;
        topMargin = canvasHeight * 0.05;

        // set up y-axis scale
        yMax = Math.max(...data);
        yScale = (canvasHeight - topMargin - bottomMargin) / yMax;


    };

    p.draw = () => {
        p.background(220);
        drawAxes(p, leftMargin, bottomMargin, topMargin, yMax, yScale, canvasWidth, canvasHeight);
        // drawAxes(p);

        let spacing = (canvasWidth - leftMargin) / data.length;

        hoverIndex = -1;

        for (let i = 0; i < data.length; i++) {
            // adding half the spacing to center the point
            let x1 = leftMargin + i * spacing + spacing / 2;
            let y1 = canvasHeight - bottomMargin - data[i] * yScale;

            p.fill(255, 0, 127);
            p.stroke(255, 0, 127);
            p.ellipse(x1, y1, 10, 10);

            // check for hover
            if (p.dist(p.mouseX, p.mouseY, x1, y1) < 10) {
                hoverIndex = i;
            }

            // draw a line to next point
            if (i < data.length - 1) {
                let x2 = leftMargin + (i + 1) * spacing + spacing / 2;
                let y2 = canvasHeight - bottomMargin - data[i + 1] * yScale;
                p.line(x1, y1, x2, y2);
            }
        }

        // draw the tooltip if hovering
        if (hoverIndex !== -1) {
            drawTooltip(p, hoverIndex, data[hoverIndex], leftMargin, bottomMargin, yScale);
        }
    };


    p.windowResized = () => {
        canvasWidth = p.windowWidth * 0.5;
        canvasHeight = p.windowHeight * 0.3;
        leftMargin = canvasWidth * 0.1;
        bottomMargin = canvasHeight * 0.1;
        topMargin = canvasHeight * 0.05;
        yMax = Math.max(...data) + 5 - Math.max(...data) % 5;
        yScale = (canvasHeight - topMargin - bottomMargin) / yMax;
        p.resizeCanvas(canvasWidth, canvasHeight);
    };
};


// BAR CHART
function barChart(p) {
    let canvasWidth, canvasHeight, leftMargin, bottomMargin, topMargin, yMax, yScale;

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.5;
        canvasHeight = p.windowHeight * 0.3;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('barCanvas');
        canvas.style('outline', '10px solid orange');
        canvas.style('border-radius', '15px');

        // set up the margins (helps axes be less squished against the outsides of the canvas, looks much nicer)
        leftMargin = canvasWidth * 0.1;
        bottomMargin = canvasHeight * 0.1;
        topMargin = canvasHeight * 0.05;

        // set up y-axis scale
        yMax = Math.max(...data);
        yScale = (canvasHeight - topMargin - bottomMargin) / yMax;

    };


    p.draw = () => {
        p.background(220);

        let spacing = (canvasWidth - leftMargin) / data.length;
        let barWidth = spacing * 0.8;

        // draw the bars
        for (let i = 0; i < data.length; i++) {
            // add some padding between the bars so it looks nicer
            let x = leftMargin + i * spacing + spacing * 0.1;
            let y = canvasHeight - bottomMargin - data[i] * yScale;
            p.fill(132, 215, 132);
            p.noStroke();
            // draw each bar of the chart
            p.rect(x, y, barWidth, data[i] * yScale);
        }

        // draw the chart's axes (same as line chart)
        drawAxes(p, leftMargin, bottomMargin, topMargin, yMax, yScale, canvasWidth, canvasHeight);

        // display the value for clicked bar
        if (clickedBarIndex != -1) {
            let spacing = (canvasWidth - leftMargin) / data.length;
            let barWidth = spacing * 0.8;
            let x = leftMargin + clickedBarIndex * spacing + spacing * 0.1;
            let y = canvasHeight - bottomMargin - data[clickedBarIndex] * yScale;

            p.fill(0);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(16);
            p.text(data[clickedBarIndex], x + barWidth / 2, y - 10);
        }

        };

        p.windowResized = () => {
            canvasWidth = p.windowWidth * 0.5;
            canvasHeight = p.windowHeight * 0.3;
            leftMargin = canvasWidth * 0.1;
            bottomMargin = canvasHeight * 0.1;
            topMargin = canvasHeight * 0.05;
            yMax = Math.max(...data) + 5 - Math.max(...data) % 5;
            yScale = (canvasHeight - topMargin - bottomMargin) / yMax;
            p.resizeCanvas(canvasWidth, canvasHeight);
        };


        // handling mouse clicks on the bar chart
        p.mouseClicked = () => {
            let spacing = (canvasWidth - leftMargin) / data.length;
            let barWidth = spacing * 0.8;
    
            for (let i = 0; i < data.length; i++) {
                let x = leftMargin + i * spacing + spacing * 0.1;
                let y = canvasHeight - bottomMargin - data[i] * yScale;
                let barHeight = data[i] * yScale;
    
                // is the mouse within the current bar's area?
                if (p.mouseX >= x && p.mouseX <= x + barWidth && p.mouseY >= y && p.mouseY <= y + barHeight) {
                    clickedBarIndex = i;
                    // stop checking after a bar is clicked
                    return;
                }
            }
            // reset the index
            clickedBarIndex = -1;
        };
    };


    // PIE CHART
    function pieChart(p) {
        let canvasWidth, canvasHeight, radius;

        p.setup = () => {
            canvasWidth = p.windowWidth * 0.5;
            canvasHeight = p.windowHeight * 0.3;
            let canvas = p.createCanvas(canvasWidth, canvasHeight);
            // use the premade div #pieCanvas
            canvas.parent('pieCanvas');
            canvas.style('outline', '10px solid darkturquoise');
            canvas.style('border-radius', '15px');
            // radius of the pie (thus how much of its canvas it fills)
            radius = Math.min(canvasWidth, canvasHeight) / 2 * 0.92;
        };

        p.draw = () => {
            // grey canvas background
            p.background(220);
            // pie chart doesn't animate so no need to loop
            p.noLoop();

            let lastAngle = 0;
            let total = data.reduce((acc, val) => acc + val, 0);

            // starting purple and ending green for the gradient
            let startColor = p.color(148, 0, 211);
            let endColor = p.color(0, 128, 0);

            data.forEach((val, i) => {
                let sliceAngle = p.map(val, 0, total, 0, p.TWO_PI);
                let color = p.lerpColor(startColor, endColor, i / (data.length - 1));
                p.fill(color);
                p.noStroke();

                // draw the slice of the pie chart
                p.arc(canvasWidth / 2, canvasHeight / 2, radius * 2, radius * 2, lastAngle, lastAngle + sliceAngle);

                // calculate angle to place the text
                let midAngle = lastAngle + sliceAngle / 2;
                let textRadius = radius * 0.75;
                let textX = canvasWidth / 2 + textRadius * p.cos(midAngle);
                let textY = canvasHeight / 2 + textRadius * p.sin(midAngle);

                p.fill(0);
                p.noStroke();
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(10);

                // draw the text value of the slice (from the dataset)
                p.text(val, textX, textY);

                // update lastAngle to move to the next slice
                lastAngle += sliceAngle

            });
        };

        p.windowResized = () => {
            // update dimensions based on new window size
            canvasWidth = p.windowWidth * 0.5;
            canvasHeight = p.windowHeight * 0.3;
            p.resizeCanvas(canvasWidth, canvasHeight);

            // recalculate the radius based on updated dimensions when the window is resized
            radius = Math.min(canvasWidth, canvasHeight) / 2 * 0.8;
        };
    };


    export { barChart, lineChart, pieChart };