//Cambia lo slot centrale principale con tecniche ed evoluzioni casual
const tecnic = '\resources\TB2\Casse\Ricompense\Tecnica.png';
const evoluz = '\resources\TB2\Casse\Ricompense\Evoluzione.png';
const slotC = document.getElementById('');

let intervalId;

// 1° caricamento
  let chosenVariable;
  let randomNumber2 = Math.random();
  if (randomNumber2 < 0.6) {
      chosenVariable = tecnic;
  } else {
    chosenVariable = evoluz;
  }
  slotC.src = chosenVariable;
// END

function startLoop() {
  intervalId = setInterval(function() {
    let chosenVariable;
    let randomNumber2 = Math.random();
    if (randomNumber2 < 0.6) {
      chosenVariable = tecnic;
    } else {
      chosenVariable = evoluz;
    }

    slotC.src = chosenVariable;
  }, 10);
}

//Interrompe il loop di scorrimento
document.addEventListener('mousedown', handleKeyPress => {
  if ( /*handleKeyPress.code === 'Space'*/ true) {
    clearInterval(intervalId);
    //Choice();
    window.location.href = '/game/home.html'
  }
});

//startLoop();
// END

//Funzione per sciegliere tra le tecniche o le evoluzioni
function Choice() {
  let risult = slotC.src;
  if (risult === '\resources\TB2\Casse\Ricompense\Tecnica.png') { // <-- Tecnic
    let tecnicSelect = tecnicLockCom[Math.floor(Math.random() * tecnicLockCom.length)];
    if (tecnicUnlock.includes(tecnicSelect)) { //Una tecnica casuale di tecnicLockCom è contenuta in tecnicUnlock ?
      Choice();
    } else {
      window.alert('Hai tovato la Tecnica: ' + tecnicSelect + ' !');
      window.location.href = '/game/home.html'

      //Rimuove tecnicSelect da TecnicLockCom e lo agiunge in TecnicUnlock
      let index = tecnicLockCom.indexOf(tecnicSelect);
      //let index = tecnicSelect;
      if (index !== -1) {
        tecnicLockCom.splice(index, 1); 
        tecnicUnlock.push(tecnicSelect);
      } else {
        alert("Fatal error: index di tecnicLockCom è < 1 Cioè l'elemento non è stato trovato");
      }
    }
  }
  if (risult === '\resources\TB2\Casse\Ricompense\Evoluzione.png') { // <-- Evoluz 
    window.alert("Risultato Evoluzione: Nessuna evoluzione aggiunta!");
    window.location.href = '/game/home.html'
  }
}