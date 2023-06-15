//Cambia lo slot centrale principale con tecniche ed evoluzioni casual
  const tecnic = 'https://docs.google.com/drawings/d/e/2PACX-1vQM-kWdTzXN5FX-YXJriQcySiTzB-dmzPnTb9RxHpT9EZvY5Ya9KW3BbDaHrbuzvybwkFD_LoPoJ43k/pub?w=256&h=187';
  const evoluz = 'https://docs.google.com/drawings/d/e/2PACX-1vQeZBD2vuiFTXswWU_AsOlwm_YpzIlCcdAessBH_-u9LhhHMX97lq2PptsKu2DUGAHUqq4wewPk8a1P/pub?w=258&h=184';
  const slotC = document.getElementById('slotC');

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
  document.addEventListener('keydown', handleKeyPress => {
    if (handleKeyPress.code === 'Space' && (chosenVariable === evoluz || chosenVariable === tecnic) ) {
      clearInterval(intervalId);
      Choice();
    }
  });

  startLoop();
// END

//Funzione per sciegliere tra le tecniche o le evoluzioni
function Choice() {
  let risult = slotC.src;
  if (risult === 'https://docs.google.com/drawings/d/e/2PACX-1vQM-kWdTzXN5FX-YXJriQcySiTzB-dmzPnTb9RxHpT9EZvY5Ya9KW3BbDaHrbuzvybwkFD_LoPoJ43k/pub?w=256&h=187') { // <-- Tecnic
    let tecnicSelect = tecnicLockCom[Math.floor(Math.random() * tecnicLockCom.length)];
    if (tecnicUnlock.includes(tecnicSelect)) { //Una tecnica casuale di tecnicLockCom è contenuta in tecnicUnlock ?
      Choice();
    } else {
      window.alert('Hai tovato la tecnica: ' + tecnicSelect + ' !');
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
  if (risult === 'https://docs.google.com/drawings/d/e/2PACX-1vQeZBD2vuiFTXswWU_AsOlwm_YpzIlCcdAessBH_-u9LhhHMX97lq2PptsKu2DUGAHUqq4wewPk8a1P/pub?w=258&h=184') { // <-- Evoluz 
    alert("Nessuna evoluzione agiunta!");
    window.location.href = '/game/home.html'
  }
}