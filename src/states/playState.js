class playState extends state {
    setup() {        
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);
        
        // Add interactable object
        var obj = new GameObject(150,150, 15);
        obj.setSprite('./bin/imgs/cirtest.png', 32, 32);
        this.objects.push(obj);
        obj.setCollision(game.collisionCategories[1], game.collisionCategories[0] | game.collisionCategories[1]);
        
        // Add noninteractable objects
        for(var i = 0; i < 10; i++) {
            var n = new Puck(GAME_WIDTH*Math.random(), GAME_HEIGHT*Math.random(), 10);
            this.objects.push(n);
            
            n.setCollision(game.collisionCategories[0], game.collisionCategories[0] | game.collisionCategories[1]);
            n.body.label = "pck-"+i;
        }
        
        // Create borders
        var leftBlock = Matter.Bodies.rectangle(-25, GAME_HEIGHT, 100, GAME_HEIGHT*2, { isStatic: true });
        
        var rightBlock = Matter.Bodies.rectangle(GAME_WIDTH+25, GAME_HEIGHT, 100, GAME_HEIGHT*2, { isStatic: true });
        
        var topBlock = Matter.Bodies.rectangle(GAME_WIDTH/2, -25, GAME_WIDTH*2, 100, { isStatic: true });
        
        var bottomBlock = Matter.Bodies.rectangle(GAME_WIDTH/2, GAME_HEIGHT+25, GAME_WIDTH*2, 100, { isStatic: true });
        
        // Hold graphic representation for walls
        this.walls = [];
        
        var bottomSprite = {x: 0,
                           y: GAME_HEIGHT-25,
                           w: GAME_WIDTH,
                           h: 100};
        this.walls.push(bottomSprite);
        
        
        for (var i = 0; i < 8; i++) {
            this.CreateWall(Math.random()*GAME_WIDTH,Math.random()*GAME_HEIGHT, 40+Math.random()*50, 40+Math.random()*50);    
        }
        
        // Add borders to bodies list (for physics)
        this.bodies.push(leftBlock);
        this.bodies.push(rightBlock);
        this.bodies.push(topBlock);
        this.bodies.push(bottomBlock);
        
        // Add target
        targetGoal = new Goal(GAME_WIDTH/2, GAME_HEIGHT/2, 0);
        this.objects.unshift(targetGoal);    
        
        // Add mouse constraint
//        var mouseConstraint = Matter.MouseConstraint.create(game.engine);
//        mouseConstraint.collisionFilter.mask = game.collisionCategories[1];
//        this.bodies.push(mouseConstraint);
        
        // Add all objects to stage and bodies
        for (var j = 0; j <= this.objects.length; j++) {
            if(this.objects[j] == undefined) { continue; }
            
            this.bodies.push(this.objects[j].body);
            if(this.objects[j].sprite != null) {
                this.stage.addChild(this.objects[j].sprite);
            }
        }
        
        this.x = 10;
        this.y = 0;
    }
    
    loadAssets() {
        
    }
    
    // Perform Logic
    update() {
        // Sync the representation with the physics
        for (var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].sprite != null) {
                this.objects[i].sync();
            }
        }
    }
    
    // Perform rendering
    render() {        
        for(var i = 0; i < this.objects.length; i++) {
            // Set the fill color
            this.graphics.beginFill(0xe74c3c); // Red
            
            this.graphics.drawCircle(this.objects[i].body.position.x, this.objects[i].body.position.y, this.objects[i].body.speed + this.objects[i].body.circleRadius); // drawCircle(x, y, radius)
            
            // Applies fill to lines and shapes since the last call to beginFill.
            this.graphics.endFill();
        }
        
        for(var j = 0; j < this.walls.length; j++) {
            this.graphics.beginFill(0x3c82e7); // blue
//            this.graphics.drawRect (this.walls[j].x, this.walls[j].y, this.walls[j].w, this.walls[j].h);
            this.graphics.drawRoundedRect (this.walls[j].x, this.walls[j].y, this.walls[j].w, this.walls[j].h, 10);
            this.graphics.endFill();
        }
        
        if(drawTargetingLine) {
            var mousePos = game.getMousePosition();
            
            drawLine(this.graphics, mousePos.x, mousePos.y, mGrab.x, mGrab.y, 0xe7a23c);
        }
    }
    
    CreateWall(x, y, w, h) {
        var someBlock = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true });
        var nGraphic = {x: x - w/2,
                   y: y - h/2,
                   w: w,
                   h: h};
        
        this.bodies.push(someBlock);
        this.walls.push(nGraphic);   
    }
    
    Remove(gobj) {
        var index;
        for(var i = 0; i < this.objects.length; i++) {
            if(gobj == this.objects[i].body) {
                index = i;
                break;
            }
        }
        
        // Remove Bodie
        Matter.World.remove(game.engine.world, this.objects[index].body);
        
        // Remove Sprite
        this.stage.removeChild(this.objects[index].sprite);
        
        // Remove Game Object
        this.objects.slice(index, 1);
        
    }
}