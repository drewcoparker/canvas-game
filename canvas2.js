
// Character constructors
function Hero(image) {
    this.image = new Image();
    this.image.src = image;
    this.x = Math.floor(Math.random() * 440);
    this.y = Math.floor(Math.random() * 440);
}

Hero.prototype.update = function(keyDownEvent, speedModifier=5) {
    if (38 in keyDownEvent) {
        if (this.y >= 10) {
            this.y -= speedModifier;
        }
    }
    // if keyDown[39] is true, then user pressed the right arrow
    if (39 in keyDownEvent) {
        if (this.x <= 455) {
            this.x += speedModifier;
        }
    }
    // if keyDown[40] is true, then user pressed the down arrow
    if (40 in keyDownEvent) {
        if (this.y <= 413) {
            this.y += speedModifier;
        }
    }
    // if keyDown[37] is true, then user pressed the left arrow
    if (37 in keyDownEvent) {
        if (this.x >= 22) {
            this.x -= speedModifier;
        }
    }
}


function Monster(image) {
    this.image = new Image();
    this.image.src = image;
    this.x = Math.floor(Math.random() * 440);
    this.y = Math.floor(Math.random() * 440);
    this.xx = this.x;
    this.yy = this.y;
}

Monster.prototype.movement = function(speed) {
    this.speed = speed;
    if ((this.xx === this.x) && (this.yy === this.y)){
        this.xx = Math.floor(Math.random() * 440);
        this.yy = Math.floor(Math.random() * 440);
    } else {
        if (this.xx > this.x) {
            this.x += Math.ceil(Math.random() * this.speed);
        }
        if (this.xx < this.x) {
            this.x -= Math.ceil(Math.random() * this.speed);
        }
        if (this.yy > this.y) {
            this.y += Math.ceil(Math.random() * this.speed);
        }
        if (this.yy < this.y) {
            this.y -= Math.ceil(Math.random() * this.speed);
        }
    }
}

// *****************************************************************************
// Game functions
function collision() {
    for (var i = 0; i < monsters.length; i++) {
        if ((hero.x <= monsters[i].x + 32) &&
            (hero.y <= monsters[i].y + 32) &&
            (monsters[i].x <= hero.x + 32) &&
            (monsters[i].y <= hero.y + 32)
        ){
            console.log("collision");
        }
    }
        // console.log("The hero is on top of the goblin.");
        // currentPlayersScore++;
        //
        // document.getElementById('score-value').innerHTML = currentPlayersScore;
        // if (currentPlayersScore > highscore) {
        //     highscore = currentPlayersScore;
        //     document.getElementById('high-score-value').innerHTML = currentPlayersScore;
        // }
        // var currentPlayerIndex = playerArray.length - 1;
        // console.log(playerArray[currentPlayerIndex]);
        // if (currentPlayersScore > playerArray[currentPlayerIndex].highscore) {
        //
        // }
}




// *****************************************************************************

// Create a context for JS to play with (methods, properties, etc.)
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;

// Add the canvas tag to the DOM
document.body.appendChild(canvas);

// Make the canvas upon which our game will play out
var backgroundImage = new Image();
backgroundImage.src = "assets/background.png";

// Initialize our characters
var hero = new Hero("assets/hero.png", .5);
var keysDown = {};

var monsters = [];
monsters.push(
    new Monster("assets/monster.png"),
    new Monster("assets/monster.png"),
    new Monster("assets/monster.png")
);

// Event listeners come first
// We need a way to tell if the user has pushed an arrow key
addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
});

addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
});


function draw() {

    hero.update(keysDown);

    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(hero.image, hero.x, hero.y);


    for (var i = 0; i < monsters.length; i++) {
        context.drawImage(monsters[i].image, monsters[i].x, monsters[i].y);
        monsters[i].movement(1.5);
    }

    requestAnimationFrame(draw);
}

draw();
