//Cambia lo slot centrale principale con tecniche ed evoluzioni casual
  const tecnic = 'https://docs.google.com/drawings/d/e/2PACX-1vQM-kWdTzXN5FX-YXJriQcySiTzB-dmzPnTb9RxHpT9EZvY5Ya9KW3BbDaHrbuzvybwkFD_LoPoJ43k/pub?w=256&h=187';
  const evoluz = 'https://docs.google.com/drawings/d/e/2PACX-1vQeZBD2vuiFTXswWU_AsOlwm_YpzIlCcdAessBH_-u9LhhHMX97lq2PptsKu2DUGAHUqq4wewPk8a1P/pub?w=258&h=184';
  const slotC = document.getElementById('slotC');

  // 1° Caricamento
    let chosenVariable;
    let randomNumber = Math.random();
    if (randomNumber < 0.6) {
      chosenVariable = tecnic;
    } else {
      chosenVariable = evoluz;
    }
    slotC.src = chosenVariable
  // END

  //Listern SPACE
  function handleKeyPress(event) {
    if (event.code === 'Space') {
      ABC();
    }
  }
  document.addEventListener('keydown', handleKeyPress);
  

  for (let i = 0; i < 5; i++;) { 
    setTimeout(function() {
      let chosenVariable;
      let randomNumber = Math.random();

      if (randomNumber < 0.6) {
        chosenVariable = tecnic;
      } else {
        chosenVariable = evoluz;
      }

      slotC.src = chosenVariable
      //console.log('Variabile scelta:', chosenVariable);
    }, 1000);
  }

// END

//Funzione di rallentamento dei '???'
function ABC() {
  //
}