class Goal extends GameObject {
    setup(x, y) {
        this.body = Matter.Bodies.circle(x, y, 30, { isSensor: true, isStatic: true});
        
        this.sprite = new SpriteObject(this.body.circleRadius, this.body.circleRadius, './bin/imgs/goal.png');
        
        this.initializeGoalCheck();   
    }
    
    initializeGoalCheck() {
        // Collision Enter
        Matter.Events.on(game.engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            // do something with the pairs that have started collision
            
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                
                // If target was added before or after other bodies then the
                // triggered collision will be different
                if (pair.bodyA.id === targetGoal.body.id) {
                    alert("You Win! "+ targetGoal.body.id);
                } else if (pair.bodyB.id === targetGoal.body.id) {
                    alert("You Win!");
                }
            }
        });
    
        // Collision Exit
        Matter.Events.on(game.engine, 'collisionEnd', function(event) {
            var pairs = event.pairs;        
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];

                if (pair.bodyA.id === targetGoal.body.id) {
                    console.log("exited the goal")
                } else if (pair.bodyB.id === targetGoal.body.id) {
                    console.log("exited the goal")
                }
            }
        });
    }
    
}