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

//create ball
class Ball {
  constructor (x, y, velX, velY, color, size) {
    // horizontal and vertical coordinates
    this.x = x;
    this.y = y;
    // horizontal and vertical velocity
    this.velX = velX;
    this.velY = velY;
    // ball color and size
    this.color = color;
    this.size = size;
  }
}

// draw ball on screen
Ball.prototype.draw = function () {
    // state that we want to draw a shape on canvas
    ctx.beginPath();
    // define color we want shape to be
    ctx.fillStyle = this.color;
    // trace an arc shape on canvas with x & y as arc center,
    // radius of arc = ball size, 
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
        this.x >= width;
    }

    // add velX and velY to respective coordinates - move ball every time method is called
    this.x += this.velX;
    this.y += this.velY;
}

// add collision detection
Ball.prototype.collisionDetect = function () {
    // loop through balls in array
    for (let j = 0; j < balls.length; j++) {
        // check if current ball being looped through is same as one we are checking - if so, negate check 
        // - code only runs if balls are not the same
        if (!(this === balls[j])) {
            // check if two circles collide
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

// create array for balls
let balls = [];

// create new instances of Ball() using values generated from random()
// then push() to end of balls array, up to 25
while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from edge of canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size,
        random(1, 25)
    );

    // push balls to array
    balls.push(ball);
}


function loop() {
    // set fill color to semi-transparent blue
    ctx.fillStyle = 'rgba(50, 168, 164, 0.25)';
    // draw rectangle of the color across width and height of canvas
    ctx.fillRect(0, 0, width, height);
    // loop through balls in array, run each's draw(), update(), collisionDetect functions, update for next frame
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    // run function again recursively
    requestAnimationFrame(loop);
}

// call loop function to start animation
loop();


// create player-controlled object
// make pco change color of other objects on touch
//make balls move from one side to other (if goes off right side, shows on left side)


