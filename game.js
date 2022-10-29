// alert("I am working!!");

const buttonColors = ["red", "green", "blue", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function(){
    if(!started){
        console.log("Started");
        $("#level-title").text("Level " + level);
        nextSeqence();
        started = true;
    }
});

$(".btn").click(function(){
    userChoosenColor = this.getAttribute("id");
    userClickedPattern.push(userChoosenColor);
    animatePress(userChoosenColor);
    playSound(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Correct");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSeqence, 1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $('body').removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Any Key To Restart");
        gameOver();
        console.log("Wrong");
    }
}

function nextSeqence(){
    console.log("next sequence called")
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    let randomColor = buttonColors[Math.round(Math.random() * 3)];
    gamePattern.push(randomColor);
    animatePress(randomColor);
    playSound(randomColor);
}

let redSound = new Audio('sounds/red.mp3');
let greenSound = new Audio('sounds/green.mp3');
let blueSound = new Audio('sounds/blue.mp3');
let yellowSound = new Audio('sounds/yellow.mp3');
let wrongSound = new Audio('sounds/wrong.mp3');

function playSound(target){   
    switch (target){
        case 'red':
            redSound.play();
            break;
        case 'green':
            greenSound.play();
            break;
        case 'blue':
            blueSound.play();
            break;
        case 'yellow':
            yellowSound.play();
            break;
        default:
            wrongSound.play();
            break;
    }
}

function animatePress(target){
    $('#' + target).addClass("pressed");
   
    setTimeout(function(){
        $('#' + target).removeClass("pressed")
    }, 100);
}

function gameOver() {
    gamePattern = [];
    level = 0;
    started = false;
}
