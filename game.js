var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;


//action to start the game 

    
$(document).on("keydown",function (){  
    if(!hasStarted){
        hasStarted=true;
        nextSecuence();
    }
});


function checkAnswer() {
    
    var gameover = false;

    for (var index = 0; index < gamePattern.length; index++) {
        if(gamePattern[index] != userClickedPattern[index]){
            gameover = true;
            break;
        }
    }

    if(!gameover){
        setTimeout(() => {
            nextSecuence();
        },1000);
    }else{
        $("body").addClass("game-over");
        $("h1").text("Game Over pal");
        setTimeout(() => {
            location.reload();
        },3000);
        
    }

}


function nextSecuence(){
    $("#level-title").text("Level "+level);//change tittle(h1) text
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*3); 
    var randomChosenColour = buttonColours[randomNumber];
    
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);
    animatePress(randomChosenColour,"pressed");
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);

    level++;
}


function playSound(name){
    switch (name) {
        case "blue":
            new Audio("sounds/blue.mp3").play();
            break;
        
        case "green":
            new Audio("sounds/green.mp3").play();
            break;
        
        case "red":
            new Audio("sounds/red.mp3").play();
            break;
    
        case "yellow":
            new Audio("sounds/yellow.mp3").play();
            break;
                    
        default:
            console.log("Error inesperado");
            break;
    }
}


function animatePress(currentColour,className){
        $("#"+currentColour).addClass(className);
        setTimeout(() => {
            $("#"+currentColour).removeClass(className);
        },150);
}



//action when the button is clicked bby the user
$(".btn").on("click",function (event){  
    var userChosenColour = event.target.id;
    

    $("#"+userChosenColour).fadeOut(150).fadeIn(150);
    animatePress(userChosenColour,"pressed");
    playSound(userChosenColour);
    
    //add color to the user pattern array
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern.length +" "+ gamePattern.length);
    if(userClickedPattern.length == gamePattern.length){
        checkAnswer();
    }

});