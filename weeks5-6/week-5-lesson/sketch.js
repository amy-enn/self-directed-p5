// i might include this viz in my final dashboard, it turned out fabulous

function mySketch(p) {
    let canvasWidth, canvasHeight;
    let portsData = [];

    // bounds around ns for mapping coordinates to canvas system
    let minLat = 43.0; // southernmost point (rounded)
    let maxLat = 47.0; // northernmost point
    let minLong = -66.3; // westernmost point
    let maxLong = -59.8; // easternmost point

    // convert latitude and longitude to canvas x and y
    function latLongToCanvas(lat, long, canvasWidth, canvasHeight) {
        let x = p.map(long, minLong, maxLong, 0, canvasWidth);
        // reverse since canvas 0,0 is top-left
        let y = p.map(lat, minLat, maxLat, canvasHeight, 0);
        return { x, y };
    }


    function getStrokeWeightForTidalRange(tidalRange) {
        // my dataset is between 0-10 meters range in tides
        // bw 1-5 px stroke weight
        return p.map(tidalRange, 0, 10, 1, 5);
    }

    function getFillColorForChannelDepth(depth) {
        if (depth <= 5) {
            // shallow light blue
            return p.color(173, 216, 230);
        } else if (depth <= 10) {
            // medium cornflower blue
            return p.color(100, 149, 237);
        } else if (depth <= 15) {
             // blue for moderate
            return p.color(0, 0, 255);
        } else if (depth <= 20) {
            // dark blue for deep
            return p.color(0, 0, 139); 
        } else {
            // midnight blue for very deep
            return p.color(25, 25, 112); 
        }
    }

    function drawLegend() {
        let legendX = 20;
        let legendY = 20;
        // room between legend items
        let spacing = 20;
        let legendWidth = 200;
        let legendHeight = 230;

        // legend background
        p.noStroke();
        p.fill(255, 255, 255, 200);
        p.rect(legendX - 10, legendY - 15, legendWidth, legendHeight, 10);

        // title
        p.fill(0);
        p.textSize(16);
        p.text('Legend', legendX, legendY);
        legendY += spacing + 5;

        // harbour size
        p.textSize(12);
        p.text('Circle Size = Harbor Size', legendX, legendY);
        legendY += spacing;

        // tidal range
        p.text('Stroke Weight = Tidal Range', legendX, legendY);
        legendY += spacing + 10;

        // channel depth
        p.text('Channel Depth:', legendX, legendY);
        legendY += spacing - 5;

        let depthLabels = ["<= 5m", "<= 10m", "<= 15m", "<= 20m", "> 20m"];
        let depths = [5, 10, 15, 20, 25];
        depthLabels.forEach((label, index) => {
            legendY += spacing;
            // figure out waht color
            p.fill(getFillColorForChannelDepth(depths[index]));
            // color box
            p.rect(legendX + 5, legendY, 15, 15);
            p.fill(0);
            // depth label
            p.text(label, legendX + 25, legendY + 12);
        });
    }






    p.preload = () => {
        // load JSON data and assign it to portsData once loaded
        p.loadJSON('/nova_scotia_ports.json', function (data) {
            // fingers crossed it returns as an array this time lol
            portsData = data;
            // console.log(portsData.length);
        });
    };

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDiv');
        canvas.style('outline', '10px solid lightpink');
        canvas.style('border-radius', '15px');
        p.noLoop();
    };

    p.draw = () => {
        p.background(135, 206, 250);

        if (Array.isArray(portsData)) {

            // iterate through the loaded port data and draw each port
            for (let port of portsData) {

                // circle size based on harbor size
                let size = mapHarborSizeToSize(port["Harbor Size"]);

                // stroke weight based on tidal range
                p.strokeWeight(getStrokeWeightForTidalRange(port["Tidal Range (m)"]));

                // fill color based on channel depth
                p.fill(getFillColorForChannelDepth(port["Channel Depth (m)"]));

                // pos on canvas based on lat/long
                let { x, y } = latLongToCanvas(port.Latitude, port.Longitude, canvasWidth, canvasHeight);

                p.ellipse(x, y, size, size);
            }

            drawLegend();

        } else {
            console.log('data is not loaded or not correct format:', portsData)
        };

    }

    p.windowResized = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        p.resizeCanvas(canvasWidth, canvasHeight);
    };

    // mapping harbor size to visual size
    function mapHarborSizeToSize(harborSize) {
        let size;
        switch (harborSize) {
            case "Very Small":
                size = 10;
                break;
            case "Small":
                size = 20;
                break;
            case "Medium":
                size = 30;
                break;
            case "Large":
                size = 40;
                break;
            case "Extra Large":
                size = 50;
                break;
            default:
                // default size for unknown sizes if i missed a value, etc
                // this way they'll actually show up on the map
                size = 15;
        }
        return size;
    }

}

export { mySketch };
