/*document.addEventListener('DOMContentLoaded', () => {
  const bot1 = document.getElementById('bot1');
  //import { mover } from '../Movement-library.ts';
  const mover = new MoverTS(bot1);
})*/


//Calcola la distanza tra i 2 elementi in argomento
function getDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function RadarMode() { //Cerca in un raggio di 100px gli id: player || PwUP
  const bot1 = document.getElementById('bot1');
  const mover = new MoverTS(bot1);

  const radius = 100; // Raggio di ricerca in pixel
  const botRect = bot1.getBoundingClientRect();

  const player = document.getElementById('player');
  const PwUP = document.getElementById('PwUP');

  let foundElement = null;

  // Verifica se l'elemento player è entro il raggio
  if (player) {
    const playerRect = player.getBoundingClientRect();
    const distanceToPlayer = getDistance(botRect, playerRect);
    if (distanceToPlayer <= radius) {
      foundElement = player;
    }
  }

  // Verifica se l'elemento PwUP è entro il raggio
  if (PwUP && !foundElement) { // Se non ha già trovato il player
    const pwupRect = PwUP.getBoundingClientRect();
    const distanceToPwUP = getDistance(botRect, pwupRect);
    if (distanceToPwUP <= radius) {
      foundElement = PwUP;
    }
  }

  if (foundElement) {
    console.info("Elemento più vicino trovato nel raggio: "+radius+"): " + foundElement.id);
    return (foundElement.id);
  } else {
    console.warn("RadarMode(): Nessun elemento nel raggio di: "+radius+"px");

    // Recupera le dimensioni dell'elemento Terreno
    const terrenoElement = document.querySelector('[name="Terreno"]');
    const terrenoRect = terrenoElement.getBoundingClientRect();
    // Genera una posizione casuale all'interno dell'elemento Terreno
    const destinationLeft = Math.floor(Math.random() * (terrenoRect.width - 0)) + terrenoRect.left;
    const destinationTop = Math.floor(Math.random() * (terrenoRect.height - 0)) + terrenoRect.top;

    mover.glideAt(destinationLeft, destinationTop, 3); // Va in una posizione a caso (nel Terreno)
        
    RadarMode();
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bot1 = document.getElementById('bot1');
  const mover = new MoverTS(bot1);

  RadarMode();
  switch (RadarMode()) {
    case 'player' | 'player2':
      mover.glideAtIdElement(RadarMode(), 3)
    break;
    case 'PwUP':
      mover.glideAtIdElement('PwUP', 3)
    break;
    default:
      console.warn("MainFlow: Nessun elemento definito rilevato da RadarMode()")
    break;
  }
})