document.addEventListener("keydown", function(e){KeyDownInput(e)});
document.addEventListener("keyup", function(e){KeyUpInput(e)});
const ship = document.getElementById("ship");
const projectile = document.getElementById("projectile");

//set up our start values
let xPos = (screen.width/2);
let firing = false;
let projectileYpos = 75 + (screen.height * 0.05);
const projectileStartY = projectileYpos;
let projectileXpos = (screen.width / 2);
let numOfProjectiles = 3;

//position the ship and the projectile
projectile.style.left = parseInt(ship.style.left) + 32 + "px"; 
ship.style.left = xPos + "px"; 


//now our object for simultaneous keys detection
let keys = {
    left: false,
    right: false,
    fire: false,
  };

let projectileObj = {
    missileFiring: false,
    missileYpos: projectileStartY,
};

//set up an array of projectile objects
const projectiles = []; 
for (i = 0; i < numOfProjectiles; i++)
    projectiles.push ({...projectileObj}); //copy into array using object literals {...Object}

//we can go back soon and use the above to allow a set multiple of simultaneous shots

//Call our main loop every millisecond
setInterval(MainLoop,1); 

//main loop (our Update loop called in theory once every ms though in practice will be slower)
function MainLoop(){
    if (keys.fire) 
        firing = true;

    if (firing) {
        projectile.style.visibility = "visible";
        projectile.style.bottom = projectileYpos + "px";
        projectileYpos+=3;
        if (projectileYpos > screen.height){ //projectile reaches the top of the screen
            firing = false;
            projectileYpos= projectileStartY;
            projectile.style.visibility = "hidden";
            projectile.style.left = parseInt(ship.style.left) + 32 + "px"; //update position here else on repeat it won't move with ship
        }
    }
    else{
        projectile.style.left = parseInt(ship.style.left) + 32 + "px"; 
    }

    //ship movement logic
    //*** TO DO *** Implement time per iteration based movement 
    //distance to account for different speed systems
    if (keys.left) 
        if (xPos > 40) xPos -=1;

    if (keys.right)
        if (xPos < (screen.width - 100))xPos +=1;
    
    //update ship position
    ship.style.left = xPos + "px"; 
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