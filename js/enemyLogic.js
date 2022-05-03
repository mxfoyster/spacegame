//
// All our logic associated with the enemy ships in this file
// This included it's own 'update' loop. We can play with the timing
// of this later according to level to alter enemy speed etc
//
const enemies = document.getElementById("enemies");

//render enemies html
for(i = 0; i < 3; i++) {
    enemies.innerHTML+="<img src=\"images/enemy" + (i+1) + ".png\" class=\"enemyShips\" id=\"enemy" + i + "\"/>";
}

//we'll be using this soon
let enemyObj = {
    enemyFiring: false,
    enemyYpos: projectileStartY,
    enemyXpos: (screen.width / 2) - 5,
    enemyHandle: null,
};

const enemyArr = [];

//assign handles for enemies (separately as explained earlier)
for(i = 0; i < 3; i++) {
    enemyString = "enemy" + i;
    enemyArr.push(document.getElementById(enemyString)); //directly into array for now
    enemyArr[i].style.left = xPos + (100 * (i)) + "px"; //temp starting position
}  

//move our enemies every 1/2 second in it's own update loop
setInterval(MoveEnemies,500);

function MoveEnemies(){
    for(i = 0; i < 3; i++) {
       // enemyArr[i].style.left = parseInt(enemyArr[i].style.left) + 50 + "px"; //temp starting position
    }   
}

