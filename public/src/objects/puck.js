class Puck extends GameObject {
    setup(x, y) {
        this.alive = true;
        this.sprite = SpriteObject(this.body.circleRadius, this.body.circleRadius, './bin/imgs/cirtest.png');   
        this.sprite.interactive = true;
        
        this.sprite
            .on('mousedown',        this.onButtonDown)
            .on('mouseup',          () => {this.onButtonUp(this.body)})
            .on('mouseupoutside',   () => {this.onButtonUp(this.body)})
            .on('touchstart',       this.onButtonDown)
            .on('touchend',         () => {this.onButtonUp(this.body)})
            .on('touchendoutside',  () => {this.onButtonUp(this.body)});   
    }
    
    initializeEvents() {    
        // Collision Exit
        Matter.Events.on(game.engine, 'collisionEnd', function(event) {
            var pairs = event.pairs;        
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];

                if (pair.bodyA.label === "pck-" && pair.bodyB.label === "breakable") {
                    // remove bodyB
                    Matter.World.remove(game.engine.world, pair.bodyB);
                    pair.bodyB.refGraph.x = 9000;
                } else if (pair.bodyB.id === targetGoal.body.id) {
//                    Matter.Events.trigger(game.engine, "ballDestroyed", {bod:pair.bodyA});
                }
            }
        });
    }  
    
    onButtonDown() {
        mGrab = game.getMousePosition();
        
        drawTargetingLine = true;
    }
    
    onButtonUp(snt) {
        mLetGo = game.getMousePosition();

        var fV = Matter.Vector.normalise(Matter.Vector.sub(mGrab, mLetGo));         
        var slowDown = 50;    
        var f = Matter.Vector.create(fV.x/slowDown, fV.y/slowDown);
        Matter.Body.applyForce(snt, snt.position, f);
        
        launchCount += 1;
        document.getElementById("nShots").innerHTML = launchCount;
        
        drawTargetingLine = false;
    }
    
}
