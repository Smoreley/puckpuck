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
    
    onButtonDown() {
        mGrab = game.getMousePosition();
        
        drawTargetingLine = true;
    }
    
    onButtonUp(snt) {
        mLetGo = game.getMousePosition();

        var fV = Matter.Vector.normalise(Matter.Vector.sub(mGrab, mLetGo));    
        var f = Matter.Vector.create(fV.x/50, fV.y/50);
        Matter.Body.applyForce(snt, snt.position, f);
        
        launchCount += 1;
        document.getElementById("nShots").innerHTML = launchCount;
        
        drawTargetingLine = false;
    }
    
}
