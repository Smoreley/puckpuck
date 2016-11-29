class Game {
    constructor() {
        // Set Frames per-second
        this.FPS = 30;
        
        // Creat a Matter.js engine
        this.engine = Matter.Engine.create();
        this.engine.world.gravity.y = 0;
        this.engine.world.gravity.x = 0;
        
        // Create the renderer
        this.renderer = PIXI.autoDetectRenderer(800, 600);//640,360);
        this.renderer.backgroundColor = 0x212121;
        
        // Create Categories for collision using bit fields
        this.collisionCategories = [0x0001, 0x0002, 0x0004, 0x0008]
        
        // Add the canvas to the HTML document
        document.getElementById("game-canvas").appendChild(this.renderer.view);
        
        // run the engine
        Matter.Engine.run(this.engine);
        
        // Set initial State
        this.states = {};        
        
        // create a renderer (WIREFRAME ON for debugging)
        this.render = Matter.Render.create({element: document.body, engine: this.engine });
        
        // Debug Render
        Matter.Render.run(this.render);
        Matter.Render.showCollisions = true;
        
        // Start Game Loop
        this.loop();
    }
    
    loop() {
        setTimeout(() => {
            // Loop this function at 60 frames per second
            requestAnimationFrame(() => {this.loop(); });
            
            this.state.update();

            this.state.render();
            
            // Render the container
            this.renderer.render(this.state.stage);
        }, 1000 / this.FPS);
    }
    
    setState(key) {
        alert("state:"+key);
        this.state = this.states[key];
        
        // Clear world
        Matter.World.clear(this.engine.world);
        
        // add all of the bodies to the world
        Matter.World.add(this.engine.world, this.state.bodies);
    }
    
    addState(name, st) {
        this.states[name] = st;
    }
}