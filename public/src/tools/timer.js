class Timer {
    constructor() {        
        this.diff = 20 * 1000;
        this.startTime = game.engine.timing.timestamp + this.diff;
    }
    
    checkTime() {
        var rtnVal = this.startTime - game.engine.timing.timestamp;
        return (rtnVal > 0) ? rtnVal : 0;
    }
    
    addTime(amnt) {
        this.diff += amnt;
        this.startTime += amnt;
    }
    
}