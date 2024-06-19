//import probManager from "/game/cass/new/Probability-Manager.js";
const probManager = new ProbabilityManager();

// Creazione di istanze e liste
probManager.addList('CassComun', 1); //Banconote
probManager.addList('CassComun', 2); // Evoluz, Tecnic, Punt_Ottim, Null
probManager.addList('CassComun_PntOtm', 1); //Range punti ottimizzazione


// Aggiunta di oggetti con probabilità
probManager.addObject('CassComun', '1', '30-100', 'auto_InversProp'); //Estrazione Banconote

probManager.addObject('CassComun', '2', 'Evoluzione', 10)
probManager.addObject('CassComun', '2', 'Tecnica', 15)
probManager.addObject('CassComun', '2', 'Punti ottimizzazione', 25)
probManager.addObject('CassComun', '2', 'Nulla', 50)


// Estrazione di un oggetto casuale
let nBanconoteEstratt = probManager.getRandomObject('CassComun', '1');
document.getElementById('n').textContent = nBanconoteEstratt; // Sostituisci il contenuto del div con il numero generato
soldi = parseInt(soldi) + parseInt(nBanconoteEstratt); //Somma matematica, senza unione di strighe
console.log(`Oggetto estratto Lista 1 (Skip 1): `+ nBanconoteEstratt + ' Banconote');


let SkipN2 = probManager.getRandomObject('CassComun', '2');

//Ramificazione ricompense Skip 2
if (SkipN2 == 'Punti ottimizzazione') {
  probManager.addObject('CassComun_PntOtm', '1', '10-50', 'auto_InversProp');
  let NPuntEner = probManager.getRandomObject('CassComun_PntOtm', '1')
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ NPuntEner + ' ' + SkipN2);
} else if (SkipN2 == 'Tecnica') {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2 + ' Comune');
} else if (SkipN2 == 'Evoluzione') {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2 + ' Comune');
} else {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2);
}


// Pulizia delle istanze
probManager.clearInstance('CassComun')