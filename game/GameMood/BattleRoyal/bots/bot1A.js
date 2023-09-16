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

//Calcola la distanza tra i 2 elementi in argomento
function getDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function Start() {

  // Step 1: Cerca nel raggio di 100px
  if (player || PwUP) {
    let closestElementId = null;
  }
  
  if (player) {
    const playerRect = player.getBoundingClientRect();
    const distance = getDistance(botRect, playerRect);
    
    if (distance <= 100 && distance < closestDistance) {
      closestElementId = player.id;
      closestDistance = distance;
    }
  }
  
  if (PwUP) {
    const pwupRect = PwUP.getBoundingClientRect();
    const distance = getDistance(botRect, pwupRect);
    
    if (distance <= 100 && distance < closestDistance) {
      closestElementId = PwUP.id;
      closestDistance = distance;
    }
  }
  
  if (closestElementId) { // if (var1)... Serve a verificare che la var sia != da null;
    console.log("ID dell'elemento più vicino:", closestElementId);
  }
}

Start();