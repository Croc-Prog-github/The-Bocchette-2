const bot1 = document.getElementById('bot1');
//Variabili primarie
const vitaBot1Element = document.getElementById('vita_bot1');
const PwUP = document.getElementById('PwUP');
let vitaBot1 = parseInt(vitaBot1Element.value);

//Variabili di impostazione
let botSpeed = 50; // Velocità spostamento bot (px al sec)
let minDistance = 10; // Distanza minima da PwUP (px)

//Variabili di funzione
const botRect = bot1.getBoundingClientRect();
const pwupRect = PwUP.getBoundingClientRect();
const distanceToPwUP = getDistance(botRect, pwupRect);
let isMoving = false; // Variabile di stato per  movimento

function Start() {
  
  // Step 1: Cerca nel raggio di 100px i Power-up
  if (PwUP) {

    if (distanceToPwUP <= 100) {
      // Step 2: Se rileva Power-up
      console.log("Bot1 ha rilevato un Power-up a " + distanceToPwUP + " px di distanza");
      
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
      attack();
    }
  } else if (isPlayerInRange()) {
    // Step 3: Se rileva il Player nel raggio di 100px
    console.log("Bot1 ha rilevato un Player.");
    
    // 3.1: Raggiunge la posizione del Player
    approachPlayer();
    
    // 3.2: Sottrai 10 di vita ogni 1.5 sec (Attacca il Player)
    attack();
  } else {
    // Step 4: Se non rileva Power-up e non rileva il Player
    console.log("Bot1 NON rileva: Power-up or Players.");
    
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
  if (PwUP) {
    const botRect = bot1.getBoundingClientRect();
    const pwupRect = PwUP.getBoundingClientRect();
    
    // Calcola la distanza orizzontale e verticale tra il bot e il Power-up
    const dx = pwupRect.x - botRect.x;
    const dy = pwupRect.y - botRect.y;
    
    // Calcola la distanza totale
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > minDistance) {
      // Calcola il tempo necessario per coprire la distanza con la velocità specificata
      const timeInSeconds = (distance - minDistance) / botSpeed;
    
      // Calcola la quantità di spostamento su x e y per ogni intervallo di aggiornamento (per raggiungere la velocità specificata)
      const dxMove = (dx / timeInSeconds) / 60; // 60 fps
      const dyMove = (dy / timeInSeconds) / 60; // 60 fps
    
      // Esegui la funzione di aggiornamento del movimento a 60 fps
      const interval = 1000 / 60; // 60 fps
      let currentTime = 0;
    
      function updatePosition() {
        if (currentTime < timeInSeconds) {
          botRect.x += dxMove;
          botRect.y += dyMove;

          // Verifica se il bot si avvicina troppo al Power-up
          const newDistance = Math.sqrt((pwupRect.x - botRect.x) ** 2 + (pwupRect.y - botRect.y) ** 2);
          if (newDistance <= minDistance) {
            return; // Ferma il movimento quando il bot è abbastanza vicino
          }

          bot1.style.left = botRect.x + 'px';
          bot1.style.top = botRect.y + 'px';
        
          currentTime += interval / 1000;
          requestAnimationFrame(updatePosition);
        }
      }
    
      // Avvia il movimento
      updatePosition();
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

function OutConsData() {
  console.debug("Bot1 ha rilevato ??? a " + distanceToPwUP + " px di distanza");
  //requestAnimationFrame(OutConsData);
}
setInterval(function() {
  //OutConsData();
}, 100);