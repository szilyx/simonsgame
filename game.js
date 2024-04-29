var gamePattern= [];
var userClickedPattern = [];
var level = 0;
var started = false;
const buttonColours = ["red","blue","green","yellow"];
function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("h1").text("Level "+level);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
    
})

function playSound(name){
    var clickSound = new Audio('sounds/'+name+'.mp3');
    clickSound.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("oke");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over! Press any key to restart!");
        startOver();
        console.log("wrong");
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}