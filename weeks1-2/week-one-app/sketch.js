export default function sketch(p, appState) {

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
        canvas.parent('canvas-container');
    };

    p.draw = () => {
        p.background(255);

        drawSky();
        drawEarth();

        if (appState.sunPosition) {
            drawSun(appState.sunPosition.x, appState.sunPosition.y);
        }

        if (appState.treePosition) {
            drawTree(appState.treePosition.x, appState.treePosition.y);
        }

        if (appState.cloudPosition) {
            drawCloud(appState.cloudPosition.x, appState.cloudPosition.y);
        }

    };

    // shape drawing functions
    function drawSun(x, y) {
        // bright yellow circle
        p.fill(255, 204, 0);
        p.noStroke();
        p.ellipse(x, y, 100, 100);
    }

    function drawTree(x, y) {
        const trunkWidth = 20;
        const trunkHeight = 50;
        const leavesDiameter = 100;

        // tree trunk brown rectangle
        p.fill(139, 69, 19);
        p.rect(x - trunkWidth / 2, y, trunkWidth, trunkHeight);

        // green circle
        p.fill(0, 128, 0);
        p.noStroke();
        p.ellipse(x, y - trunkHeight / 2, leavesDiameter, leavesDiameter);
    }

    function drawCloud(x, y) {
        // off-white ellipse placeholder
        p.fill(240);
        p.noStroke();
        p.ellipse(x, y, 300, 70);
    }

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
        p.rect(0, 0, p.width, p.height / 2);
    }

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
        p.rect(0, p.height / 2, p.width, p.height / 2);
    }


    // ... rest of the shape fx (pond?  another tree type with triangle?)

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
        } else if (appState.selectedShape === 'tree') {
            appState.treePosition = { x: p.mouseX, y: p.mouseY };
        } else if (appState.selectedShape === "cloud") {
            appState.cloudPosition = { x: p.mouseX, y: p.mouseY };
        }
        // ... other shapes
    };

    // resizing for responsiveness
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.75, p.windowHeight * 0.75);
    };
}
