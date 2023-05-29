let tecnic1 = localStorage.getItem('tecnic1'); //Tasto E
let tecnic2 = localStorage.getItem('tecnic2'); //Tasto F
let tecnicLock = ['dispersione', 'taglio netto', 'super taglio netto']; //Tecniche Sbloccate (Acquisite)

setInterval(() => {
  localStorage.setItem('tecnic1', tecnic1);
  localStorage.setItem('tecnic2', tecnic2);
}, 10);

function STecnic1() { //Sciegli Tecnica1 (nella home)
  const select = document.getElementById('Tecnic1');
  let selectedValue = select.value;
  tecnic1 = selectedValue;

  UTecnic();
}
function STecnic2() { //Sciegli Tecnica2 (nella home)
  const select = document.getElementById('Tecnic2');
  let selectedValue = select.value;
  tecnic2 = selectedValue;

  UTecnic();
}

function UTecnic() { //Usa tecnica (trasferisce valori da sopr.html)
  document.addEventListener('keydown', function (event) {
    if (event.key == 'e') {
      if (tecnicLock.includes(tecnic1)) {
        EsecTecnic(tecnic1);
      }
    }
    if (event.key == 'f') {
      if (tecnicLock.includes(tecnic2)) {
        EsecTecnic(tecnic2);
      }
    }
  });
}

function EsecTecnic(tecnic1) { //Riproduce tecnica per slot tecnic1
  Energy = document.getElementById('YourE');
  switch (tecnic1) {
    case 'dispersione':
      Energy.value -= 10;
      break;
    case 'taglio netto':
      if (Energy.value >= 30) {
        Energy.value -= 30;
        taglio_netto();
      } else {
        console.log('Energia insufficente');
      }
      break;
    case 'super taglio netto':
      if (Energy.value >= 50) {
        Energy.value -= 50;
      } else {
        console.log('Energia insufficente');
      }
      break;
  }
}
function EsecTecnic(tecnic2) { //Riproduce tecnica per slot tecnic2
  let progress = document.getElementById('YourE').value;
  switch (tecnic2) {
    case 'dispersione':
      if (Energy.value >= 20) {
        Energy.value -= 20;
      } else {
        console.log('Energia insufficente');
      }
      break;
    case 'taglio netto':
      if (Energy.value >= 30) {
        Energy.value -= 30;
        taglio_netto();
      } else {
        console.log('Energia insufficente');
      }
      break;
    case 'super taglio netto':
      if (Energy.value >= 50) {
        Energy.value -= 50;

      } else {
        console.log('Energia insufficente');
      }
      break;
  }
}

function taglio_netto() { //definisce comportamento di tecnic: taglio netto
  let taglioNetto = document.getElementById("taglio_netto");
  var player = document.getElementById("player");
  if (!document.getElementById('taglio_netto')) {
    console.debug("L' elemento: <div id='taglio_netto' style='width: 5px; height: 2cm; border-radius: 8px; position: relative; background: #1E90FF;'></div> non è presente nel DOM");
  } else {
    //Usa la tecnica e gestisce il suo comportamento
    // Ottieni le coordinate dell'elemento con id "player"
    const player = document.getElementById("player");
    const playerRect = player.getBoundingClientRect();
    const playerX = playerRect.left;
    const playerY = playerRect.top;

    // Posiziona il div con id "taglio_netto" nelle stesse coordinate del player
    const taglioNetto = document.getElementById("taglio_netto");
    taglioNetto.style.position = "absolute";
    taglioNetto.style.left = playerX + "px";
    taglioNetto.style.top = playerY + "px";
    
    //Mostra taglioNetto
    taglioNetto.hidden = false;

    // Aggiungi l'evento 'mousemove' all'intero documento
    document.addEventListener("mousemove", function(event) {  
      // Calcola le coordinate del punto di riferimento del div "taglio_netto"
      const taglioNettoRect = taglioNetto.getBoundingClientRect();
      const taglioNettoX = taglioNettoRect.left + taglioNettoRect.width / 2;
      const taglioNettoY = taglioNettoRect.top + taglioNettoRect.height / 2;

      // Calcola le coordinate del mouse
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Calcola l'angolazione tra il punto di riferimento del div "taglio_netto" e la posizione corrente del mouse
      const angle = Math.atan2(mouseY - taglioNettoY, mouseX - taglioNettoX) * (180 / Math.PI);

      // Imposta la proprietà CSS 'transform' del div "taglio_netto" per ruotarlo in base all'angolazione
      taglioNetto.style.transform = `rotate(${-angle}deg)`;
    });
  }
}
