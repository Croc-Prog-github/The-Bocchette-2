const bot1 = document.getElementById('bot1');
const vitaBot1Element = document.getElementById('vita_bot1');
const PwUP = document.getElementById('PwUP');
let vitaBot1 = parseInt(vitaBot1Element.value);

function Start() {
  const botRect = bot1.getBoundingClientRect();
  
  // Step 1: Cerca nel raggio di 100px i Power-up
  if (PwUP) {
    const pwupRect = PwUP.getBoundingClientRect();
    const distanceToPwUP = getDistance(botRect, pwupRect);

    if (distanceToPwUP <= 100) {
      // Step 2: Se rileva Power-up
      console.log("Bot 1 ha rilevato un Power-up a " + distanceToPwUP + " px di distanza");
      
      // 2.1: Vai vicino al Power-up e sottrai 10 di vita ogni 1.5 sec
      approachAndDamagePowerUp();
      
      // 2.2: Se rileva il Player mentre rompe il Power-up
      if (isPlayerInRange()) {
        // 2.21: Raggiunge la posizione del Player
        approachPlayer();
        
        // 2.22: Sottrai 10 di vita ogni 1.5 sec (Attacca il Player)
        attackPlayer();
        
        // 2.23: Se vitaBot1 <= 0, imposta bot1.hidden = true;
        if (vitaBot1 <= 0) {
          bot1.hidden = true;
        } else if (vitaPlayer <= 0) {
          // 2.24: Else if vitaPlayer <= 0, ricomincia Start()
          Start();
        }
      }
    } else {
      // 2.3: Altrimenti, sottrai 10 di vita ogni 1.5 sec al Power-up
      damagePowerUp();
    }
  } else if (isPlayerInRange()) {
    // Step 3: Se rileva il Player nel raggio di 100px
    console.log("Bot 1 ha rilevato il Player.");
    
    // 3.1: Raggiunge la posizione del Player
    approachPlayer();
    
    // 3.2: Sottrai 10 di vita ogni 1.5 sec (Attacca il Player)
    attackPlayer();
  } else {
    // Step 4: Se non rileva Power-up e non rileva il Player
    console.log("Bot 1 non rileva né il Power-up né il Player.");
    
    // 4.1: Fai 120px in una direzione a caso
    moveRandomly();
    
    // 4.2: Ricomincia Start()
    Start();
  }
}

// Funzione per calcolare la distanza tra due elementi
function getDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Funzione per avvicinarsi al Power-up e sottrarre vita
function approachAndDamagePowerUp() {
  // Implementa il comportamento per avvicinarsi al Power-up e sottrarre vita
}

// Funzione per verificare se il Player è nel raggio di 100px
function isPlayerInRange() {
  // Implementa la logica per verificare se il Player è nel raggio di 100px
}

// Funzione per avvicinarsi al Player
function approachPlayer() {
  // Implementa il comportamento per avvicinarsi al Player
}

// Funzione per attaccare il Player e sottrarre vita
function attackPlayer() {
  // Implementa il comportamento per attaccare il Player e sottrarre vita
}

// Funzione per muoversi casualmente
function moveRandomly() {
  // Implementa il comportamento per muoversi casualmente
}

// Avvia la logica del bot
Start();