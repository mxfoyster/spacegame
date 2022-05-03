//
// All the logic for firing the projectiles from our ship goes in here
//
const arsenal = document.getElementById("arsenal");

const projectileStartY = 75 + (screen.height * 0.05);
let lastYpos = projectileStartY;
let numOfProjectiles = 6;
let numberCurrentlyFiring = 0;
let projectileFiringGap = (screen.height - projectileStartY) / numOfProjectiles;

//our projectile object
let projectileObj = {
    missileFiring: false,
    missileYpos: projectileStartY,
    missileXpos: (screen.width / 2) - 5,
    missileHandle: null,
};

//set up an array of projectile objects
const projectiles = []; 
for (i = 0; i < numOfProjectiles; i++)
    projectiles.push ({...projectileObj}); //copy into array using object literals {...Object}

//set up the projectile images 
for (i = 0; i < numOfProjectiles; i++){
    let imageString = "<img src=\"images/projectile.png\" class=\"projectiles\" id=\"projectile" + i + "\"/>\n";
    arsenal.innerHTML+= imageString;
}
//and assign handles to them into array (not very DRY but when I combine these, 
//DOM doesn't update even though style properties DO chamge!!!)
for (i = 0; i < numOfProjectiles; i++){
    let projectileHandleName = "projectile" + i;
    projectiles[i].missileHandle = document.getElementById(projectileHandleName);
}

//called on fire pressed
function SetFiring()
{
    //if this is the only currently active firing instance, 
    //trigger the flag in our first projectile and leave
    if (numberCurrentlyFiring == 0){
        numberCurrentlyFiring = 1;
        projectiles[0].missileFiring = true;
        projectiles[0].missileHandle.style.visibility = "visible";
        //console.log(projectiles[0].missileHandle.style.bottom);
        return;
    }

    //otherwise we call our iteration function to check the rest
    projectiles.forEach(FireProjectiles)
}

//loop called from our SetFiring() fuction
function FireProjectiles(thisProjectile, index, projectiles) {
    //if this one is firing, store the y location
    
    if (thisProjectile.missileFiring == true) lastYpos = thisProjectile.missileYpos;
    //otherwise, we have a previous y location so if gap big enough, trigger the next one and leave
    else if (lastYpos > (thisProjectile.missileYpos + projectileFiringGap)){   
        numberCurrentlyFiring += 1;
        thisProjectile.missileFiring = true;
        thisProjectile.missileHandle.style.visibility = "visible";
        lastYpos=thisProjectile.missileYpos;
        return
    }
}

//positions the current projectiles
function PositionProjectiles(thisProjectile, index, projectiles) {
    //if it's not firing, update the x position as we move
    if (thisProjectile.missileFiring == false) {
        thisProjectile.missileXpos = parseInt(ship.style.left) + 32;
        thisProjectile.missileHandle.style.left = thisProjectile.missileXpos + "px";;
    }
    //if it is AND it's not reached the top, move it upwards
    else{
        if (thisProjectile.missileYpos < screen.height){
            thisProjectile.missileYpos +=1;
            thisProjectile.missileHandle.style.bottom = thisProjectile.missileYpos + "px";
            }
        //otherwise, it's at the top, so reset it
        else {
            thisProjectile.missileFiring = false;
            thisProjectile.missileYpos = projectileStartY;
            thisProjectile.missileHandle.style.visibility="hidden";
            thisProjectile.missileHandle.style.left = parseInt(ship.style.left) + 32 + "px";
            numberCurrentlyFiring -=1;
        }
    }
}