
export default function sketch(p) {

    let particles = [];
    let rockY, rockHeight;
    let pulseAngle = 0;

    // set up the canvas
    p.setup = function () {
        p.createCanvas(p.windowWidth * .75, p.windowWidth * .75);
        // create the particles
        for (let i = 0; i < 120; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            particles.push(new Particle(x, y));
        }
    };

    // create the sketch pieces
    p.draw = function () {
        p.background(220);

        pulseAngle += 0.015;

        // sky
        p.fill(135, 206, 235);
        p.noStroke();
        p.rect(0, 0, p.width, p.height * 2 / 3);

        // sea
        p.fill(0, 105, 148);
        p.noStroke();
        p.rect(0, p.height * 2 / 3, p.width, p.height / 3);

        // lighthouse
        drawLighthouse();

        // display particles for fog
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].isFinished()) {
                particles.splice(i, 1);
            }
        }
    }

    // particle class for the fog
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.originX = x;
            this.originY = y;
            this.size = p.random(200, 300);
            this.alpha = p.random(20, 80);
            this.angle = p.random(p.TWO_PI);
            this.rotationSpeed = p.random(0.01, 0.01);
            this.radius = p.random(5, 20);
             // 1 for clockwise, -1 for counterclockwise
            this.direction = p.random([1, -1]);
        }

        update() {
            this.angle += this.rotationSpeed * this.direction;
            this.x = this.originX + p.cos(this.angle) * this.radius;
            this.y = this.originY + p.sin(this.angle) * this.radius;
        }

        display() {
            p.noStroke();
            p.fill(255, 255, 255, this.alpha);
            let ellipseWidth = this.size;
            let ellipseHeight = this.size * 0.6;
            p.ellipse(this.x, this.y, ellipseWidth, ellipseHeight);
        }

        isFinished() {
            return this.alpha < 0;
        }
    }



    function drawLighthouse() {
        // width and position of the lighthouse tower
        let towerWidthTop = p.width * 0.1;
        // flare the base
        let towerWidthBottom = towerWidthTop * 1.3;
        let towerHeight = p.height * 0.3;
        // the rock is wider than the base of the tower
        let rockWidth = towerWidthBottom * 2;
        rockHeight = rockWidth / 2.2;
        // center the rock under the tower
        let rockX = (p.width * 0.33) - (rockWidth / 1.8);
        rockY = p.height * 0.7;

        // position of the lighthouse tower
        let towerX = p.width * 0.33 - towerWidthTop / 2;
        // place the tower on top of the rock but partway down
        let towerY = rockY - rockHeight - towerHeight + p.height * 0.05;

        // rock
        p.fill(100);
        p.arc(rockX + rockWidth / 2, rockY, rockWidth, rockHeight * 2, p.PI, 0);


        // lighthouse tower
        p.fill(255);
        p.beginShape();
        // top left
        p.vertex(towerX, towerY);
        // top right
        p.vertex(towerX + towerWidthTop, towerY);
        // bottom right
        p.vertex(towerX + towerWidthTop / 2 + towerWidthBottom / 2, towerY + towerHeight);
        // bottom left
        p.vertex(towerX + towerWidthTop / 2 - towerWidthBottom / 2, towerY + towerHeight);
        p.endShape(p.CLOSE);

        // gallery deck position - on top of the tower
        let galleryWidth = towerWidthTop * 1.2;
        let galleryHeight = towerHeight * 0.05;
        let galleryX = towerX + (towerWidthTop / 2) - (galleryWidth / 2);
        let galleryY = towerY - galleryHeight;

        // gallery deck
        p.fill(150);
        p.rect(galleryX, galleryY, galleryWidth, galleryHeight);

        // lantern room position
        let topWidth = galleryWidth * 0.6;
        let topHeight = towerHeight * 0.1;
        let topX = galleryX + (galleryWidth - topWidth) / 2;
        let topY = galleryY - topHeight;

        // lantern room
        p.fill(180);
        p.rect(topX, topY, topWidth, topHeight);

        // roof position
        let roofWidth = topWidth * 1.5;
        let roofHeight = topHeight * 1.3;
        let roofX = topX + (topWidth - roofWidth) / 2;
        let roofY = topY;

        // roof
        p.fill(100);
        p.triangle(
            roofX, roofY,
            roofX + roofWidth, roofY,
            roofX + roofWidth / 2, roofY - roofHeight
        );

        // tower stripes
        p.fill(255, 0, 0);
        let numStripes = 4;
        for (let i = 0; i < numStripes; i++) {
            let stripeYTop = towerY + (2 * i) * (towerHeight / (2 * numStripes));
            let stripeYBottom = stripeYTop + towerHeight / (2 * numStripes);

            let stripeWidthTop = p.lerp(towerWidthTop, towerWidthBottom, (i / numStripes));
            let stripeWidthBottom = p.lerp(towerWidthTop, towerWidthBottom, ((i + 1) / numStripes));

            let stripeXTop = towerX + (towerWidthTop - stripeWidthTop) / 2;
            let stripeXBottom = towerX + (towerWidthTop - stripeWidthBottom) / 2;

            // draw the stripe using a quad so the base can be flared
            p.quad(
                // top left
                stripeXTop, stripeYTop,
                // top right
                stripeXTop + stripeWidthTop, stripeYTop,
                // bottom right
                stripeXBottom + stripeWidthBottom, stripeYBottom,
                // bottom left of stripe
                stripeXBottom, stripeYBottom
            );
        }

        // lantern position
        let lightCircleRadius = topWidth * 0.25;
        let lightCircleX = topX + topWidth / 2;
        let lightCircleY = topY + topHeight / 2;

        // lantern
        p.fill(255, 255, 0);
        p.ellipse(lightCircleX, lightCircleY, lightCircleRadius, lightCircleRadius);

        // door position
        let doorWidth = towerWidthBottom * 0.2;
        let doorHeight = towerHeight * 0.15;
        let doorX = towerX + towerWidthBottom / 2 - doorWidth / 2;
        let doorY = towerY + towerHeight - doorHeight;

        // door
        p.fill(139, 69, 19);
        p.rect(doorX, doorY, doorWidth, doorHeight);

        // lantern light beam
        let lightX = topX + topWidth / 2;
        let lightY = topY + topHeight / 2;

        // pulsing size and opacity
        // size and range of the pulsing circle
        let pulseSize = p.sin(pulseAngle) * 10 + 40;
        // opacity must be between 0 and 255
        let pulseOpacity = p.sin(pulseAngle) * 128 + 90;

        // pulsing light
        p.fill(255, 255, 0, pulseOpacity);
        p.ellipse(lightX, lightY, pulseSize, pulseSize);


    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth * .75, p.windowWidth * .75);
    };
}
