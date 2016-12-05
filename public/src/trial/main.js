// Global Variables
var game;
var graphics;

var keyObject;

class SuperDraw {
    constructor() {
        this.state = this.play;
        
        // Create the renderer
        this.renderer = PIXI.autoDetectRenderer(640,360);
        
        // Add the canvas to the HTML document
        document.getElementById("game-canvas").appendChild(this.renderer.view);
        
        // Create a container object called the stage
        this.stage = new PIXI.Container();
        
        this.objects = [];
    }
    
    setup() {
        graphics = new PIXI.Graphics();
        this.stage.addChild(graphics);
        
        this.objects.push(new SimpleGameObject(120,0));
        this.objects.push(new SimpleGameObject(140,20));
        this.objects.push(new SimpleGameObject(160,40));
        this.objects.push(new SimpleGameObject(180,60));
        this.objects.push(new SimpleGameObject(200,80));
        
        this.objects.push(new SimpleGameObject(220,80));
        this.objects.push(new SimpleGameObject(240,100));
        this.objects.push(new SimpleGameObject(260,120));
        this.objects.push(new SimpleGameObject(280,140));
        this.objects.push(new SimpleGameObject(300,160));
        
        this.objects.push(new SimpleGameObject(320,170));
        this.objects.push(new SimpleGameObject(340,180));
        this.objects.push(new SimpleGameObject(360,200));
        this.objects.push(new SimpleGameObject(380,220));
        this.objects.push(new SimpleGameObject(400,240));
    }
    
    update() {
        this.state();
        
        // Tell the renderer to render the stage
        this.renderer.render(this.stage);
    }
    
    play() {
        
        graphics.clear();
        for (var i in this.objects) {
            this.objects[i].x += 1;
//            this.objects[i].y = 360/2 * (Math.sin(640.0/this.objects[i].x))
            
            this.objects[i].y = 160 + Math.sin((((this.objects[i].x%250))/10)+1) * 100;
            drawLine(graphics, this.objects[(i +1)%(this.objects.length-1)].x, this.objects[(i +1)%(this.objects.length-1)].y, this.objects[i].x, this.objects[i].y);
            
            
            drawCircle(graphics, this.objects[i].x, this.objects[i].y, 10);  
            
            if (this.objects[i].y > 360) {
                this.objects[i].y = 0;
            } else if (this.objects[i].x > 640) {
                this.objects[i].x = 0;
            }
        }
        
    }

}

function init() {
    game = new SuperDraw();
    
    game.setup();
    
//    PhysTest();
    
    gameLoop();
}

var FPS = 20;
function gameLoop() {
    setTimeout(function() {

        // Loop this function at 60 frames per second
        requestAnimationFrame(gameLoop);

        game.update();
    }, 1000 / FPS);
}

function drawLine(g, x1, y1, x2, y2) {
    g.lineStyle(2, 0xF0F0F0);
    g.moveTo(x1, y1);
    g.lineTo(x2,y2);
    g.endFill();
}

function drawCircle(g, x, y, r) {
    g.beginFill(0x9966FF);
    g.drawCircle(x, y, r);
    g.endFill();
}


function PhysTest() {
    // module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
}

class SimpleGameObject {
    constructor(xp, yp) {
        this.x = xp;
        this.y = yp;
    }
    
}