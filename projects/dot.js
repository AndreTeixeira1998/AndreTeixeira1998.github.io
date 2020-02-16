class Dot {
    constructor() {
        this.visible = true;
        this.opacity = 255;
        this.pos = createVector(random(canvas.width), random(canvas.height));


        this.target;
        this.vel = createVector();

        this.reached = false;
        this.r = 20;
        this.g = 20;


        this.b = 20;
        this.targetSet = false;
        this.targetR = 0;
        this.targetG = 0;

        this.targetB = 0;


        this.colorVel = {r: 0, g: 0, b: 0};
        this.speed = random(0.02, 0.025);

        this.expectedTime = Math.ceil(1 / this.speed);
        this.moveTimer = 0;

        this.waitCount = 0;
        this.justReached = false;


        this.animationCounter = 10;

        this.isShowing = false;

        this.targetNo = 0;

        this.startingPos = createVector();
    }

    setTarget(targetX, targetY, targetR, targetG, targetB, firstTarget) {
        this.startingPos.x = this.pos.x;
        this.startingPos.y = this.pos.y;
        this.targetNo++;

        if (!lowPowerMode) {
            if (targetX % (2 * scaleAmount) === 0)
                this.visible = true;
            else
                this.visible = false;

            if (finishFromLeft) {
                this.speed = map(targetX, 0, canvas.width, 0.02, 0.015);
            } else {
                this.speed = map(targetX, 0, canvas.width, 0.015, 0.02);
            }


        } else {
            //
            // if (targetX % (showEveryXInSlowMode * scaleAmount) === 0)
            //     this.visible = true;
            // else
            //     this.visible = false;

            this.visible = false;

            if (finishFromLeft) {
                this.speed = map(targetX, 0, canvas.width, 0.05, 0.02);
            } else {
                this.speed = map(targetX, 0, canvas.width, 0.02, 0.05);
            }


        }


        // this.speed = 0.03;
        this.expectedTime = 1 / this.speed;


        if (startFromLeft)
            this.waitCount = map(this.pos.x, 0, canvas.width, 0, 15);
        else
            this.waitCount = map(this.pos.x, 0, canvas.width, 15, 0);


        //if this is the first target
        if (!this.target) {
            this.waitCount = 0;
        }

        this.target = createVector(targetX, targetY);
        this.targetR = targetR;
        this.targetG = targetG;
        this.targetB = targetB;

        this.expectedTime -= this.waitCount;
        this.speed = 1 / this.expectedTime;
        if (lowPowerMode)
            this.waitCount += Math.floor(randomNormalDistribution() * 3);
        else
            this.waitCount += Math.floor(random(3));
        // }else{
        // }


        this.vel = createVector();
        this.vel.x = this.target.x - this.pos.x;
        this.vel.y = this.target.y - this.pos.y;
        this.vel.mult(this.speed);//takes 100 frames to get to destination

        //set color vel
        this.colorVel.r = (this.targetR - this.r) * this.speed;
        this.colorVel.g = (this.targetG - this.g) * this.speed;
        this.colorVel.b = (this.targetB - this.b) * this.speed;


        // }else{
        //     this.pos.x = targetX;
        //     this.pos.y = targetY;
        //     if (startFromLeft)
        //         this.waitCount = map(this.pos.x, 0, canvas.width, 0, 64);
        //     else
        //         this.waitCount = map(this.pos.x, 0, canvas.width, 64, 0);
        //
        //
        //     // this.waitCount += Math.floor(random(5));
        //     this.maxAnimationCounter = 1;
        //     this.animationCounter =0;
        //
        //
        //     this.colorVel.r = (this.targetR - this.r) * (1/this.maxAnimationCounter);
        //     this.colorVel.g = (this.targetG - this.g) * (1/this.maxAnimationCounter);
        //     this.colorVel.b = (this.targetB - this.b) * (1/this.maxAnimationCounter);
        //
        //
        // }

        //reset variables
        this.reached = false;
        this.moveTimer = 0;
        this.animationCounter = 0;


        // this.waitCount=0;
    }


    moveInLowPowerMode() {
        if (!this.reached) {
            this.waitCount -= frameRateRatio;
            if (this.waitCount > 0) {
                return;
            }

            this.animationCounter += frameRateRatio;
            this.r += this.colorVel.r * frameRateRatio;
            this.g += this.colorVel.g * frameRateRatio;
            this.b += this.colorVel.b * frameRateRatio;
            if (this.maxAnimationCounter < this.animationCounter) {
                this.reached = true;
                this.justReached = true;
                this.r = this.targetR;
                this.g = this.targetG;
                this.b = this.targetB;
            }

        }
    }


    move() {
        // if (lowPowerMode) {
        //     this.moveInLowPowerMode();
        //     return;
        // }
        if (!this.reached) {
            this.waitCount -= frameRateRatio;
            if (this.waitCount > 0) {
                return;
            }
            this.moveTimer += frameRateRatio;
            this.pos.x += this.vel.x * frameRateRatio;
            this.pos.y += this.vel.y * frameRateRatio;


            this.r += this.colorVel.r * frameRateRatio;
            this.g += this.colorVel.g * frameRateRatio;
            this.b += this.colorVel.b * frameRateRatio;


            if (this.moveTimer >= this.expectedTime) {
                this.reached = true;
                this.justReached = true;
                this.pos = this.target.copy();
                this.r = this.targetR;
                this.g = this.targetG;
                this.b = this.targetB;
            }
        }
    }

    showInLowPowerMode(min, max) {


        //if the dot is currently showing and the dot is not waiting or reached its destination then draw a box to remove it
        if (this.isShowing && (this.justReached||!this.reached) && this.waitCount < 0) {
            this.isShowing = false;
            //erase the dot
            fill(20);
            noStroke();
            rect(this.startingPos.x + 1, this.startingPos.y + 1, scaleAmount - 2, scaleAmount - 2);
            // return;
        }

        //if the dot isnt currently showing but it should be then draw it
        if (!this.isShowing && (this.reached || this.waitCount > 0)) {

            this.isShowing = true;

            //draw the dot
            fill(this.r, this.g, this.b);
            noStroke();


            rect(this.pos.x + 1, this.pos.y + 1, roundedScale - 2, roundedScale - 2);

            // return;
        }
        this.justReached = false;

    }


    show(min, max) {
        if (lowPowerMode && this.targetNo > 1) {
            this.showInLowPowerMode(min, max);
            return;
        }

        //if this dots X position is greater that the max unreachable x then dont draw it because its not going to be erased.
        if (!this.justReached && (this.reached || this.waitCount > 0) && (this.pos.x > max + scaleAmount || this.pos.x < min - scaleAmount)) {
            showing--;
            return;
        }
        this.justReached = false;
        noStroke();
        if (this.reached || this.waitCount >= 0 || this.visible) {
            fill(this.r, this.g, this.b);
            // if (lowPowerMode && !this.reached && this.waitCount < -10 && this.expectedTime > this.moveTimer + 5) {
            //     rect(this.pos.x, this.pos.y, roundedScale, roundedScale);
            // } else {
            rect(this.pos.x + 1, this.pos.y + 1, roundedScale - 2, roundedScale - 2);
            // }

        } else if (this.expectedTime < this.moveTimer + 2) {
            let opacity = map(this.expectedTime - this.moveTimer, 0, 3, 255, 0);
            fill(this.r, this.g, this.b);

            rect(this.pos.x + 1, this.pos.y + 1, roundedScale - 2, roundedScale - 2);

        } else {
            showing--;
        }


    }


    clone() {
        var clone = new Dot(this.target.x, this.target.y);
        return clone;
    }


}

function

randomNormalDistribution() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    if (lowPowerMode)
        return 1.5 + constrain(Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v), -1.5, 1.5);
    else
        return 1 + constrain(Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v), -1, 1);

}