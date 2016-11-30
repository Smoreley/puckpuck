class GameObject {
    constructor(x = 0, y = 0, r = 1) {
        this.body = PhysicsCircle(x, y, r);
        this.sprite = null;  
        
        this.setup(x, y);
    }
    
    setup() {
        console.log("setting up gameobject");
    }
    
    sync() {
        this.sprite.position = this.body.position;
        this.sprite.rotation = this.body.angle;
    }
    
    // Set stuff
    setCollision(cat = 0x0001, mask = 0x0001) {
        this.body.collisionFilter.category = cat;
        this.body.collisionFilter.mask = mask;
    }
    
    setPosition(x = 0, y = 0) {
        Matter.Body.setPosition(this.body, Matter.Vector.create(x,y));
    }
    
    setSprite(img, w, h) {
        var texture = PIXI.Texture.fromImage(img);
        var spr = new PIXI.Sprite(texture);
        
        // Sprite Size
        spr.height = h;
        spr.width = w;
        
        // Set anchor point to center of sprite
        spr.anchor.x = 0.5;
        spr.anchor.y = 0.5;
        
        this.sprite = spr;
    }
}

function SpriteObject(h = 1, w = 1, img) {
    var texture = PIXI.Texture.fromImage(img);
    var spr = new PIXI.Sprite(texture);
    
    // Sprite Size
    spr.height = h * 2;
    spr.width = w * 2;
    
    // Set anchor point to center of sprite
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    
    return spr;
}

// Physical Creation for circle
function PhysicsCircle (pX = 0, pY = 0, radius = 1) {
    return Matter.Bodies.circle(pX, pY, radius, { restitution: 1.0 });
}

function PhysicsBox(x = 0, y = 0, w = 1, h = 1) {
    var wall = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true });
    return wall;
}