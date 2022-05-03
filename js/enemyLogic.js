//
// All our logic associated with the enemy ships in this file
// This included it's own 'update' loop. We can play with the timing
// of this later according to level to alter enemy speed etc
//
const enemies = document.getElementById("enemies");
const middle = (screen.width / 2);
const numEnemies = 3;
let enemyShipMinHeight = 10;
//render enemies html
for(i = 0; i < numEnemies; i++) {
    enemies.innerHTML+="<img src=\"images/enemy" + (i+1) + ".png\" class=\"enemyShips\" id=\"enemy" + i + "\"/>";
}

//we'll be using this soon
let enemyObj = {
    enemyFiring: false,
    enemyYpos: projectileStartY,
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
    enemyArr[1].enemyYpos =  parseInt(enemyArr[1].enemyHandle.style.bottom)
    enemyShipMinHeight = enemyArr[1].enemyYpos - 10;

    for(i = 0; i < numEnemies; i++) {
        let thisEnemyXpos = enemyArr[i].enemyXpos;
        enemyArr[i].enemyHandle.style.left = thisEnemyXpos + "px"; 
        enemyArr[i].enemyXpos += (diff/10);
     
    }   
}

function CheckHitToEnemy(thisProjectile, index, projectiles){
    if (!thisProjectile.missileFiring || thisProjectile.missileYpos < enemyShipMinHeight) return;  //nothing to detect, so we can leave
    //if (project)

    console.log(enemyArr[1].enemyHandle.style.top);
}