//import probManager from "/game/cass/new/Probability-Manager.js";
const probManager = new ProbabilityManager();

// Creazione di istanze e liste
probManager.addList('CassComun', 1); //Banconote
probManager.addList('CassComun', 2); // Evoluz, Tecnic, Punt_Ottim, Null
probManager.addList('CassComun_PntOtm', 1); //Range punti ottimizzazione

console.log("Elementi di Cassa Comune:")


// Aggiunta di oggetti con probabilità
probManager.addObject('CassComun', '1', '30-100', 'auto_InversProp');

probManager.addObject('CassComun', '2', 'Evoluzione', 10)
probManager.addObject('CassComun', '2', 'Tecnica', 15)
probManager.addObject('CassComun', '2', 'Punti ottimizzazione', 25)
probManager.addObject('CassComun', '2', 'Nulla', 50)


// Estrazione di un oggetto casuale
let randomEvent = probManager.getRandomObject('CassComun', '1');
console.log(`Oggetto estratto Lista 1 (Skip 1): `+ randomEvent + ' Banconote');


randomEvent = probManager.getRandomObject('CassComun', '2');

//Ramificazione ricompense Skip 1
if (randomEvent == 'Punti ottimizzazione') {
  probManager.addObject('CassComun_PntOtm', '1', '10-50', 'auto_InversProp');
  let NPuntEner = probManager.getRandomObject('CassComun_PntOtm', '1')
  console.log(`Oggetto estratto Lista 1 (Skip 1): `+ NPuntEner + ' ' + randomEvent);
} else if (randomEvent == 'Tecnica') {
  console.log(`Oggetto estratto Lista 1 (Skip 1): `+ randomEvent + ' Comune');
} else if (randomEvent == 'Evoluzione') {
  console.log(`Oggetto estratto Lista 1 (Skip 1): `+ randomEvent + ' Comune');
} else {
  console.log(`Oggetto estratto Lista 1 (Skip 1): `+ randomEvent);
}


// Pulizia delle istanze
probManager.clearInstance('CassComun')