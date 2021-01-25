function turnTo(angle)
{
    const epsilon = 0.01
    let delta = 0
    do{
        delta = angle - getHeading()
        if (Math.abs(delta) > epsilon)
        {
            let v = Math.min(1, Math.abs(delta))
            if (delta > 0)
            {
                setLeftPower(v)
                setRightPower(-v)
            }
            else{
                setLeftPower(-v)
                setRightPower(v)
            }
        }
        else{
            setLeftPower(0)
            setRightPower(0)
        }
        }
        while (Math.abs(delta) > epsilon || Math.abs(getAngularVelocity()) > 0.01)
    }

function pixelLocation(tile)
{
    return 32 + (tile * 64)
}

function face(xTile, yTile)
{
    let dx = pixelLocation(xTile) - getX()
    let dy = pixelLocation(yTile) - getY()
    let angle = Math.atan2(dy, dx)
    turnTo(angle)
}

function magnitude(x, y)
{
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function forward(distance)
{
    clearCollision()
    const startX = getX()
    const startY = getY()
    const epsilon = 5

    let travelled = 0
    let delta = 0
    let velocity = 0
    do{
        travelled = magnitude(getX() - startX, getY() - startY)
        delta = distance - travelled

        velocity = magnitude(getVelocityX(), getVelocityY())

        if (Math.abs(delta) > epsilon)
        {
            let v = Math.min(1, Math.abs(delta) / 50)
            if (delta > 0)
            {
                setLeftPower(v)
                setRightPower(v)
            } else{
                setLeftPower(-v)
                setRightPower(-v)
            }
        } else {
            setLeftPower(0)
            setRightPower(0)
        }
    }while (!isCollisionDetected() && (Math.abs(delta) > epsilon || Math.abs(velocity) > 0.1))
    
    setLeftPower(0)
    setRightPower(0)
}

function moveTo(xTile, yTile)
{
    face(xTile, yTile)
    let dx = pixelLocation(xTile) - getX()
    let dy = pixelLocation(yTile) - getY()
    let distance = magnitude(dx, dy)
    forward(distance)
    whenCollision()
    // backOff();
    // moveTo(5,5);
}

function backOff()
{
    const d = 5
    const startX = getX()
    const startY = getY()
    let travelled = 0
    do{
        travelled = magnitude(getX() - startX, getY() - startY)
        if (travelled < d)
        {
            setLeftPower(-0.1)
            setRightPower(-0.1)
        }
    } while(travelled < d)

    setLeftPower(0)
    setRightPower(0)
}

function whenCollision()
{
    if (isCollisionDetected())
    {
        backOff()
        //the 3 lines below is for letting the robot round and move
        turnTo(Math.PI * 2)
        setLeftPower(1)
        setRightPower(1)
    }
}

// Cannot work the rest out from here on

let grid = []; //hold the map

function flood(x, y, d)
{
    for (let c = 0; c < 10; c++)
    {
        let row = []; //hold the estimated distances from the goal
        for (let r = 0; r < 10; r++)
        {
            if(isCollisionDetected)
            {
                row[r] = false;
            }
            else
                row[r] = true;
        }
        grid[c] = row;    
    }  
}

let goalTileX = Math.floor(getGoalX() / 64)
let goalTileY = Math.floor(getGoalY() / 64)

flood(10, 10, 0);


face(0,1) //face to the right
face(-1, 0) //face backwards
face(1, 1) //face diagonaly

moveTo(0, 5) //half way through the y asses of the 0 x asses - first line
moveTo(1, 5) //half way through the y assess of the 1 x asses - second line
moveTo(5, 0) //half way through the x asses of the 0 y asses - first line

backOff()

//Call the face(), backOff() and moveTo() functions will be enough to move the robot, but below are other commands
turnTo(Math.PI / 2) //to turn right
turnTo( - Math.PI /2) //to turn left
//to go forward
setLeftPower(1)
setRightPower(1)
//to go backward
setLeftPower(-1)
setRightPower(-1)
//to stop
setLeftPower(0)
setRightPower(0)

// setLightColour("blue")
// moveTo(5, 0)
// setLeftPower(0)
// setRightPower(0)
// setLightColour("green")
// moveTo(5, 0)
// moveTo(0, 0)
// setLeftPower(0)
// setRightPower(0)
// setLightColour("red")