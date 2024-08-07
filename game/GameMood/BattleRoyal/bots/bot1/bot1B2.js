//STABLE MAIN VERSION

/*const vitaBot1Element = document.getElementById('vita_bot1');
let vitaBot1 = parseInt(vitaBot1Element.value);*/

document.addEventListener('DOMContentLoaded', async () => {
  const bot1 = document.getElementById('bot1');
  const mover = new MoverTS(bot1);

  try {
    let radarMode = await RadarMode();
    radarMode = String(radarMode);

    switch (radarMode) {
      case 'player':
        mover.glideAtIdElement(radarMode, 3);
      break;
      case 'PwUP':
        mover.glideAtIdElement(radarMode, 3);
      break;
      default:
        console.warn("MainFlow: Nessun elemento definito rilevato da RadarMode(); return: " + radarMode);
      break;
    }
  } catch (error) {
    //console.error("Catch: Errore durante l'esecuzione di RadarMode(): ", error);
  }
});

function getDistance(rect1, rect2) {
  const dx = rect1.x - rect2.x;
  const dy = rect1.y - rect2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function glideToPosition(element, destinationLeft, destinationTop, duration) {
  return new Promise((resolve) => {
    element.style.transition = `left ${duration}s, top ${duration}s`; // Imposta la transizione CSS per l'animazione

    element.style.left = `${destinationLeft}px`; // Imposta la nuova posizione orizzontale
    element.style.top = `${destinationTop}px`; // Imposta la nuova posizione verticale

    // Attende che l'animazione sia completata
    setTimeout(() => {
      element.style.transition = ''; // Rimuove la transizione dopo che è completata
      resolve(); // Risolve la promessa dopo la fine dell'animazione
    }, duration * 1000);
  });
}

async function RadarMode() { //Cerca in un raggio di 100px gli id: player || PwUP
  const bot1 = document.getElementById('bot1');
  const mover = new MoverTS(bot1);

  const radius = 100; // Raggio di ricerca in pixel
  const botRect = bot1.getBoundingClientRect();

  const player = document.getElementById('player');
  const PwUP = document.getElementById('PwUP');

  let foundElement = null;

  // Verifica se l'elemento 'player' è entro il raggio
  if (player) {
    const playerRect = player.getBoundingClientRect();
    const distanceToPlayer = getDistance(botRect, playerRect);
    if (distanceToPlayer <= radius) {
      foundElement = player;
    }
  } 
  if (PwUP && !foundElement) { // Se non ha già trovato il player, Verifica se l'elemento PwUP è entro il raggio
    const pwupRect = PwUP.getBoundingClientRect();
    const distanceToPwUP = getDistance(botRect, pwupRect);
    if (distanceToPwUP <= radius) {
      foundElement = PwUP;
    }
  }

  
  if (foundElement) { // Verifica l'esistenza dell'elemento cercato
    console.info("RadarMode(): Elemento più vicino trovato nel raggio: " + radius + "): " + foundElement.id);
    return foundElement.id;
  } else {
    console.warn("RadarMode(): Nessun elemento nel raggio di: " + radius + "px");

    // Recupera le dimensioni dell'elemento Terreno
    const terrenoElement = document.getElementById('terr');
    if (terrenoElement) {
      const terrenoRect = terrenoElement.getBoundingClientRect();
      // Genera una posizione casuale all'interno dell'elemento Terreno
      const destinationLeft = Math.floor(Math.random() * (terrenoRect.width - 0)) + terrenoRect.left;
      const destinationTop = Math.floor(Math.random() * (terrenoRect.height - 0)) + terrenoRect.top;

      try {
        await glideToPosition(bot1, destinationLeft, destinationTop, 3); // Va in una posizione a caso (nel Terreno)
        RadarMode()
      } catch (error) {
        //console.error("Errore durante l'animazione:", error);
      }
    } else {
      console.error("RadarMode(): Nessun elemento con attributo 'name' uguale a 'Terreno' trovato.");
    }

    return 'false';
  }
}