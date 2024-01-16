import p5 from 'p5';

export default function sketch(p, appState) {

    // p5's setup function - creates the canvas and preps the page for the sketch
    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
        canvas.parent('canvas-container');
    };

    // p5's draw function... add white background to the canvas
    p.draw = () => {
        p.background(255);

        drawSky();
        drawEarth();

        // draw the canvas according to app state - this is always rerendering so as the state variables fill they will all be rendered over again so the drawing is always complete
        if (appState.sunPosition) {
            drawSun(appState.sunPosition.x, appState.sunPosition.y);
        }

        if (appState.oakTreePosition) {
            drawOakTree(appState.oakTreePosition.x, appState.oakTreePosition.y);
        }

        if (appState.pineTreePosition) {
            drawPineTree(appState.pineTreePosition.x, appState.pineTreePosition.y);
        }

        if (appState.cloudPosition) {
            drawCloud(appState.cloudPosition.x, appState.cloudPosition.y);
        }

        if (appState.butterflyPosition) {
            drawButterfly(appState.butterflyPosition.x, appState.butterflyPosition.y);
        }
    };

    // download function to save the user's artwork
    p.downloadCanvas = () => {
        p.saveCanvas('myLandscape', 'png');
    };

    appState.pInstance = p;
    

    // shape drawing functions
    // bright yellow circle
    function drawSun(x, y) {
        p.fill(255, 204, 0);
        p.noStroke();
        p.ellipse(x, y, 200, 200);
    }

    // brown rectangle trunk with green foliage circle
    function drawOakTree(x, y) {
        const trunkWidth = 40;
        const trunkHeight = 100;
        const leavesDiameter = 170;

        // tree trunk brown rectangle
        p.fill(139, 69, 19);
        p.rect(x - trunkWidth / 2, y, trunkWidth, trunkHeight);

        // green circle
        p.fill(0, 128, 0);
        p.noStroke();
        p.ellipse(x, y - trunkHeight / 2, leavesDiameter, leavesDiameter);
    }

    // brown rectangle trunk with green foliage triangle
    function drawPineTree(x, y) {
        const trunkWidth = 40;
        const trunkHeight = 100;
        const treeHeight = 170;

        // tree trunk brown rectangle
        p.fill(139, 69, 19);
        p.rect(x - trunkWidth / 2, y, trunkWidth, trunkHeight);

        // green triangle
        p.fill(34, 139, 34);
        p.noStroke();
        p.triangle(x, y - treeHeight, x-100, y, x + 100, y);
    }

    // light grey ellipse
    function drawCloud(x, y) {
        // off-white ellipse placeholder
        p.fill(240);
        p.noStroke();
        p.ellipse(x, y, 400, 100);
    }

    // blue top of canvas
    function drawSky() {
        let skyCol;
        switch (appState.skyColor) {
            case 'light':
                skyCol = '#ADD8E6';
                break;
            case 'dark':
                skyCol = '#00508B';
                break;
            default:
                return;
        }
        p.fill(skyCol);
        p.noStroke();
        p.rect(0, 0, p.width, p.height * 0.67);
    }

    // green (grass) or brown (dirt) bottom of canvas
    function drawEarth() {
        let earthCol;
        switch (appState.earthColor) {
            case 'dirt':
                earthCol = '#556B2F';
                break;
            case 'grass':
                earthCol = '#2B1700';
                break;
            default:
                return;
        }
        p.fill(earthCol);
        p.noStroke();
        p.rect(0, p.height * 0.67, p.width, p.height / 2);
    }


    // two semi-circles ("arcs") with a pink fill look like wings
    function drawButterfly(x, y) {
        p.fill(255, 182, 193);
        p.noStroke();
    
        // left wing using the p5 arc creator
        p.arc(x - 10, y, 20, 20, -p.HALF_PI, p.HALF_PI);
    
        // right wing using the p5 arc creator
        p.arc(x + 10, y, 20, 20, p.HALF_PI, -p.HALF_PI);
    }
    

    // keep shape clicks within bounds of the canvas
    function isMouseInCanvas() {
        return p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;
    }

    // clicking the canvas
    p.mouseClicked = () => {
        if (!isMouseInCanvas()) {
            return;
        }
    
        if (appState.selectedShape === 'sun') {
            appState.sunPosition = { x: p.mouseX, y: p.mouseY };
        } else if (appState.selectedShape === 'oakTree') {
            appState.oakTreePosition = { x: p.mouseX, y: p.mouseY };
        } else if (appState.selectedShape === "cloud") {
            appState.cloudPosition = { x: p.mouseX, y: p.mouseY };
        } else if (appState.selectedShape === "pineTree") {
            appState.pineTreePosition = { x: p.mouseX, y: p.mouseY };
        } else if (appState.selectedShape === "butterfly") {
            appState.butterflyPosition = { x: p.mouseX, y: p.mouseY };
        }
    };
    

    // resizing for responsiveness
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
    };
}
