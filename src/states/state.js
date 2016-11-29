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
    }
    
    setup() {
        console.log("state setup");
    }
    
    update() {
        
    }
    
    render() {

    }
}