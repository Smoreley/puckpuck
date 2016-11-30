var game;
var mGrab, mLetGo;
var targetGoal;
var launchCount = 0;
var drawTargetingLine = false;

var GAME_WIDTH, GAME_HEIGHT;

// Wait for DOM to load
function init() {
    drawTargetingLine = false;
    GAME_WIDTH = 800;
    GAME_HEIGHT = 600;
    
    
    game = new Game();
    
    // Initialize Mouse position storage
    mGrab = Matter.Vector.create(0, 0);
    mLettGo = Matter.Vector.create(0, 0);
    
    var play = new playState();
    var menu = new menuState();

    game.addState("play", play);
    game.addState("pause", menu);
    game.setState("play");
    
    
    // Up arrow
    var arrowKeyObject = keyboard(38);
    arrowKeyObject.press = function() {
      console.log("up arrow pressed");
        game.setState("pause");
    };

    arrowKeyObject.release = function() {
        console.log("key was let go");
        game.setState("play");
    };
    
    // Down arrow (Reset level)
    var resetObject = keyboard(40);
    resetObject.press = function() {
      console.log("Down arrow pressed");
        game.states["play"] = new playState();
        game.setState("play");
    };

//    resetObject.release = function() {
//        console.log("Downkey was let go");
//        game.setState("play");
//    };
    
}

//var activeSprites = [];
//var physicsBodies = [];
//function createSprite() {
//    return {
//        sprite: new SpriteObject(), body: new PhysicsObject()
//    };
//}