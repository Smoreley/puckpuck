var state = pause;
var renderer;
var stage;
var graphics;

var keyObject;

// my sprites
var sprite;

var timer;

var message;

function init() {

    console.log(PIXI);
    
    // Create the renderer
    renderer = PIXI.autoDetectRenderer(640,360);
    
    // Add the canvas to the HTML document
    document.getElementById("game-canvas").appendChild(renderer.view);
    
    // Create a container object called the stage
    stage = new PIXI.Container();
    
    // Tell the renderer to render the stage
    renderer.render(stage);
    
    keyObject = keyboard(65);
    keyObject.press = function() {
      console.log("was pressed");
        sprite.position.x += 1;
    };
    
    keyObject.release = function() {
        console.log("Was let go");
    };
    
    
//    var circleText = PIXI.Texture.fromImage("bin/circle.png");
//    var circle = new PIXI.Sprite(circleText);
//    circle.position.x = 0;
//    circle.position.y = 100;
//    stage.addChild(circle);
    
//    spriteCreat("bin/circle.png");
    PIXI.loader.add("bin/boid.png").load(setup);
    PIXI.loader.add("bin/tiletextset.png").load(tilesetSetup);
    
    
    timer = new PIXI.ticker.Ticker();
    timer.start();
    
    graphics = new PIXI.Graphics();
    stage.addChild(graphics);
    
    message = new PIXI.Text(timer.deltaTime, {fill: "white"});
    stage.addChild(message);
    
    
//    renderer.autoResize = true;
//    renderer.resize(512,512);
//    fullscreen(renderer);    
    
    gameLoop();
}

function gameLoop() {
    // Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    
    state();
    
    renderer.render(stage);
}

function play() {
    // move the sprite 1 pixel to the right each frame
    sprite.rotation += 1/10;
    
    // Draw Line
    drawline(0,0, 100,100);
    
    message.text = timer.elapsedMS;
    
}

function pause() {
    
}


// Fills the entire window
function fullscreen(renderer) {
    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
}

//function spriteCreat(img) {
//    PIXI.loader.add(img).load(setup);
//    
//    var texture = PIXI.utils.TextureCache[img];
//    return new PIXI.Sprite(texture);
//}
//
//function load(arry) {
//    PIXI.loader.add(arry).load(setup());
//}

// This code will run when the loader has finished loading the image
function setup() {
    sprite = new PIXI.Sprite(PIXI.loader.resources["bin/boid.png"].texture);
    
    // Set position
    sprite.position.set(50,50);
    
    // Set Scale
    sprite.width = 32;
    sprite.height = 32;
//    sprite.scale(10, 10);
    
    // Set Rotation
    sprite.anchor.set(0.5, 0.5);
    sprite.rotation = 0.5;
    
    // Add the sprite to the stage
    stage.addChild(sprite);
    
    // Render the stage
    renderer.render(stage);
    
    state = play;
}

// Tileset
function tilesetSetup() {
    
    var texture = PIXI.utils.TextureCache["bin/tiletextset.png"];
    
    var rectangle = new PIXI.Rectangle(8,0, 8,8);
    
    // Tell the texture to use that rectangular section
    texture.frame = rectangle;
    
    var rocket = new PIXI.Sprite(texture);
    
    rocket.x = 32;
    rocket.y = 32;
    
    // Add rocket to the stage
    stage.addChild(rocket);
    
    // Render tje stage
    renderer.render(stage);
}

function drawline(x1, y1, x2, y2) {
    graphics.lineStyle(2, 0xffffff);
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2,y2);
    graphics.endFill();
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}