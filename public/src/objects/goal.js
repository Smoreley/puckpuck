class Goal extends GameObject {
    setup(x, y) {
        this.alive = true;
        this.body = Matter.Bodies.circle(x, y, 50, { isSensor: true, isStatic: true});
        
        this.sprite = SpriteObject(this.body.circleRadius, this.body.circleRadius, './bin/imgs/goal.png');
    }
    
    sync() {
        this.sprite.position = this.body.position;
        this.sprite.rotation += .095;
    }
    
    initializeEvents() {
        // Collision Enter
        Matter.Events.on(game.engine, 'collisionStart', (event) =>  {
            var pairs = event.pairs;
            // do something with the pairs that have started collision
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                
                game.state.graphics.beginFill(0x323232); // white
                game.state.graphics.drawCircle(pair.bodyA.position.x, pair.bodyA.position.y, 50);
                game.state.graphics.endFill();
                
                // If target was added before or after other bodies then the
                // triggered collision will be different
                if (pair.bodyA.id === targetGoal.body.id) {
                    Matter.Events.trigger(game.engine, "ballDestroyed", {bod:pair.bodyB});
                } else if (pair.bodyB.id === targetGoal.body.id) {
                    Matter.Events.trigger(game.engine, "ballDestroyed", {bod:pair.bodyA});
                }
            }
        });
    
        // Collision Exit
//        Matter.Events.on(game.engine, 'collisionEnd', function(event) {
//            var pairs = event.pairs;        
//            for (var i = 0; i < pairs.length; i++) {
//                var pair = pairs[i];
//
//                if (pair.bodyA.id === targetGoal.body.id) {
//                    console.log("exited the goal")
//                } else if (pair.bodyB.id === targetGoal.body.id) {
//                    console.log("exited the goal")
//                }
//            }
//        });
    }    
}