const bot1 = document.getElementById('bot1');

//Variabili primarie
const vitaBot1Element = document.getElementById('vita_bot1');
const PwUP = document.getElementById('PwUP');
let vitaBot1 = parseInt(vitaBot1Element.value);
let player = document.getElementById('player');

//Variabili di impostazioni
let closestDistance = 100; // Raggio di ricerca

//Variabili funzionali
const botRect = bot1.getBoundingClientRect();
let closestElementId;


//Calcola la distanza tra i 2 elementi in argomento
function getDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy);
}


function Start() {

  //1: Cerca nel raggio di 100px
  if (player || PwUP) {
    //closestElementId = null;
  }

  //2: Rileva Power-up
  if (PwUP) {
    const pwupRect = PwUP.getBoundingClientRect();
    const distance = getDistance(botRect, pwupRect);
    
    if (distance <= 100 && distance < closestDistance) {
      closestElementId = PwUP.id;
      closestDistance = distance;
    }
  }
  
  //3: Rileva Player
  if (player) {
    const playerRect = player.getBoundingClientRect();
    const distance = getDistance(botRect, playerRect);
    
    if (distance <= 100 && distance < closestDistance) {
      closestElementId = player.id;
      closestDistance = distance;
    }
  }
  
  
  if (closestElementId) { // if (var1)... Serve a verificare che la var sia != da null;
    console.log("ID di elemento più vicino:", closestElementId);
    if (closestElementId === 'player') {
      approachPlayer();
    } else if (closestElementId === 'PwUP') {
      approachPwUP();
    } else {
      console.error("L'elemento rilevato non è stato riconosciuto.");
    }
  } else {
    //4: Non rileva Power-up && Non rileva player
    RandomRestart();
  }
  
  //return ("ID di elemento più vicino:" + closestElementId);
}


// Funzione per avvicinarsi al Player
function approachPlayer() {

}


// Funzione per avvicinarsi al Power-up
function approachPwUP() {

}


// Fa 120px in direzione a caso
function RandomRestart() {

}


Start();

function OutConsData() {
  //console.debug("Bot1 ha rilevato ??? a " + distanceToPwUP + " px di distanza");
  //console.log("ID di elemento più vicino:", closestElementId);
  Start();
}
setInterval(function() {
  //OutConsData();
}, 200);