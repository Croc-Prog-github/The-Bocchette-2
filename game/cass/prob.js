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
    if (handleKeyPress.code === 'Space') {
      clearInterval(intervalId);
      ABC();
    }
  });

  startLoop();
// END

//Funzione per sciegliere tra le tecniche o le evoluzioni
function ABC() {
  let risult = slotC.src;
  if (risult === 'https://docs.google.com/drawings/d/e/2PACX-1vQM-kWdTzXN5FX-YXJriQcySiTzB-dmzPnTb9RxHpT9EZvY5Ya9KW3BbDaHrbuzvybwkFD_LoPoJ43k/pub?w=256&h=187') { // <-- Tecnic

  } else { //Other (Evoluz)

  }
}