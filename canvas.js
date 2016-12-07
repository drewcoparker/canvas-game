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
    y: 100,
    newX: 200,
    newY: 100
}

// This is used to speed up or slow down the hero when arrow keys are pressed.
var speedModifier = .5;

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

    // boundary coordinates: 10, 455, 413, 22
    // if keyDown[38] is true, then user pressed the up arrow
    if (38 in keysDown) {
        if (heroLocation.y >= 10) {
            heroLocation.y -= (10 * speedModifier);
        }
    }
    // if keyDown[39] is true, then user pressed the right arrow
    if (39 in keysDown) {
        if (heroLocation.x <= 455) {
            heroLocation.x += (10 * speedModifier);
        }
    }
    // if keyDown[40] is true, then user pressed the down arrow
    if (40 in keysDown) {
        if (heroLocation.y <= 413) {
            heroLocation.y += (10 * speedModifier);
        }
    }
    // if keyDown[37] is true, then user pressed the left arrow
    if (37 in keysDown) {
        if (heroLocation.x >= 22) {
            heroLocation.x -= (10 * speedModifier);
        }
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

function monsterMoves() {
    if ((monsterLocation.newX === monsterLocation.x) &&
        (monsterLocation.newY === monsterLocation.y)
    ){
        // Uncomment to have the monster roam randomly
        // monsterLocation.newX = Math.floor(Math.random() * 440);
        // monsterLocation.newY = Math.floor(Math.random() * 440);

        // Uncomment to have the monster follow hero
        monsterLocation.newX = heroLocation.x;
        monsterLocation.newY = heroLocation.y;
    } else {
        if (monsterLocation.newX > monsterLocation.x) {
            monsterLocation.x += (1 * 1);
        }
        if (monsterLocation.newX < monsterLocation.x) {
            monsterLocation.x -= (1 * 1);
        }
        if (monsterLocation.newY > monsterLocation.y) {
            monsterLocation.y += (1 * 1);
        }
        if (monsterLocation.newY < monsterLocation.y) {
            monsterLocation.y -= (1 * 1);
        }
    }
}

// Keep this function at the bottom
function draw() {
    update();
    monsterMoves();
    // Put our background image on the context at x=0, y=0
    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(hero, heroLocation.x, heroLocation.y);
    context.drawImage(monster, monsterLocation.x, monsterLocation.y);
    requestAnimationFrame(draw);
}

draw();
