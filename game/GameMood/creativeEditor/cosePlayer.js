
//Movimento Player
document.addEventListener('keydown', function (event) {
  const player = document.getElementById('player');
  const step = 10; // Dimensione del passo di spostamento

  let top = parseInt(player.style.top) || 0;
  let left = parseInt(player.style.left) || 0;

  // Gestire l'evento di pressione del tasto
  switch (event.key) {
    case 'w': // Spostamento verso l'alto
      top -= step;
      break;
    case 'a': // Spostamento verso sinistra
      left -= step;
      break;
    case 's': // Spostamento verso il basso
      top += step;
      break;
    case 'd': // Spostamento verso destra
      left += step;
      break;
  }

  player.style.top = top + 'px';
  player.style.left = left + 'px';
});


//Ricarica energia
let Energy = document.getElementById('YourE');
Energy.value = 10;
if (Energy.value < 100) {
  const intervalId = setInterval(() => {
    Energy.value += 1;
  }, 100);
}
//clearInterval(intervalId);


//Comandi per le tecniche
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'w':
      // Azione per il tasto w
      break;
    case 'a':
      // Azione per il tasto a
      break;
    case 's':
      // Azione per il tasto s
      break;
    case 'd':
      // Azione per il tasto d
      break;
    case 'e': //Tasto tecnica 1
      console.info('Tasto E, Tecnica: ' + tecnic1);
      EsecTecnic(tecnic1);
      break;
    case 'f': //Tasto tecnica 2
      console.info('Tasto F, Tecnica: ' + tecnic2);
      EsecTecnic(tecnic2);
      break;
    default:
      // Azione per gli altri tasti
      break;
  }
});

document.addEventListener('click', function (event) {
  if (event.button == 0) {
    //console.info("Tasto Sinistro, Attacco base");
  }
  if (event.button == 1) {
    //azioni click destro mouse
  }
});


//Prevede mira in base a tecniche selezionate (tiene premuto tasto sinistro mouse + frecce < o > [per scorrere le tecniche, viste in un fumetto])
let mire = document.getElementById('mire');
let fumetto = document.getElementById('fumetto');
let isMouseDown = false;
let tooltip = null;
let text = null;
let label = 'tasto E';
fumetto.style.position = 'absolute';
fumetto.style.zIndex = '1';
fumetto.style.display = 'inline-block';
fumetto.style.borderBottom = '1px dotted black';
document.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    // tasto sinistro del mouse
    isMouseDown = true;
    FumF(true);
    mire.hidden = false;

    // Crea il tooltip solo se non esiste già
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.style.content = '';
      tooltip.style.position = 'absolute';
      tooltip.style.borderStyle = 'solid';
      tooltip.style.borderWidth = '10px 10px 0 10px';
      tooltip.style.borderColor = '#333 transparent transparent transparent';
      tooltip.style.bottom = '100%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      fumetto.appendChild(tooltip);

      text = document.createElement('div');
      text.innerText = label;
      text.style.position = 'absolute';
      text.style.backgroundColor = '#333';
      text.style.color = '#fff';
      text.style.padding = '5px';
      text.style.borderRadius = '5px';
      text.style.fontSize = '14px';
      text.style.fontWeight = 'bold';
      text.style.whiteSpace = 'nowrap';
      text.style.bottom = '120%';
      text.style.left = '50%';
      text.style.transform = 'translateX(-50%)';
      fumetto.appendChild(text);
    }
  }
});
document.addEventListener('mouseup', () => {
  isMouseDown = false;
  FumF(false);
  mire.hidden = true;

  // Rimuovi il tooltip quando viene rilasciato il tasto sinistro
  if (tooltip) {
    fumetto.removeChild(tooltip);
    fumetto.removeChild(text);
    tooltip = null;
    text = null;
  }
});
document.addEventListener('keydown', (event) => {
  if (
    isMouseDown &&
    (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
  ) {
    label = label === 'tasto E' ? 'tasto F' : 'tasto E';
    text.innerText = label;
  }
});
function FumF(val) {
  if (val) {
    fumetto.setAttribute('aria-hidden', 'false');
  } else {
    fumetto.setAttribute('aria-hidden', 'true');
  }
}