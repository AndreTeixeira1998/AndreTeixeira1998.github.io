var first = true;
var count = 0;

var dots = [];
var projectNo = 0;
var reachCount = 30;


var checkMousePos = true;
var pause = false;

var targets = [];
var totalDots = 12288;

let frameRateRatio = 1;


let startFromLeft = false;
let finishFromLeft = false;
let superSpeed = false;

let imagehref = [];
let projectDescriptions = [];

let scaleAmount = 10;


let projects = [];


let lowPowerMode = false;

function preload() {


    let creatureCreator = {
        image: loadImage("images/creatureCreator.png"),
        href: "CreatureCreator",
        description: ["Creature Creator",
            "Create whatever creature your heart desires and then WATCH IT BURN",
            "They also learn to walk and stuff"]
    };

    let flappyBird = {
        image: loadImage("images/flappyBird.png"),
        href: "FlappyBird",
        description: ["AI Learns To Play Flappy Bird",
            "As a 1 day challenge I coded the game flappy bird and then slapped on some AI to play it",
            "that was not a good day"]
    };

    let worldsHardestGame = {
        image: loadImage("images/worldsHardestGame.png"),
        href: "WorldsHardestGame",
        description: ["AI Learns To Play The Worlds Hardest Game",
            "Some say that this game isn't actually the worlds hardest game. And while that's undeniably true,",
            "it makes for one hell of a clickbaity title"]
    };

    let hillClimbRacing = {
        image: loadImage("images/hillClimbRacing.png"),
        href: "HillClimbRacing",
        description: ["AI Learns To Play Hill Climb Racing",
            "Using my favourite physics engine (box2d) I created the game HillClimbRacing.",
            "Then because that wasn't enough punishment, I used NEAT to teach AIs to play this game."]
    };
    let chess = {
        image: loadImage("images/chess.png"),
        href: "Chess",
        description: ["Chess AI",
            "Using Minimax I created an AI to play Chess, can you beat it?",
            "Probably because its kinda shit."]
    };
    let marbleCalculator = {
        image: loadImage("images/marbleCalculator.png"),
        href: "MarbleCalculator",
        description: ["Creating A Calculator Using Only Marbles",
            "Hey Evan I don't like my calculator, it's way too fast and reliable, can you help me out?",
            "yes"]
    };

    projects.push(creatureCreator, flappyBird, worldsHardestGame, hillClimbRacing, chess, marbleCalculator);

}

let RArrowPositions = [];
let LArrowPositions = [];
let dotNo = 0;

function setup() {
    if (windowHeight < 800) {

        window.canvas = createCanvas(128 * 6, 96 * 6);
        scaleAmount = 6;
    } else if (windowHeight < 1000) {
        window.canvas = createCanvas(128 * 8, 96 * 8);
        scaleAmount = 8;
    } else {
        window.canvas = createCanvas(1280, 960);
    }
    canvas.parent('canvas');
    frameRate(20);
    // pixelDensity(1);


    RArrowPositions = [];
    let x = 128 - 6;
    let y = 96 / 2 - 3;
    // RArrowPositions.push(createVector(x,y));
    RArrowPositions.push(createVector(x + 1, y));
    RArrowPositions.push(createVector(x + 1, y + 1));
    RArrowPositions.push(createVector(x + 2, y + 1));
    RArrowPositions.push(createVector(x + 2, y + 2));
    RArrowPositions.push(createVector(x + 3, y + 2));
    RArrowPositions.push(createVector(x + 3, y + 3));
    RArrowPositions.push(createVector(x + 4, y + 3));
    RArrowPositions.push(createVector(x + 3, y + 4));
    RArrowPositions.push(createVector(x + 2, y + 4));
    RArrowPositions.push(createVector(x + 2, y + 5));
    RArrowPositions.push(createVector(x + 1, y + 5));
    RArrowPositions.push(createVector(x + 1, y + 6));
    // RArrowPositions.push(createVector(x,y+6));

    //fill it in
    // RArrowPositions.push(createVector(x,y+1));
    // RArrowPositions.push(createVector(x,y+2));
    // RArrowPositions.push(createVector(x,y+3));
    // RArrowPositions.push(createVector(x,y+4));
    // RArrowPositions.push(createVector(x,y+5));
    // RArrowPositions.push(createVector(x,y+6));

    RArrowPositions.push(createVector(x + 1, y + 2));
    RArrowPositions.push(createVector(x + 1, y + 3));
    RArrowPositions.push(createVector(x + 2, y + 3));
    RArrowPositions.push(createVector(x + 1, y + 4));


    LArrowPositions = [];
    x = 5;
    y = 96 / 2 - 3;
    // RArrowPositions.push(createVector(x,y));
    LArrowPositions.push(createVector(x - 1, y));
    LArrowPositions.push(createVector(x - 1, y + 1));
    LArrowPositions.push(createVector(x - 2, y + 1));
    LArrowPositions.push(createVector(x - 2, y + 2));
    LArrowPositions.push(createVector(x - 3, y + 2));
    LArrowPositions.push(createVector(x - 3, y + 3));
    LArrowPositions.push(createVector(x - 4, y + 3));
    LArrowPositions.push(createVector(x - 3, y + 4));
    LArrowPositions.push(createVector(x - 2, y + 4));
    LArrowPositions.push(createVector(x - 2, y + 5));
    LArrowPositions.push(createVector(x - 1, y + 5));
    LArrowPositions.push(createVector(x - 1, y + 6));
    // RArrowPositions.push(createVector(x,y+6));

    //fill it in
    // RArrowPositions.push(createVector(x,y+1));
    // RArrowPositions.push(createVector(x,y+2));
    // RArrowPositions.push(createVector(x,y+3));
    // RArrowPositions.push(createVector(x,y+4));
    // RArrowPositions.push(createVector(x,y+5));
    // RArrowPositions.push(createVector(x,y+6));

    LArrowPositions.push(createVector(x - 1, y + 2));
    LArrowPositions.push(createVector(x - 1, y + 3));
    LArrowPositions.push(createVector(x - 2, y + 3));
    LArrowPositions.push(createVector(x - 1, y + 4));

    for (let i = 0; i < totalDots; i++) {
        dots.push(new Dot());
    }
    setTargetsForNextImage();
    window.d = new Date();

}

function nextImage() {
    projectNo++;
    if (projectNo >= projects.length) {
        projectNo = 0;
    }
    setTargetsForNextImage();

}

function previousImage() {
    projectNo--;
    if (projectNo < 0) {
        projectNo = projects.length - 1;
    }
    setTargetsForNextImage();

}

function setTargetsForNextImage() {

    let newImage = projects[projectNo].image;
    newImage.loadPixels();
    let scaleAmount = this.canvas.width / newImage.width;
    this.roundedScale = Math.floor(scaleAmount / 2) * 2;

    let arrowPositions = [...LArrowPositions, ...RArrowPositions];
    targets = [];
    for (var y = 0; y < newImage.height; y++) {
        for (var x = 0; x < newImage.width; x++) {
            var index = (x + y * newImage.width) * 4;
            let r = newImage.pixels[index];
            let g = newImage.pixels[index + 1];
            let b = newImage.pixels[index + 2];


            for (let pos of arrowPositions) {
                if (pos.x === x && pos.y === y) {
                    r = min(r + 1000, 255);
                    g = min(g + 1000, 255);
                    b = min(b + 1000, 255);


                    r = 240;
                    g = 240;
                    b = 240;
                    break;
                }
            }

            targets.push({x: x * scaleAmount, y: y * scaleAmount, r: r, g: g, b: b});


        }
    }

    // if (lowPowerMode) {
    //     for (let i = 0; i < dots.length; i++) {
    //         var tempTarget = targets[i];
    //
    //         dots[i].setTarget(tempTarget.x, tempTarget.y, tempTarget.r, tempTarget.g, tempTarget.b);
    //     }
    // }else{
    for (let dot of dots) {
        var tempTarget = targets.splice(floor(random(targets.length)), 1)[0];
        dot.setTarget(tempTarget.x, tempTarget.y, tempTarget.r, tempTarget.g, tempTarget.b);
    }
    // }
    dots.sort((a, b) => b.target.x - a.target.x);


}

let showing;

let slowFRCount = 0;
let showEveryXInSlowMode = 4;


function draw() {
    var d = new Date();
    let startTime = d.getMilliseconds();
    if (pause)
        return;
    //check if all the dots have reached their goal
    var allReached = true;
    for (var d of dots) {
        if (!d.reached) {
            allReached = false;
        }
    }


    if (allReached) {//if they have then wait a bit mate (dont show anything)
        //drawMesh();
        slowFRCount = 0;

        superSpeed = false;
    } else {//if some dots have yet to reach their destination then show them all


        showing = totalDots;
        if (frameRate() > 0) {

            if (superSpeed) {
                frameRateRatio = 100 / frameRate();
            } else {
                frameRateRatio = 20 / frameRate();

            }
        } else {
            frameRateRatio = 1;
        }

        if (frameRate() < 16 && frameCount > 6) {
            if (slowFRCount < 4) {
                slowFRCount++;
                print("OOP");

            } else {
                showEveryXInSlowMode = Math.min(8, showEveryXInSlowMode + 1);
                lowPowerMode = true;
                slowFRCount = 0;
                print("LOW POWER MODE BABY", `frame Rate ${frameRate()}`, frameCount);
            }
        } else {

        }


        //instead Of Drawing Background draw a rectangle to the max unreached x
        //that way instead of having to redraw the dots just redraw the x
        noStroke();
        fill(20);

        let minMovingX = 0;
        let maxMovingX = 1280;

        minMovingX = getMinMovingX();
        maxMovingX = getMaxMovingX();
        push();
        rectMode(CORNERS);
        if (maxMovingX < minMovingX || (lowPowerMode && dots[0].targetNo > 1)) {

            //draw nothing
        } else {

            rect(minMovingX, 0, maxMovingX + scaleAmount, canvas.height);
        }
        pop();

        drawMesh();

        for (let i = 0; i < dots.length; i++) {
            let dotNo = finishFromLeft ? i : dots.length - 1 - i;


            dots[dotNo].move();
            dots[dotNo].show(minMovingX, maxMovingX);


        }

        stroke(20);
        strokeWeight(2);
        line(canvas.width, 0, canvas.width, canvas.height);

        d = new Date();
        let endTimer = d.getMilliseconds();

        print(endTimer - startTime, showing, frameRate());


    }

    if (allReached && mouseOverFrame()) {

        if (mouseX > canvas.width - 7 * scaleAmount) {
            if (!onRight) {
                background(20);
                for (let d of dots) {
                    d.isShowing = false;

                    d.show(0, 2000);
                }

                noStroke();
                fill(255, 200);
                rect(canvas.width - 7 * scaleAmount, 0, 7 * scaleAmount, canvas.height);
                drawMesh();

                for (let pos of RArrowPositions) {
                    fill(120);
                    noStroke();
                    rect(pos.x * scaleAmount + 1, pos.y * scaleAmount + 1, scaleAmount - 2, scaleAmount - 2);


                }

            }
            onRight = true;
            onLeft = false;
        } else if (mouseX < 7 * scaleAmount) {
            if (!onLeft) {
                background(20);
                for (let d of dots) {
                    d.isShowing = false;
                    d.show(0, 2000);
                }

                noStroke();
                fill(255, 200);
                rect(0, 0, 7 * scaleAmount, canvas.height);
                drawMesh();

                for (let pos of LArrowPositions) {
                    fill(120);
                    noStroke();
                    rect(pos.x * scaleAmount + 1, pos.y * scaleAmount + 1, scaleAmount - 2, scaleAmount - 2);


                }

            }
            onLeft = true;
            onRight = false;
        } else {
            //if the player was just on the left or on the right button
            if (onLeft || onRight || !onScreen) {
                //draw the scene without highlighting the buttons
                background(20);
                for (let d of dots) {
                    d.isShowing = false;

                    d.show(0, 2000);
                }
                //also show the poject information
                showProjectInfo();
                onScreen = true;
            }
            onLeft = false;
            onRight = false;
        }


    } else {
        if (onScreen || onLeft || onRight) {
            //draw the scene without highlighting the buttons
            background(20);
            for (let d of dots) {
                d.isShowing = false;

                d.show(0, 2000);
            }

        }
        onLeft = false;
        onRight = false;
        onScreen = false;
    }


    // stroke(0);
    // strokeWeight(2);
    // fill(255);
    // text(frameRate().toFixed(2), 10, 10);
    // textSize(20);
    // text(showing, 100, 100);


}

let onRight = false;
let onLeft = false;
let onScreen = false;

function dotsAreWaiting() {
    for (let dot of dots) {
        if (dot.waitCount > 0) {
            return true;
        }
    }
    return false;

}


function drawMesh() {
    stroke(20);
    strokeWeight(2);
    for (let i = 0; i <= canvas.width; i += scaleAmount) {
        line(i, 0, i, canvas.height);
    }
    for (let i = 0; i <= canvas.height; i += scaleAmount) {
        line(0, i, canvas.width, i);
    }
}

function getMaxMovingX() {


    let maxX = 0;

    for (let dot of dots) {
        if (!dot.reached && dot.waitCount <= 0 && maxX < dot.pos.x) {
            maxX = dot.pos.x;
        }
    }

    return maxX + scaleAmount;

}

function getMinMovingX() {

    let minX = 100000;

    for (let dot of dots) {
        if (!dot.reached && dot.waitCount <= 0 && minX > dot.pos.x) {
            minX = dot.pos.x;
        }
    }

    return minX - scaleAmount;

}


function mouseOverFrame() {
    return mouseX > 0 && mouseY > 0 && mouseY < canvas.height && mouseX < canvas.width;

}


function mousePressed() {
    if (mouseOverFrame()) {

        if (mouseX > canvas.width - 7 * scaleAmount) {
            moveRight();
            return;
        }

        if (mouseX < 7 * scaleAmount) {

            moveLeft();
            return;
        }

        var allReached = true;
        for (var d of dots) {
            if (!d.reached) {
                allReached = false;
            }
        }
        if (!allReached) {
            superSpeed = true;
            return;
        }
        window.location.href = projects[projectNo].href;
    }


}

function moveLeft() {
    var allReached = true;
    for (var d of dots) {
        if (!d.reached) {
            allReached = false;
        }
    }
    if (!allReached) {
        superSpeed = true;
        return;
    }

    startFromLeft = true;
    finishFromLeft = true;
    previousImage();
}

function moveRight() {
    var allReached = true;
    for (var d of dots) {
        if (!d.reached) {
            allReached = false;
        }
    }
    if (!allReached) {
        superSpeed = true;
        return;
    }

    startFromLeft = false;
    finishFromLeft = false;
    nextImage();
}


function showProjectInfo() {
    fill(255, 220);
    let topOfRect = canvas.height * 5 / 6;

    rect(0, topOfRect, canvas.width, canvas.height);

    noStroke();
    fill(20);
    stroke(20);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    // scaleAmount === 10 ? textSize(50) : textSize(40);
    textSize(map(scaleAmount, 10, 8, 50, 40));

    text(projects[projectNo].description[0], canvas.width / 2, topOfRect + scaleAmount * 4);

    textSize(25);
    textSize(map(scaleAmount, 10, 8, 25, 18));
    // scaleAmount === 10 ? textSize(25) : textSize(18);
    if (scaleAmount == 6) {
        textSize(15);
    }
    for (let i = 1; i < projects[projectNo].description.length; i++) {
        text(projects[projectNo].description[i], canvas.width / 2, topOfRect + scaleAmount * (5 + 4 * i));
    }


}