function OverlapSanityCheck(pOne, pTwo, minD = 1) {
    var vx = pOne.x - pTwo.x;
    var vy = pOne.y - pTwo.y;
    
    var dist = Math.sqrt((vx*vx)+(vy*vy));
    
    return (dist > minD) ? true : false;  
}