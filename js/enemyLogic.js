//
// All our logic associated with the enemy ships in this file
// This included it's own 'update' loop. We can play with the timing
// of this later according to level to alter enemy speed etc
//
const enemies = document.getElementById("enemies");
const middle = (screen.width / 2);
const numEnemies = 3;
const screenHeight = screen.height * 0.9; // See our css, we only use 90% of the height really
const enemyXwidth = 69;
const enemyYwidth = 45;
let enemyShipMinHeight = 10;
//render enemies html
for(i = 0; i < numEnemies; i++) {
    enemies.innerHTML+="<img src=\"images/enemy" + (i+1) + ".png\" class=\"enemyShips\" id=\"enemy" + i + "\"/>";
}

//we'll be using this soon
let enemyObj = {
    enemyFiring: false,
    enemyYpos: enemyShipMinHeight,
    enemyXpos: middle - 5,
    enemyHandle: null,
    enemyAlive: true,
};

const enemyArr = [];
for (i = 0; i < numEnemies; i++)
    enemyArr.push ({...enemyObj}); //copy into array using object literals {...Object}

//assign handles for enemies (separately as explained earlier)
for(i = 0; i < numEnemies; i++) {
    enemyString = "enemy" + i;
    enemyArr[i].enemyHandle = document.getElementById(enemyString); //directly into array for now
    enemyArr[i].enemyXpos = xPos + (100 * (i));
    //enemyArr[i].enemyYpos = document.getElementById(enemyString).style.top;
}
  

//move our enemies every 1/2 second in it's own update loop
setInterval(MoveEnemies,500);
let epos=enemyArr[0].enemyXpos;

function MoveEnemies(){
    //we calculate for the middle enemy and move them ALL relative to that 
    //to ensure the gap between  them doesn't get messed up each time we 
    //change direction underneath them (alternate across 0 diff)
    let thisEnemyXpos = enemyArr[1].enemyXpos;
    let diff = xPos - thisEnemyXpos;
    //enemyArr[1].enemyYpos =  parseInt(enemyArr[1].enemyHandle.style.bottom)
    enemyShipMinHeight = enemyArr[1].enemyYpos;

    for(i = 0; i < numEnemies; i++) {
        let thisEnemyElement = enemyArr[i];
        let thisEnemyXpos = thisEnemyElement.enemyXpos;
        let thisEnemyYpos = thisEnemyElement.enemyYpos;
        thisEnemyElement.enemyHandle.style.left = thisEnemyXpos + "px"; 
        thisEnemyElement.enemyXpos += (diff/10);
        //thisEnemyElement.enemyYpos = thisEnemyElement.enemyHandle.style.top;
    }   
    scoreHandle.innerHTML = score; //here because this is fast enough to update score
}

//note +10 in if, temp corerection factor
function CheckHitToEnemy(thisProjectile, index, projectiles){
    if (!thisProjectile.missileFiring || thisProjectile.missileYpos < (screenHeight - (enemyShipMinHeight + 10))) return;  //nothing to detect, so we can leave
    
    for (i = 0; i < numEnemies; i++){
        let thisEnemyYpos = enemyArr[i].enemyYpos;
        let thisEnemyXpos = enemyArr[i].enemyXpos;
        if (thisProjectile.missileXpos >= thisEnemyXpos && thisProjectile.missileXpos <= (thisEnemyXpos + enemyXwidth) && enemyArr[i].enemyAlive)
           enemyHit(i);
    }

}

function enemyHit(enemyIndex){
    console.log("Hit " + enemyIndex);
    enemyArr[i].enemyAlive = false;
    enemyArr[i].enemyHandle.style.visibility = "hidden";
    score += 10;
}
