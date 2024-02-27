let pens = [];
let penSize = 10;
let fadeDuration = 2;
let numberOfPens = 20;

// create the canvas and the pens
function setup() {
    createCanvas(600, 600);
    frameRate(10);
    for (let i = 0; i < numberOfPens; i++) {
        pens.push(new Pen(random(width), random(height), penSize));
    }
}

function draw() {
    background(0);

    for (let i = 0; i < pens.length; i++) {
        for (let j = i + 1; j < pens.length; j++) {
            if (haveCollided(pens[i], pens[j])) {
                pens[i].reverseDirection();
                pens[j].reverseDirection();
            }
        }
    }

    // update and display all pens
    pens.forEach(pen => {
        pen.update();
        pen.display();
    });
}

function haveCollided(pen1, pen2) {
    let distanceApart = dist(pen1.x, pen1.y, pen2.x, pen2.y);
    return distanceApart <= penSize;
}

class Pen {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.path = [];
        this.direction = random(['left', 'right', 'up', 'down']);
        this.lastDirection = this.direction;
    }

    update() {
        // check and change direction if at or nearing the canvas boundary
        if (this.isAtBoundary() || random(1) < 0.25) {
            this.changeDirection();
        }

        // move the pen in the current direction
        switch (this.direction) {
            case 'left': this.x = max(this.x - this.size, 1); break;
            case 'right': this.x = min(this.x + this.size, width - this.size - 1); break;
            case 'up': this.y = max(this.y - this.size, 1); break;
            case 'down': this.y = min(this.y + this.size, height - this.size - 1); break;
        }

        // add current position to the path and handle fading
        this.path.push({ x: this.x, y: this.y, opacity: 255 });
        for (let i = this.path.length - 1; i >= 0; i--) {
            this.path[i].opacity -= 255 / (fadeDuration * frameRate());
            if (this.path[i].opacity <= 0) {
                this.path.splice(i, 1);
            }
        }
    }
    isAtBoundary() {
        // adjust the boundary values based on the canvas size and pen size
        const maxX = width - this.size - 1;
        const maxY = height - this.size - 1;
        return this.x <= 1 || this.x >= maxX || this.y <= 1 || this.y >= maxY;
    }

    display() {
        // display the gradient in the path of the pen with fading effect
        for (let p of this.path) {
            let inter = map(p.y, 0, height, 0, 1);
            let c = lerpColor(color(255, 0, 0), color(0, 0, 255), inter);
            fill(c.levels[0], c.levels[1], c.levels[2], p.opacity);
            noStroke();
            square(p.x, p.y, this.size);
            // ellipse(p.x, p.y, this.size, this.size);
        }
    }


    changeDirection() {
        let possibleDirections = ['left', 'right', 'up', 'down'];

        // exclude the opposite direction to prevent retracing
        if (this.direction === 'left') possibleDirections = possibleDirections.filter(dir => dir !== 'right');
        else if (this.direction === 'right') possibleDirections = possibleDirections.filter(dir => dir !== 'left');
        else if (this.direction === 'up') possibleDirections = possibleDirections.filter(dir => dir !== 'down');
        else if (this.direction === 'down') possibleDirections = possibleDirections.filter(dir => dir !== 'up');

        // randomly select a new direction from the remaining options
        this.direction = random(possibleDirections);
    }

    reverseDirection() {
        switch (this.direction) {
            case 'left': this.direction = 'right'; break;
            case 'right': this.direction = 'left'; break;
            case 'up': this.direction = 'down'; break;
            case 'down': this.direction = 'up'; break;
        }
    }
}