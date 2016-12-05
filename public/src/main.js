// Game Variables
const GAME_WIDTH = 1280, GAME_HEIGHT = 720;
var game;
var targetGoal;
var scaled; // Scalling to properly resize window

// Mouse
var mGrab, mLetGo; // Position of grab and let go of mouse
var drawTargetingLine = false;

// Stats
var launchCount = 0;
var timeItTook = 0;
var captureCount = 0;

var transitionDone = false;
var transitionIn = true;

// Wait for DOM to load
function init() {
    drawTargetingLine = false;    
    
    // Initialize Mouse position storage
    mGrab = Matter.Vector.create(0, 0);
    mLettGo = Matter.Vector.create(0, 0);
    
    // Create Game
    game = new Game();
    
    // Create some States
    var play = new playState();
    var menu = new menuState();

    // Add States
    game.addState("play", play);
    game.addState("menu", menu);
    game.setState("menu");
    
    
    // Up arrow
    var arrowKeyObject = keyboard(38);
    arrowKeyObject.press = function() {
        
        if(game.state == menu) {
            game.setState("play");    
        } else {
            game.setState("menu");
        }
    };

//    arrowKeyObject.release = function() {
//        console.log("key was let go");
//        game.setState("play");
//    };
    
    // Down arrow (Reset level)
    var resetObject = keyboard(40);
    resetObject.press = function() {
      console.log("Down arrow pressed");
//        play = new playState();
        game.states["play"] = new playState();
        game.setState("play");
    };

//    resetObject.release = function() {
//        console.log("Downkey was let go");
//        game.setState("play");
//    };
    
    $("button").click(function(){
      dataSave("level one", 59, "batman");
    });
    
    var transitionButton = keyboard(81);
    transitionButton.press = function() {
      console.log("Q was pressed");
        transitionIn = !transitionIn;
        transitionDone = !transitionDone;
    };
    
//    $("#setName").onClick(function(){
//        alert("test");
//        var temp = documentElementById("playerNameInput").value;
//        console.log(temp);
//    });
    
}

//var activeSprites = [];
//var physicsBodies = [];
//function createSprite() {
//    return {
//        sprite: new SpriteObject(), body: new PhysicsObject()
//    };
//}

function dataSave(levelName = "unknown",  earnedScore = 0, playerName = "untitled") {
    $.ajax({
        url: "https://puckme.herokuapp.com/savePlayerScore",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({"name": playerName, "level": levelName, "score": earnedScore}),
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          //called when complete
          console.log('process complete');
        },

        success: function(data) {
          console.log(data);
          console.log('process sucess');
       },

        error: function() {
          console.log('process error');
        },
    });
}