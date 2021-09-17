# Bouncing Ball Project - EvilCircle

### Functionality:

Main goal: Add an “Evil Circle” to Bouncing Ball program. Evil Circle is controlled by the player and makes other shapes disappear when it touches them. When an object touches the right side of the screen, it will reappear on the left side and vice-versa. A counter will keep track of the total number of balls until the EvilCircle destroys all of them. When all balls are gone, an alert will pop up with message to player and reset game to beginning.


## Objects:
* Shape
    * Should be used as a constructor for other objects - Ball and EvilCircle
* Ball
    * Move around screen in random direction and speed, bouncing off top and bottom. Should change color and size when contacting another ball. Disappears when touched by EvilCircle.
* EvilCircle
    * Should be moveable by player with WASD. Should destroy other shapes when it touches them. Destroying objects decrements counter.


## Functions

Shape()
    
Ball()
* draw() - draws ball itself
* update() - updates movement
* collisionDetect() - detects collision with another ball, changes color and size on touch

EvilCircle()
* draw() - draws EvilCircle
* checkBounds() - checks if EvilCircle hits side of screen, IF left or right side, moves to other side
* setControls() - IF player presses WSAD buttons, move up, down, left or right respectively
* collisionDetect() - detect collision with ball, IF touch ball, destroy ball and remove from balls[]

loop()
* Sets background fill color to semi-transparent blue; Runs functions draw, update, collisionDetect, checkBounds, requestAnimationFrame to loop

random()
* Generate random number with Math.floor(), Math.random()

## Array

balls[]
* tracks ball objects

Variables:
* Canvas
* ctx
* Width
* Height
* ballsRemaining


---

    START

    INIT variables canvas, ctx, width, height

    INIT Shape()

    INIT Ball()
	
    INIT EvilCircle()

    INIT balls[]

    WHILE balls.length < 25, add balls to array
        INIT ballsRemaining,
        INCREMENT ballsRemaining

    INIT circleOne = new EvilCircle()

    INIT loop()
        DISPLAY canvas background
        IF balls[i] exists,
        balls[i].draw(), 
        balls[i].update,
        balls[i].collisionDetect()

    DISPLAY circleOne
        circleOne.draw(),
        circleOne.checkBounds(),
        circleOne.collisionDetect()
    DISPLAY ballsRemaining
    IF ballsRemaining = 0, alert(‘You win! Play again!”),
        window.location.reload();

    REPEAT

