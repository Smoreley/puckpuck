class menuState extends state {    
    setup() {
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);
        
        game.selectedColor = game.randColors[Math.floor(Math.random() * game.randColors.length)];
        
        this.titleText = CreateText(GAME_WIDTH/2, 128, "PuckPuck", 128);
        this.scoreText = CreateText(GAME_WIDTH/2, GAME_HEIGHT - 128, "BestScore: 00", 32);
        this.prevScoreText = CreateText(GAME_WIDTH/2, GAME_HEIGHT - 64, "Previous: 00", 32);
        
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
        
        this.stage.addChild(this.titleText);
        this.stage.addChild(this.scoreText);
        this.stage.addChild(this.prevScoreText);
        this.stage.addChild(this.spiralSprite);
        
        this.pulseScale = 0;
        this.pulseMax = 128;
        this.rotationSpeed = .1;
    }
    
    load() {
        this.scoreText.text = "Highest Level: "+highestLevel;
        this.prevScoreText.text = "Previous: "+lastGameLevelCount;
    }
    
    unload() {
        
    }
    
    // Perform Logic
    update() {                

    }
    
    // Perform rendering
    render() {        
        this.pulseScale = (Math.sin(game.engine.timing.timestamp/2000)*((this.pulseMax-20)/2)+(this.pulseMax/2));
        this.spiralSprite.rotation += this.rotationSpeed;
        
        if(this.spiralSprite.isOver) {
            this.spiralColor = game.selectedColor;
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
    game.level = 1;
    game.states["play"] = new playState();
    Matter.Events.trigger(game, "changeState", {newState: "play"});
//    game.setState("play");
}

function onButtonOver()
{
    this.isOver = true;
}

function onButtonOut()
{
    this.isOver = false;
}

function CreateText(x, y, text, size) {
    var pixiText =  new PIXI.Text(text,{fontFamily : 'Aref Ruqaa', fontSize: size, fill : 0xf1f1f1, align : 'center'});
    
    pixiText.anchor.x = 0.5;
    pixiText.anchor.y = 0.5;
    
    pixiText.x = x;
    pixiText.y = y;
    return pixiText;
}