var target;

function init() {
    // create a Matter.js engine
    var engine = Matter.Engine.create();

    // Ground rectangle
    var ground = Matter.Bodies.rectangle(400, 500, 810, 60, { isStatic: true });
    var wall = Matter.Bodies.rectangle(10, 500, 10, 400, { isStatic: true });
    target =  Matter.Bodies.circle(400, 200, 60, { isSensor: true, isStatic: true});
    
    var bodies = [];
    Matter.Body.rotate(ground, 3.14/1.1);
    bodies.push(ground);
    bodies.push(wall);
    bodies.push(target);

    var renderer = PIXI.autoDetectRenderer(800, 600);
    renderer.backgroundColor = 0xF1F1F1;
    var stage = new PIXI.Container();
    document.getElementById("game-canvas").appendChild(renderer.view);

    var texture = PIXI.Texture.fromImage('./bin/imgs/cirtest.png');
    
    var bunnies = [];
    
    // Categories are defined as bit fields
    var defaultCategory = 0x0001;
    var interactableCategory = 0x0002;
    var noninteractableCategory = 0x0004;
    
    
//    var catipult = Matter.Bodies.rectangle(195, 300, 815, 50, { isStatic: true, render: { visible: true } }),
//    rockOptions = { density: 0.004, render: { sprite: { texture: './bin/imgs/cirtest.png', height: 100 } } },
//    rock = Matter.Bodies.polygon(170, 250, 8, 20, rockOptions),
//    anchor = { x: 170, y: 450 },
//    elastic = Matter.Constraint.create({ 
//        pointA: anchor, 
//        bodyB: rock, 
//        stiffness: 0.05, 
//        render: { 
//            lineWidth: 5, 
//            strokeStyle: '#dfa417' 
//        } 
//    });
//    bodies.push(catipult);
//    
//    Matter.Events.on(engine, 'afterUpdate', function() {
//            if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
//                rock = Matter.Bodies.polygon(170, 450, 7, 20, rockOptions);
//                Matter.World.add(engine.world, rock);
//                elastic.bodyB = rock;
//            }
//        });
//    
        
    // Mouse Drag
    var mouseConstraint = Matter.MouseConstraint.create(engine);
    // red category objects should not be draggable with the mouse
    mouseConstraint.collisionFilter.mask = interactableCategory;
    Matter.World.add(engine.world, mouseConstraint);
    
    
    Matter.Events.on(engine, 'collisionStart', function(event) {
     var pairs = event.pairs;
//        console.log("Something is happening "+ pairs);
     // do something with the pairs that have started collision
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            
            if (pair.bodyA.id === target.id) {
                pair.bodyA.render.strokeStyle = '#00ff00';
                Matter.Body.scale(pair.bodyB, 1.1,1.1);
                
                
                console.log(pair.bodyB.circleRadius);
            } else if (pair.bodyB.id === target.id) {
                pair.bodyB.render.strokeStyle = '#00ff00';
            }
            
            if(pair.bodyB.id == 10) {
//                console.log(pair.bodyB);
                
//                pair.bodyB.render.strokeStyle = "#2121f1";
//                pair.bodyA.render.strokeStyle = "#2121f1";
                var mvec = Matter.Vector.create(250,250);
                Matter.Body.setPosition(pair.bodyB, mvec);
                Matter.Body.setVelocity(pair.bodyB, Matter.Vector.create(0,0));
            }
//            pair.bodyB.render.fillStyle = '#bbbbbb';
        }
    });
    
    // Collision exit
    Matter.Events.on(engine, 'collisionEnd', function(event) {
        var pairs = event.pairs;        
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            if (pair.bodyA.id === target.id) {
                pair.bodyA.render.strokeStyle = '#000000';
            } else if (pair.bodyB.id === target.id) {
                pair.bodyB.render.strokeStyle = '#000000';
            }
        }
    });

//     create a renderer (WIREFRAME ONE for debugging)
    var render = Matter.Render.create({
        element: document.body,
        engine: engine
    });
    
    render.options.wireframes = false;

    function SpriteObject() {
        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // Sprite Size
        bunny.height = 32;
        bunny.width = 32;

        // center the sprite's anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        stage.addChild(bunny);
        return bunny;
    };

    function PhysicsObject() {
        // create two boxes and a ground
        var x, y, scale;
        x = (Math.random() * 800) + 1;
        y = (Math.random() * 300) + 1;
        scale = (Math.random() * 10) + 10;
    //	var box = Matter.Bodies.rectangle(x, y, scale, scale);
        
        var circle = Matter.Bodies.circle(x,y, scale, {
                collisionFilter: {
                    category: interactableCategory,
                    mask: defaultCategory | interactableCategory
                },
                render: {
                    strokeStyle: '#f00121',
                    fillStyle: 'transparent'
                }
        });
        circle.label = "Circle "+bodies.length;

        bodies.push(circle);
        return circle;
    };

    var createBunny = function() {
        return {
            sprite: new SpriteObject(),
            body: new PhysicsObject()
        };
    };


    for(var i=0; i < 10; i++) {
        bunnies.push(createBunny());
    }
    
    // start animating
    animate();
    function animate() {
        requestAnimationFrame(animate);

        for(var b in bunnies) {
            bunnies[b].sprite.position = bunnies[b].body.position;
            bunnies[b].sprite.rotation = bunnies[b].body.angle;
            bunnies[b].sprite.height = bunnies[b].body.circleRadius * 2;
            bunnies[b].sprite.width = bunnies[b].body.circleRadius * 2;
        }

        // render the container
        renderer.render(stage);
    }

    // add all of the bodies to the world
    Matter.World.add(engine.world, bodies);
    
    // run the engine
    Matter.Engine.run(engine);

        // run the renderer
    Matter.Render.run(render);
}