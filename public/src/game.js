class Game {
    constructor() {
        // Set Frames per-second
        this.FPS = 30;
        
        // Set initial State
        this.states = {};
        this.state;
        
        this.timer;
        this.level = 0;
        
        this.frontGraphics = new PIXI.Graphics();
        
        // Creat a Matter.js engine
        this.engine = Matter.Engine.create();
        this.engine.world.gravity.y = 0;
        this.engine.world.gravity.x = 0;
        
        var rendererOptions = {
            antialiasing: false,
            transparent: false,
            resolution: GAME_WIDTH/GAME_HEIGHT,
            autoResize: true,
        }
        
        // Create the renderer
        this.renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);//640,360);
        this.renderer.backgroundColor = 0x212121;
        window.addEventListener("resize", this.gameWindowResize);
        
        // Create Categories for collision using bit fields
        this.collisionCategories = [0x0001, 0x0002, 0x0004, 0x0008]
        
        // Add the canvas to the HTML document
        document.getElementById("game-canvas").appendChild(this.renderer.view);
        
        // run the engine
        Matter.Engine.run(this.engine);
        
        // create a renderer (WIREFRAME ON for debugging)
//        this.render = Matter.Render.create({element: document.body, engine: this.engine });
        // Debug Render
//        Matter.Render.run(this.render);
//        Matter.Render.showCollisions = true;
        
        // When transition is done this event is called
        Matter.Events.on(this, "transition", function(event) {
//            console.log(event);
            transitionDone = true;
        });
        
//        this.updateList = new Array();
//        this.renderList = new Array();
//        this.updateList.push(testing);
        
        // Start Game Loop
        this.loop();
    }
    
    loop() {
        setTimeout(() => {
            // Loop this function at 60 frames per second
            requestAnimationFrame(() => {this.loop(); });
            
            this.state.update();

            this.state.render();
            
            if(!transitionDone || !transitionIn) {
                screenWipe(this.frontGraphics, 0, transitionIn);
            }
                
            // Render the container
            this.renderer.render(this.state.stage);
            this.state.graphics.clear();
            this.frontGraphics.clear();
        }, 1000 / this.FPS);
    }
    
    setState(key) {
        // Unload previous state
        if(this.state != null)
            this.state.unload();
        
        // Clear world
        Matter.World.clear(this.engine.world);
        
        // Clear events
        Matter.Events.off(this.engine);
        
        // Set new state
        this.state = this.states[key];
        
        // Load in state
        this.state.load();
        
        // If state isn't loaded then load it
//        if(this.state.loaded == false) { this.state.load(); }
        
        // add all of the bodies to the world
        Matter.World.add(this.engine.world, this.state.bodies);
        
        // Add transition layer
        this.state.stage.addChild(this.frontGraphics);
        
        this.gameWindowResize();
    }
    
    addState(name, st) {
        this.states[name] = st;
    }
    
    // Resizes game when window changes
    gameWindowResize() {
        var ratio = Math.min(document.getElementById("game-canvas").offsetWidth/GAME_WIDTH, window.innerHeight/GAME_HEIGHT);
        
        // Scale the view appropriately to fill that dimension
        game.state.stage.scale.x = game.state.stage.scale.y = ratio;
        
        scaled = ratio;

        // Update the renderer dimensions
        game.renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
    }
    
    getMousePosition() {
        var mousePosition = game.renderer.plugins.interaction.mouse.global;
        return Matter.Vector.create(mousePosition.x / game.state.stage.scale.x, mousePosition.y / game.state.stage.scale.y);  
    }
}

function testing() {
    console.log("testing");
    
}