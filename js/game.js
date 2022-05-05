//
// Just our ship and key detection goes here
// Along with our main 'update' style loop 
//
document.addEventListener("keydown", function(e){KeyDownInput(e)});
document.addEventListener("keyup", function(e){KeyUpInput(e)});
const ship = document.getElementById("ship");
const scoreHandle = document.getElementById("score");
let score = 0;

//set up our start values
let xPos = (screen.width/2);

//position the ship
ship.style.left = xPos + "px"; 

//now our object for simultaneous keys detection
let keys = {
    left: false,
    right: false,
    fire: false,
  };

//Call our main loop every millisecond
setInterval(MainLoop,1); 

//main loop (our Update loop called in theory once every ms though in practice will be slower)
function MainLoop(){
    if (keys.fire) SetFiring(); //firing logic
    
    //projectile moevement logic
    if (typeof projectiles !== "undefined")projectiles.forEach(PositionProjectiles); 
    
    //ship movement logic
    //*** TO DO *** Implement time per iteration based movement 
    //distance to account for different speed systems
    if (keys.left) 
        if (xPos > 40) xPos -=1;

    if (keys.right)
        if (xPos < (screen.width - 100))xPos +=1;
    
    //update ship position
    ship.style.left = xPos + "px";
    
    //we hit enemy check
    projectiles.forEach(CheckHitToEnemy);
}//end of main (Update) loop


//detects a keyboard key is down and sets appropriate 'key' in keys object true
function KeyDownInput(event){
   
    switch (event.key){
    case "ArrowLeft":
        keys.left = true;
        break;
    case "ArrowRight":
        keys.right = true;
        break;
    case " ":
        keys.fire = true;
        break;
    }
   
}

//the exact reverse for key up.
function KeyUpInput(event)
{
    switch (event.key){
        case "ArrowLeft":
            keys.left = false;
            break;
        case "ArrowRight":
            keys.right = false;
            break;
        case " ":
            keys.fire = false;
            break;
    }
}
