/*
Student Name: Wilson Yang
Student Number: 301195179
*/

window.addEventListener("load", main)

var canvas = document.createElement("canvas");
canvas.id = "canvas";
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 500;
document.getElementById("game-space").appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
    console.log("Background Image has loaded.");
};
bgImage.src = "img/background.png";

var moleReady = false;
var moleImage = new Image();
moleImage.onload = function () {
    moleReady = true;
    console.log("Mole Image has loaded.");
};
moleImage.src = "img/mole.png";
var moleHeight = 130;
var moleWidth = 150;

var mole = {};
var score = 0;
var hopSpeed = 1000;

var xPosition = Math.floor(Math.random() * (canvas.width - moleWidth));
var yPosition = Math.floor(Math.random() * (canvas.height - moleHeight));

function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (moleReady) {
        ctx.drawImage(moleImage, xPosition, yPosition, moleWidth, moleHeight);
    }

    var scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = "Score: " + score;
}

function main() {
    var scoreDisplay = document.createElement("h2");
    scoreDisplay.id = "scoreDisplay";
    scoreDisplay.innerHTML = "Score: " + score;
    document.getElementById("dashboard").appendChild(scoreDisplay);

    var resetSpeed = document.createElement("button");
    resetSpeed.id = "resetSpeedBtn";
    document.getElementById("dashboard").appendChild(resetSpeed);
    resetSpeed.innerHTML = "Reset Hopping Speed"
    resetSpeed.onclick = function() {
        hopSpeed = 1000;
        clearInterval(gameloop);
        gameLoop = setInterval(render, hopSpeed);
    }

    var resetScore = document.createElement("button");
    resetScore.id = "resetScoreBtn";
    resetScore.innerHTML = "Reset Score";
    document.getElementById("dashboard").appendChild(resetScore);
    resetScore.onclick = function() {
        score = 0;
        scoreDisplay.innerHTML = "Score: " + score;
        console.log("Score Reset");
    }

    var fullReset = document.createElement("button");
    fullReset.id = "fullResetBtn";
    document.getElementById("dashboard").appendChild(fullReset);
    fullReset.innerHTML = "Restart";
    fullReset.onclick = function() {
        score = 0;
        hopSpeed = 1000;
        clearInterval(gameLoop);
        gameLoop = setInterval(render, hopSpeed);
        scoreDisplay.innerHTML = "Score: " + score;
        console.log("Game Restarted.");
    }

    canvas.addEventListener("click", function(event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        if (mouseX >= xPosition &&
            mouseX <= xPosition + moleWidth &&
            mouseY >= yPosition &&
            mouseY <= yPosition + moleHeight) {
            score++;
            xPosition = Math.floor(Math.random() * (canvas.width - moleWidth));
            yPosition = Math.floor(Math.random() * (canvas.height - moleHeight));
            console.log("Score: " + score);
            hopSpeed -= 35; 
            clearInterval(gameLoop); 
            gameLoop = setInterval(render, hopSpeed); 
        }
    });

    var gameLoop = setInterval(render, hopSpeed); 
}
