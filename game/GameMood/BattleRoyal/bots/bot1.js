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
      
      // 2.1: raggiungi il Power-up
      approachPowerUp();
      
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

// Funzione avvicinarsi a Power-up
function approachPowerUp() {
  const botRect = bot1.getBoundingClientRect();
  const pwupElement = document.getElementById('PwUP');

  // Definisci la velocità del bot
  const botSpeed = 10;

  if (pwupElement) {
    const pwupRect = pwupElement.getBoundingClientRect();
    const dx = pwupRect.x - botRect.x;
    const dy = pwupRect.y - botRect.y;

    // Calcola l'angolo tra bot1 e il Power-up
    const angle = Math.atan2(dy, dx);

    // Calcola la distanza tra bot1 e il Power-up
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calcola gli spostamenti su x e y
    const dxMove = botSpeed * Math.cos(angle);
    const dyMove = botSpeed * Math.sin(angle);

    // Verifica se il bot è già abbastanza vicino al Power-up
    if (distance > 10) { // Modifica la distanza minima a tua discrezione
      // Sposta il bot verso il Power-up
      bot1.style.left = (botRect.x + dxMove) + 'px';
      bot1.style.top = (botRect.y + dyMove) + 'px';

      // Richiama la funzione di approachPowerUp() in modo ricorsivo
      requestAnimationFrame(approachPowerUp);
    }
  }
}

// Funzione per verificare se il Player è nel raggio di 100px
function isPlayerInRange() {

}

// Funzione per avvicinarsi al Player
function approachPlayer() {

}

// Funzione per attaccare
function attack() {

}

// Funzione per muoversi in direzione casuale
function moveRandomly() {

}

// Avvio
Start();