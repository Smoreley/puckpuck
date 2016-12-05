class state {
    constructor() {
        // Stage that holds the sprite representation
        this.stage = new PIXI.Container();
        
        // Objects in the scene
        this.objects = [];
        
        // For Physics bodies
        this.bodies = [];
        
        // Calls setup right away
        this.setup();
        
        this.loaded = false;
    }
    
    // Intial Setup of state is done here
    setup() {
        console.log("state setup");
    }
    
    // Loads all the assets needed right before state is run
    load() {

    }
    
    // Unloads assets
    unload() {
        
    }
    
    // Where logic is done
    update() {
        
    }
    
    // Where rendering is done
    render() {

    }
}