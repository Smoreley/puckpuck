class menuState extends state {    
    setup() {
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);
        
        this.text = new PIXI.Text('PuckPuck',{fontFamily : 'Nova Script', fontSize: 64, fill : 0xf1f1f1, align : 'center'});
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.x = GAME_WIDTH/2;
        this.text.y = 64;
        
        this.scoreText = new PIXI.Text('BestScore: 00',{fontFamily : 'Nova Script', fontSize: 32, fill : 0xf1f1f1, align : 'center'});
        
        this.scoreText.anchor.x = 0.5;
        this.scoreText.anchor.y = 0.5;
        this.scoreText.x = GAME_WIDTH/2;
        this.scoreText.y = GAME_HEIGHT - 64;
        
        // Create texture
        this.spiralTexture = PIXI.Texture.fromImage('bin/imgs/goal.png');
        
        // Create sprite
        this.spiralSprite = new PIXI.Sprite(this.spiralTexture);
        this.spiralSprite.anchor.x = 0.5;
        this.spiralSprite.anchor.y = 0.5;
        this.spiralSprite.x = GAME_WIDTH/2;
        this.spiralSprite.y = GAME_HEIGHT/2;
        this.spiralSprite.height = 256;
        this.spiralSprite.width = 256;
        
        this.spiralSprite.buttonMode = true;
        
        // Make sprite interactive
        this.spiralSprite.interactive = true;
        
        // Mouse detection
        this.spiralSprite.on('mousedown', onButtonDown);
        this.spiralSprite.on('mouseover', onButtonOver);
        this.spiralSprite.on('mouseout', onButtonOut);
        
        this.stage.addChild(this.text);
        this.stage.addChild(this.scoreText);
        this.stage.addChild(this.spiralSprite);
        
        this.pulseScale = 0;
        this.pulseMax = 128;
        this.spiralColor = 0xf1f1f1;
        this.rotationSpeed = .1;
    }
    
    load() {
        console.log(game.engine.timing);
        
    }
    
    unload() {
        
    }
    
    // Perform Logic
    update() {                
        this.pulseScale = (Math.sin(game.engine.timing.timestamp/2000)*((this.pulseMax-20)/2)+(this.pulseMax/2));
        this.spiralSprite.rotation += this.rotationSpeed;
    }
    
    // Perform rendering
    render() {
        
        if(this.spiralSprite.isOver) {
            this.spiralColor = 0x3c82e7;
            this.rotationSpeed = 0.12;
        } else {
            this.spiralColor = 0xf1f1f1;
            this.rotationSpeed = 0.01;
        }
        
        this.graphics.beginFill(this.spiralColor); // white
        if(this.pulseScale > 0.1) // Dont draw is to small
            this.graphics.drawCircle(GAME_WIDTH/2, GAME_HEIGHT/2, this.pulseScale);
        this.graphics.endFill();
    }
}

function onButtonDown() {
    game.timer = new Timer();
    game.level = 0;
    game.states["play"] = new playState();
    game.setState("play");
}

function onButtonOver()
{
    this.isOver = true;
}

function onButtonOut()
{
    this.isOver = false;
}


// on stateLoad
//
//Matter.Events.on(game, "render", function(event) {
//});

//
//        Matter.Events.on(game, "setState", function(event) {
//            alert("They did it "+ event);
//            console.log(event);
//        });
//        
//        // triggers event
//        Matter.Events.trigger(game, "setState", {test:"testing"});