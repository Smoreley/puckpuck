class playState extends state {
    setup() {        
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);  
        
        // Add interactable object
        var obj = new GameObject(150,150, 15);
        this.objects.push(obj);
        this.bodies.push(obj.body);
        this.stage.addChild(obj.sprite);
        obj.setCollision(game.collisionCategories[1], game.collisionCategories[0] | game.collisionCategories[1]);
        
        // Add noninteractable objects
        for(var i = 0; i < 10; i++) {
            var n = new Puck(game.renderer.width*Math.random(), game.renderer.height*Math.random(), 10);
            this.objects.push(n);
            this.bodies.push(n.body);
            this.stage.addChild(n.sprite);
            
            n.setCollision(game.collisionCategories[0], game.collisionCategories[0] | game.collisionCategories[1]);
            n.body.label = "pck-"+i;
        }
        
        // Create borders
        var leftBlock = Matter.Bodies.rectangle(-25, game.renderer.height, 100, game.renderer.height*2, { isStatic: true });
        
        var rightBlock = Matter.Bodies.rectangle(game.renderer.width+25, game.renderer.height, 100, game.renderer.height*2, { isStatic: true });
        
        var topBlock = Matter.Bodies.rectangle(game.renderer.width/2, -25, game.renderer.width*2, 100, { isStatic: true });
        
        var bottomBlock = Matter.Bodies.rectangle(game.renderer.width/2, game.renderer.height+25, game.renderer.width*2, 100, { isStatic: true });
        
        // Add borders to bodies list (for physics)
        this.bodies.push(leftBlock);
        this.bodies.push(rightBlock);
        this.bodies.push(topBlock);
        this.bodies.push(bottomBlock);
        
        // Add target
        targetGoal = new Goal(game.renderer.width/2, game.renderer.height/2, 30);
        this.bodies.push(targetGoal.body);
        this.objects.push(targetGoal);
        this.stage.addChild(targetGoal.sprite);
        
        
        // Add mouse constraint
        var mouseConstraint = Matter.MouseConstraint.create(game.engine);
        mouseConstraint.collisionFilter.mask = game.collisionCategories[1];
        this.bodies.push(mouseConstraint);
        
//        Matter.Events.on(game.engine, 'collisionActive', function(event) {
//            var i, pair,
//            length = event.pairs.length;
//
//            for (i = 0; i < length; i++) {
//                pair = event.pairs[i];
//                if (!(pair.bodyA.label === 'Player' || pair.bodyB.label === 'Player')) {
//                    continue;
//                }
//                Matter.Events.trigger(player.body, 'collision', { pair : pair });
//            }
//        });
        
//        // Add all objects to stage and bodies
//        for(var obj in this.objects) {
//            this.bodies.push(obj.body);
//            this.stage.addChild(obj.sprite);
//        }
        
        this.x = 10;
        this.y = 0;
    }
    
    loadAssets() {
        
    }
    
    // Perform Logic
    update() {
        // Sync the representation with the physics
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].sync();
        }
        
    }
    
    // Perform rendering
    render() {
        this.graphics.clear();
        
        // Set the fill color
        this.graphics.beginFill(0xe74c3c); // Red
        
        for(var i = 0; i < this.objects.length; i++) {
            this.graphics.drawCircle(this.objects[i].body.position.x, this.objects[i].body.position.y, this.objects[i].body.speed + this.objects[i].body.circleRadius); // drawCircle(x, y, radius)            
        }        
        // Applies fill to lines and shapes since the last call to beginFill.
        this.graphics.endFill();
        
        drawLine(this.graphics, 0,0, this.objects[0].body.position.x, this.objects[0].body.position.y);
    }    
}
