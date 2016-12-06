//Andrew Parker
//Dec 6, 2016
//Javascript for canvas game


var canvas = document.createElement('canvas');
// Create a context for JS to play with (methods, properties, etc.)
var context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;

// Add the canvas tag to the DOM
document.body.appendChild(canvas);

// Make the canvas upon which our game will play out
var backgroundImage = new Image();
backgroundImage.src = "assets/background.png";

// Make an image for our hero
var hero = new Image();
hero.src = "assets/hero.png";
var heroLocation = {
    x: 100,
    y: 100
}

// Make an image for out monster
var monster = new Image();
monster.src = "assets/monster.png"
var monsterLocation = {
    x: 200,
    y: 100
}


// an array to hold all the keys that are currently pressed down
var keysDown = {};

// We need a way to tell if the user has pushed an arrow key
addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
    console.log(keysDown);
});

addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
});

function update() {
    // this is where we will update the hero based on what is true in keysDown
    // if keyDown[38] is true, then user pressed the up arrow
    if (38 in keysDown) {
        heroLocation.y -= 10;
    }
    // if keyDown[39] is true, then user pressed the right arrow
    if (39 in keysDown) {
        heroLocation.x += 10;
    }
    // if keyDown[40] is true, then user pressed the down arrow
    if (40 in keysDown) {
        heroLocation.y += 10;
    }
    // if keyDown[37] is true, then user pressed the left arrow
    if (37 in keysDown) {
        heroLocation.x -= 10;
    }
    // if keyDown[33] is true, then user pressed the space bar
    if (33 in keysDown) {
        // heroLocation += 10;
    }

    if ((heroLocation.x <= monsterLocation.x + 32) &&
        (heroLocation.y <= monsterLocation.y + 32) &&
        (monsterLocation.x <= heroLocation.x + 32) &&
        (monsterLocation.y <= heroLocation.y + 32)
    ){
        console.log("The hero is on top of the goblin.");    
    } else {
        console.log("The hero is not close enough.");
    }
}

// Keep this function at the bottom
function draw() {
    update();
    // Put our background image on the context at x=0, y=0
    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(hero, heroLocation.x, heroLocation.y);
    context.drawImage(monster, monsterLocation.x, monsterLocation.y);
    requestAnimationFrame(draw);
}

draw();
