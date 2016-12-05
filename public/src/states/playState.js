class playState extends state {
    setup() {        
        this.graphics = new PIXI.Graphics();
        
//        this.stage.addChild(this.graphics);
        
        // Hold graphic representation for walls
        this.walls = [];
        
        this.puckCount = game.level + 1;
        
        this.text = new PIXI.Text('PuckPuck',{fontFamily : 'Nova Script', fontSize: GAME_HEIGHT/2, fill : 0xf1f1f1, align : 'center'});
        
        this.text.alpha = 0.1;
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.x = GAME_WIDTH/2;
        this.text.y = GAME_HEIGHT/2;
        this.stage.addChild(this.text);
        
        this.stage.addChild(this.graphics);
        
        // Add mouse constraint
//        var mouseConstraint = Matter.MouseConstraint.create(game.engine);
//        mouseConstraint.collisionFilter.mask = game.collisionCategories[1];
//        this.bodies.push(mouseConstraint);
        
        // Add interactable object
//        var obj = new GameObject(150,150, 15);
//        obj.setSprite('./bin/imgs/cirtest.png', 32, 32);
//        this.objects.push(obj);
//        obj.setCollision(game.collisionCategories[1], game.collisionCategories[0] | game.collisionCategories[1]);
        
        // Add pucks
        for(var i = 0; i < this.puckCount; i++) {
            var n = new Puck(GAME_WIDTH*Math.random(), GAME_HEIGHT*Math.random(), 10);
            this.objects.push(n);
            
            n.setCollision(game.collisionCategories[0], game.collisionCategories[0] | game.collisionCategories[1]);
            n.body.label = "pck-"+i;
        }
        
        // Create Random Obstacles
        for (var i = 0; i < 16; i++) {
            this.CreateWall(Math.random()*GAME_WIDTH,Math.random()*GAME_HEIGHT, 40+Math.random()*50, 40+Math.random()*50, 0x3c82e7);
        }
        
        // Create Borders
        this.CreateWall(-30, GAME_HEIGHT, 100, GAME_HEIGHT*2, 0x3c82e7);
        this.CreateWall(GAME_WIDTH+30, GAME_HEIGHT, 100, GAME_HEIGHT*2, 0x3c82e7);
        this.CreateWall(GAME_WIDTH/2, -30, GAME_WIDTH*2, 100, 0x3c82e7);
        this.CreateWall(GAME_WIDTH/2, GAME_HEIGHT+30, GAME_WIDTH*2, 100, 0x3c82e7);
        
        // Add target
        targetGoal = new Goal(GAME_WIDTH/2, GAME_HEIGHT/2, 0);
        this.objects.unshift(targetGoal);
        
               // Add all objects to stage and bodies
        for (var j = 0; j <= this.objects.length; j++) {
            if(this.objects[j] == undefined) { continue; }
            
            this.bodies.push(this.objects[j].body);
            if(this.objects[j].sprite != null) {
//                this.stage.addChild(this.objects[j].sprite);
                this.stage.addChild(this.objects[j].sprite);
            }
        }
    }
    
    load() {        
        for (var j = 0; j <= this.objects.length; j++) {
            if(this.objects[j] == undefined) { continue; }
            // Initialize event listeners on ibjects
            this.objects[j].initializeEvents();
        }
        
        // On BallDestroyed event
        Matter.Events.on(game.engine, "ballDestroyed", (event) => {
            captureCount += 1;
            this.RemovePuck(event.bod);
            game.timer.addTime(2500);
            
            if(captureCount >= this.puckCount) {                
                game.states["play"] = new playState();
                game.setState("play");
                captureCount = 0;
                game.timer.addTime(5000);
                game.level += 1;
            }
            
            // Edit dom
            document.getElementById("nCaptured").innerHTML = captureCount;
            document.getElementById("cLevel").innerHTML = game.level;
            
        });
    }
    
    unload() {
        
    }
    
    // Perform Logic
    update() {
        // Sync the representation with the physics
        for (var i = 0; i < this.objects.length; i++) {
            if(this.objects[i] == undefined || !this.objects[i].alive) { continue; }
            if(this.objects[i].sprite != null) {
                this.objects[i].sync();
            }
        }
        
        var time = ((game.timer.checkTime())/1000).toFixed(2);
//        var time = ((playTime - game.engine.timing.timestamp)/1000).toFixed(2);
        this.text.text = time;
        
        if(time == 0) {
            this.level = 0;
            game.setState("menu");
            dataSave("rnd", game.level, playername);
        }
        
    }
    
    // Perform rendering
    render() {
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i] == undefined) { continue; }
            // Set the fill color
            this.graphics.beginFill(0xe74c3c); // Red
            
            this.graphics.drawCircle(this.objects[i].body.position.x, this.objects[i].body.position.y, this.objects[i].body.speed + this.objects[i].body.circleRadius); // drawCircle(x, y, radius)
            
            // Applies fill to lines and shapes since the last call to beginFill.
            this.graphics.endFill();
        }
        
        for(var j = 0; j < this.walls.length; j++) {            
            this.graphics.beginFill(this.walls[j].c); // blue
            this.graphics.drawRoundedRect (this.walls[j].x, this.walls[j].y, this.walls[j].w, this.walls[j].h, 10);
            this.graphics.endFill();
        }
        
        if(drawTargetingLine) {
            var mousePos = game.getMousePosition();
            
            drawLine(this.graphics, mousePos.x, mousePos.y, mGrab.x, mGrab.y, 0xe7a23c);
        }
    }
    
    CreateWall(x, y, w, h, c = 0xf1f1f1) {
        var someBlock = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true });
        var nGraphic = {x: x - w/2,
                   y: y - h/2,
                   w: w,
                   h: h,
                   c: c};
        
        this.bodies.push(someBlock);
        this.walls.push(nGraphic);   
    }
    
    RemovePuck(gobj) {
        // FInd index of object in objects array
        var index;
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i] == undefined) { continue; }
            if(gobj == this.objects[i].body) {
                index = i;
                break;
            }
        }
        
        // find index of object.body in the bodies array
        var bodyIndex;
        for(var j = 0; j < this.bodies.length; j++) {
            if(this.bodies[j] == undefined) { continue; }
            if(this.objects[index].body == this.bodies[j]) {
                bodyIndex = j;
                break;
            }
        }
        
        // Remove body from world simulation
        Matter.World.remove(game.engine.world, this.objects[index].body);
        
        // Remove body from array of bodies
        this.bodies.splice(bodyIndex, 1);
        
        // Remove Sprite
        this.stage.removeChild(this.objects[index].sprite);
        
        // Remove Game Object (i.e set it to dead)
        this.objects[index].alive = false;
    }
}