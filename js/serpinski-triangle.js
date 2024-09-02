let w = innerWidth - 60;
let h = innerHeight - 60;
let angle = 0;
const iterCount = 100;

let radius = w <= h ? w / 2 - 20 : h / 2 - 20;
const steps = 3;
let anchors = [];
let currentPoint;
let step;

function setup() {
    createCanvas(w, h);

    translate(w / 2, h / 2);
    // circle(0, 0, radius);

    step = TWO_PI / steps;
    let angle = -HALF_PI;
    for (let i = 0; i < steps; i++) {
        let x = radius * cos(angle);
        let y = radius * sin(angle);
        anchors[i] = createVector(x, y);

        // stroke('red');
        // strokeWeight(10);
        // point(x, y);

        // strokeWeight(1);
        // stroke(0, 0, 0);

        angle += step;
    }
    stroke(205, 214, 244);

    let x = random(-radius, radius);
    let y = random(-radius, radius);
    currentPoint = createVector(x, y);
    point(x, y);
}

function draw() {
    translate(w / 2, h / 2);

    // Runs the code iterCount times per draw loop
    for (let j = 0; j < iterCount; j++) {
        // Slowly erases old points
        // background(255, 255, 255, 1);

        // Let's anchors stay on screen if erasing
        // for (let i of anchors) {
        //     stroke('red');
        //     strokeWeight(10);
        //     point(i.x, i.y);

        //     strokeWeight(5);
        //     stroke(0, 0, 0);
        // }

        let nextAnchor = random(anchors);

        let nextX = (currentPoint.x + nextAnchor.x) / 2;
        let nextY = (currentPoint.y + nextAnchor.y) / 2;

        let nextPoint = createVector(nextX, nextY);
        currentPoint = nextPoint;
        point(nextX, nextY);
    }
}

function windowResized() {
    w = windowWidth - 60;
    h = windowHeight - 60;
    radius = w <= h ? w / 2 - 20 : h / 2 - 20;

    angle = -HALF_PI;

    // anchors.splice(0, anchors.length);

    for (let i = 0; i < steps; i++) {
        let x = radius * cos(angle);
        let y = radius * sin(angle);
        anchors[i] = createVector(x, y);

        console.log(anchors);

        stroke('red');
        strokeWeight(10);
        point(x, y);

        strokeWeight(1);
        stroke(205, 214, 244);

        angle += step;
    }

    resizeCanvas(w, h);
}
