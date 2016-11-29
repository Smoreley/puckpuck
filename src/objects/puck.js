class Puck extends GameObject {
    setup() {
        
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
        var mousePosition = game.renderer.plugins.interaction.mouse.global;
        mGrab = Matter.Vector.create(mousePosition.x, mousePosition.y); 
    }
    
    onButtonUp(snt) {
        var mousePosition = game.renderer.plugins.interaction.mouse.global;
        mLetGo = Matter.Vector.create(mousePosition.x, mousePosition.y);    

        var fV = Matter.Vector.normalise(Matter.Vector.sub(mGrab, mLetGo));    
        var f = Matter.Vector.create(fV.x/50, fV.y/50);
        Matter.Body.applyForce(snt, snt.position, f);
    }
    
}
