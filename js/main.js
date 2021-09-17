// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// canvas width and height set to window width/height
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random (min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// create Shape
function Shape (x, y, velX, velY, exists) {
    // horizontal and vertical coordinates
    this.x = x;
    this.y = y;
    // horizontal and vertical velocity, exists property
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    // call methods from Shape
    Shape.call(this, x, y, velX, velY, exists);
    // size and color
        this.color = color;
        this.size = size;
    }
    // create ball from shape
    Ball.prototype = Object.create(Shape.prototype);
    Ball.prototype.constructor = Ball;

// draw ball on screen
Ball.prototype.draw = function () {
    // state that we want to draw a shape on canvas
    ctx.beginPath();
    // define color we want shape to be
    ctx.fillStyle = this.color;
    // trace an arc shape on canvas with x & y as arc center, radius of arc = ball size, 
    //last 2 parameters are start and end of degrees around circle the arc is drawn between (2 * PI = 360 degrees)
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // finish drawing path started with beginPath(), fill with color from fillStyle
    ctx.fill();
}

// move the ball
Ball.prototype.update = function () {
    
    // //if y coordinate is greater than canvas height (off bottom edge)
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    // // if y coordinate is less than 0 (off top edge)
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    // move ball to left side of screen if it touches right side
    if ((this.x + this.size) >= width) {
        this.x = 0;
    } 
    // move ball to right side of screen if it reaches left side
    if ((this.x + this.size) <= 0) {
        this.x += width;
    }

    // add velX and velY to respective coordinates - move ball every time method is called
    this.x += this.velX;
    this.y += this.velY;
}

// add collision detection to ball
Ball.prototype.collisionDetect = function () {
    // loop through balls in array
    for (let j = 0; j < balls.length; j++) {
        // check if current ball being looped through is same as one we are checking - if so, negate check 
        // - code only runs if balls are not the same and ball exists
        if (!(this === balls[j]) && balls[j].exists) {
            // check if two balls collide
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // if circles collide, change color to random
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                // change size randomly on impact
                balls[j].size = random(10, 50);
            }
        }
    }
}


// create EvilCircle inheriting methods from from Shape
function EvilCircle(x, y, exists) {
    // call methods from Shape
    Shape.call(this, x, y, 20, 20, exists);
    // size and color
        this.color = 'white';
        this.size = 10;
    }
    
    // create EvilCircle from shape
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// draw EvilCircle on screen
EvilCircle.prototype.draw = function () {
    // state that we want to draw a shape on canvas
    ctx.beginPath();
    // define color we want shape to be
    ctx.strokeStyle = this.color;
    // make circle line thicker
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // finish drawing path started with beginPath(), just a circle around outside
    ctx.stroke();
}

// make sure circle doesn't go off top border but can move off side to appear on other side
EvilCircle.prototype.checkBounds = function () {
    
    // //if y coordinate is greater than canvas height (off bottom edge)
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    // // if y coordinate is less than 0 (off top edge)
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    // move circle to left side of screen if it touches right side
    if ((this.x + this.size) >= width) {
        this.x = 0;
    } 
    // move circle to right side of screen if it reaches left side
    if ((this.x + this.size) <= 0) {
        this.x += width;
    }
}

EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
        if (e.key === 'a') {
            _this.x -= _this.velX;
        } else if (e.key === 'd') {
            _this.x += _this.velX;
        } else if (e.key === 'w') {
            _this.y -= _this.velY;
        } else if (e.key === 's') {
            _this.y += _this.velY;
        } 
        // else if ((e.key === 'a') && (e.key = 'w')) {
        //     _this.x -= _this.velX;
        //     _this.y -= _this.velY;
        // }
    }
}

EvilCircle.prototype.collisionDetect = function () {
    // loop through balls in array
    for (let j = 0; j < balls.length; j++) {
        // check if ball exists
        if (balls[j].exists) {
            // check if objects collide
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // if circles collide, ball no longer exists and decrement ballsRemaining
            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                ballsRemaining--;
                console.log(ballsRemaining);
            }
        }
    }
}


// create array for balls
let balls = [];

// create new instances of Ball() using size values generated from random()
// then push() to end of balls array, up to 25 total
while (balls.length < 25) {
    let size = random(10, 20);
    // increment ballsRemaining for each ball in array
    var ballsRemaining = balls.length + 1;
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from edge of canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    // push balls to array
    balls.push(ball);
    console.log(ballsRemaining);
}

// create instance of EvilCircle with random location; set controls to EvilCircle
let circleOne = new EvilCircle(
    random(0, width), 
    random(0, height), 
    true);
circleOne.setControls();

// set loop to draw scene repeatedly
function loop() {
    // set fill color to semi-transparent blue
    ctx.fillStyle = 'rgba(50, 168, 164, 0.25)';
    // draw rectangle of the color across width and height of canvas
    ctx.fillRect(0, 0, width, height);
    // loop through balls in array, run each's draw(), update(), collisionDetect functions, update for next frame
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

// draw evilcircle, run checkbounds and collision detection
circleOne.draw();
circleOne.checkBounds();
circleOne.collisionDetect();

/// write ballsRemaining on screen
document.getElementById('scoreCounter').innerText = 'Balls Remaining: ' + ballsRemaining;

// if all balls deleted, display message and reload
if (ballsRemaining == 0) {
    window.location.reload();
    alert('You win! Play again!');   
} 
    // run function again recursively
    requestAnimationFrame(loop);
}

// call loop function to start animation
loop();
