//const probManager = new ProbabilityManager();
import probManager from "https://raw.githubusercontent.com/Croc-Prog-github/Probability-Manager.js/main/core/Probability-Manager.js";

// Creazione di istanze e liste
probManager.addList('CassComun', '1');
probManager.addList('CassComun', '2');

console.log("Elementi di Cassa Comune:")


// Aggiunta di oggetti con probabilità
probManager.addObject('CassComun', '1', '100 Banconote', 13);
probManager.addObject('CassComun', '1', '50 Banconote', 27);
probManager.addObject('CassComun', '1', '25 Banconote', 60);

probManager.addObject('CassComun', '2', 'Evoluzione', 10)
probManager.addObject('CassComun', '2', 'Tecnica', 15)
probManager.addObject('CassComun', '2', 'Punti ottimizzazione', 25)
probManager.addObject('CassComun', '2', 'Nulla', 50)


// Estrazione di un oggetto casuale
let randomEvent = probManager.getRandomObject('CassComun', '1');
console.log(`Oggetto estratto Lista 1 (Skip 1): `+ randomEvent);

randomEvent = probManager.getRandomObject('CassComun', '2');
console.log(`Oggetto estratto Lista 2 (Skip 2): `+ randomEvent);


// Pulizia delle istanze
probManager.clearInstance('CassComun')