//Andrew Parker
//Dec 6, 2016
//Javascript for canvas game


// 1. add a pause button
// 2. add a countdown timer - once time is out, game over
// 3. keep score by player
// 3a. make a player constructor name (ask)


// start game button, when clicked, time starts, player can move
// when clicked, get date.now and save it to current date
// when clicked, get date.now + 30 + 1000 miliseconds
// create a setInterval to run every x
// inside of that recalculate the timer, when the difference is > 0,
// stop the game and clear the timer.

function startGame() {
    gameOn = true;
    // user started the game, save the time + 30 secs
    gameStart = Date.now();
    gameEnd = Date.now() + 30000;
    timerInterval = setInterval(updateTimer, 500);
    currentPlayersScore = 0;
    document.getElementById('score-value').innerHTML = 0;
}


function Player(name) {
    this.name = name;
    this.highscore = 0;
}



function newPlayer() {
    var playerNameDiv = document.getElementById("player-name");
    var playerName = playerNameDiv.value;
    playerArray.push(new Player(playerName));
    // console.log(playerArray);
    document.getElementById('current-player').innerHTML = playerName + "'s";
    console.log(playerName);
}

function updateTimer() {
    var newNow = Date.now();
    // subtract the game end time from the current time
    var timeDifference = Math.floor((gameEnd - newNow) / 1000);
    if (timeDifference < 0) {
        clearInterval(timerInterval);
        gameOn = false;
        timeDifference = 0;
        document.getElementById('timer').innerHTML = "Game Over!!";
    } else {
        document.getElementById('timer').innerHTML = timeDifference + " seconds";
    }
}

function pause() {
    gameOn = false;
}

var gameStart = 0;
var gameEnd = 0;
var timerInterval;
var playerArray = [];
var highscore = 0;
var currentPlayersScore = 0;

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

// This is used to speed up or slow down the hero when arrow keys are pressed.
var speedModifier = .5;
var gameOn = false;

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

var monster2 = new Image();
monster2.src = "assets/monster.png"
var randomLocationX = Math.floor(Math.random() * 440);
var randomLocationY = Math.floor(Math.random() * 440);
var monster2Location = {
    x: randomLocationX,
    y: randomLocationY,
    newX: randomLocationX,
    newY: randomLocationY
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
    if (32 in keysDown) {
        // heroLocation += 10;
        pause();
    }

    if ((heroLocation.x <= monsterLocation.x + 32) &&
        (heroLocation.y <= monsterLocation.y + 32) &&
        (monsterLocation.x <= heroLocation.x + 32) &&
        (monsterLocation.y <= heroLocation.y + 32)
    ){
        // console.log("The hero is on top of the goblin.");
        currentPlayersScore++;

        document.getElementById('score-value').innerHTML = currentPlayersScore;
        if (currentPlayersScore > highscore) {
            highscore = currentPlayersScore;
            document.getElementById('high-score-value').innerHTML = currentPlayersScore;
        }
        var currentPlayerIndex = playerArray.length - 1;
        console.log(playerArray[currentPlayerIndex]);
        if (currentPlayersScore > playerArray[currentPlayerIndex].highscore) {

        }
        // heroLocation.x += (10 * speedModifier);
        // heroLocation.y -= (10 * speedModifier);
    } else {
        
    }
}

function monsterMoves() {
    // Monster 1
    if ((monsterLocation.newX === monsterLocation.x) &&
        (monsterLocation.newY === monsterLocation.y)
    ){
        // Uncomment to have the monster roam randomly
        monsterLocation.newX = Math.floor(Math.random() * 440);
        monsterLocation.newY = Math.floor(Math.random() * 440);

        // Uncomment to have the monster follow hero
        // monsterLocation.newX = heroLocation.x;
        // monsterLocation.newY = heroLocation.y;
    } else {
        if (monsterLocation.newX > monsterLocation.x) {
            monsterLocation.x += Math.ceil(Math.random() * 3);
        }
        if (monsterLocation.newX < monsterLocation.x) {
            monsterLocation.x -= Math.ceil(Math.random() * 3);
        }
        if (monsterLocation.newY > monsterLocation.y) {
            monsterLocation.y += Math.ceil(Math.random() * 3);
        }
        if (monsterLocation.newY < monsterLocation.y) {
            monsterLocation.y -= Math.ceil(Math.random() * 3);
        }
    }
    // Monster 2
    if ((monster2Location.newX === monster2Location.x) &&
        (monster2Location.newY === monster2Location.y)
    ){
        // Uncomment to have the monster roam randomly
        monster2Location.newX = Math.floor(Math.random() * 440);
        monster2Location.newY = Math.floor(Math.random() * 440);

        // Uncomment to have the monster follow hero
        // monster2Location.newX = heroLocation.x;
        // monster2Location.newY = heroLocation.y;
    } else {
        if (monster2Location.newX > monster2Location.x) {
            monster2Location.x += Math.ceil(Math.random() * 3);
        }
        if (monster2Location.newX < monster2Location.x) {
            monster2Location.x -= Math.ceil(Math.random() * 3);
        }
        if (monster2Location.newY > monster2Location.y) {
            monster2Location.y += Math.ceil(Math.random() * 3);
        }
        if (monster2Location.newY < monster2Location.y) {
            monster2Location.y -= Math.ceil(Math.random() * 3);
        }
    }
}

// Keep this function at the bottom
function draw() {
    if (gameOn) {
        update();
        monsterMoves();
    }

    // Put our background image on the context at x=0, y=0
    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(hero, heroLocation.x, heroLocation.y);
    context.drawImage(monster, monsterLocation.x, monsterLocation.y);
    context.drawImage(monster2, monster2Location.x, monster2Location.y);
    requestAnimationFrame(draw);
}

draw();
