var lerpTime = 1;
var dir = 1;
var lerpSpeed = 0.1;

function screenWipe(g, t, lerpIn) {
    lerpTime = (lerpTime+lerpSpeed*dir)%220;
    if(lerpIn) {
        dir = -1;
        lerpSpeed = 0.05;
        if(lerpTime <= 0) {
            // IF DONE then trigger event
            lerpTime = 0;
            Matter.Events.trigger(game, 'transition');
            return;
        }
    } else {
        // LERPING IN (covering)
        if(lerpTime < 0) {
            lerpTime = 0;
        }
        
        dir = 1;
        lerpSpeed = 0.05;
        if(lerpTime >= 1) {
            lerpTime = 1;
                // IF DONE then trigger event
            Matter.Events.trigger(game, 'transition');
        }
    }
        
    g.beginFill(0xf1f1f1);

    var xNum = 15;
    var yNum = 15;
    var xInterval = GAME_WIDTH/(xNum-2);
    var yInterval = GAME_HEIGHT/(yNum-2);
    var maxSize = 120;

    for(var i = 0; i < xNum; i++) {            
        for(var j = 0; j < yNum; j++) {
            var scale = Math.sin(lerpTime)*maxSize+(i*i*lerpTime);
            
            if(scale <= 0) continue;

            g.drawCircle(
                (xInterval/4)+((xInterval/2)*(j%2))+(i * xInterval)-xInterval,
                yInterval/2+(j * yInterval) - yInterval,
                scale/2);

//            g.drawRect(
//                (xInterval/4)+((xInterval/2)*(j%2))+(i * xInterval)- xInterval - scale/2,
//                yInterval/2+(j * yInterval) - yInterval - scale/2,
//                scale, scale
//            );
        }
    }
    g.endFill();
}