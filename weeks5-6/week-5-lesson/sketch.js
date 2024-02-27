function mySketch(p) {
    let canvasWidth, canvasHeight;
    let portsData = [];

    p.preload = () => {
        portsData = p.loadJSON('/nova_scotia_ports.json');
    };

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDiv');
        canvas.style('outline', '10px solid lime');
        canvas.style('border-radius', '15px');
        p.noLoop();
    };

    p.draw = () => {
        p.background(150);

        // iterate through the loaded port data and draw each port
        for (let port of portsData) {
            // visualization... map harbor size to ellipse size?
            let size = mapHarborSizeToSize(port.harborSize);
            let fillColor = p.color(100, 100, 250);
            p.fill(fillColor);

            p.ellipse(port.Latitude, port.Longitude, size, size);
        }
    };

    p.windowResized = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        p.resizeCanvas(canvasWidth, canvasHeight);
    };

    // mapping harbor size to visual size
    function mapHarborSizeToSize(harborSize) {
        // logic
        return 50;
    }
}

    export { mySketch };
