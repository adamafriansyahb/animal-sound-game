const buttonAnimals = ["crow", "frog", "horse", "cat"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(".btn").on("click", function() {
    let userChosenAnimal = $(this).attr("id");
    userClickedPattern.push(userChosenAnimal);

    playSound(userChosenAnimal);
    animatePress(userChosenAnimal);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress", function(event) {
    if (!started) {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenAnimal = buttonAnimals[randomNumber];
    gamePattern.push(randomChosenAnimal);

    i = 0
    let blink = setInterval(() => {
        console.log(gamePattern[i]);

        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        
        i++;

        if (i == gamePattern.length) {
            clearInterval(blink);
        }
    }, 1200);
}

const checkAnswer = function(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Start");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

const playSound = function(name) {
    let audio = new Audio("animal-sound/" + name + ".mp3");
    audio.play();
}

const animatePress = function(currentAnimal ) {
    $("#" + currentAnimal).addClass("pressed");
    setTimeout(() => {
        $("#" + currentAnimal).removeClass("pressed");
    }, 100);
}

const startOver = () => {
    level = 0;
    gamePattern = [];
    // userClickedPattern = [];
    started = false;
}

