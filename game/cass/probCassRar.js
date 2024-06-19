//import probManager from "https://raw.githubusercontent.com/Croc-Prog-github/Probability-Manager.js/main/core/Probability-Manager.js";
const probManager = new ProbabilityManager();

// Creazione di istanze e liste
probManager.addList('CassRar', 1); //Banconote
probManager.addList('CassRar', 2); // Evoluz, Tecnic, Punt_Ottim, Null
probManager.addList('CassRar_PntOtm', 1); //Range punti ottimizzazione


// Aggiunta di oggetti con probabilità
probManager.addObject('CassRar', '1', '90-190', 'auto_InversProp'); //Estrazione Banconote

probManager.addObject('CassRar', '2', 'Evoluzione', 10)
probManager.addObject('CassRar', '2', 'Tecnica', 15)
probManager.addObject('CassRar', '2', 'Punti ottimizzazione', 25)
probManager.addObject('CassRar', '2', 'Nulla', 50)


// Estrazione di un oggetto casuale
let nBanconoteEstratt = probManager.getRandomObject('CassRar', '1');
document.getElementById('n').textContent = nBanconoteEstratt; // Sostituisci il contenuto del div con il numero generato
soldi = parseInt(soldi) + parseInt(nBanconoteEstratt); //Somma matematica, senza unione di strighe
console.log(`Oggetto estratto Lista 1 (Skip 1): `+ nBanconoteEstratt + ' Banconote');


let SkipN2 = probManager.getRandomObject('CassRar', '2');

//Ramificazione ricompense Skip 2
if (SkipN2 == 'Punti ottimizzazione') {
  probManager.addObject('CassRar_PntOtm', '1', '10-50', 'auto_InversProp');
  let NPuntEner = probManager.getRandomObject('CassRar_PntOtm', '1')
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ NPuntEner + ' ' + SkipN2);

  document.getElementById('TextSkip2').textContent = (NPuntEner + ' ' + SkipN2);
  document.getElementById('ImgSkip2').src = '/resources/TB2/Casse/Ricompense/Punti ottimiz.svg';
  //Dà i punti ottimizz.
} else if (SkipN2 == 'Tecnica') {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2 + ' Comune');

  document.getElementById('TextSkip2').textContent = 'Tecnica comune: X';
  document.getElementById('ImgSkip2').src = '/resources/TB2/Casse/Ricompense/Tecnica.png';
  //Dà la tecnica
} else if (SkipN2 == 'Evoluzione') {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2 + ' Comune');

  document.getElementById('TextSkip2').textContent = 'Evoluzione comune: X';
  document.getElementById('ImgSkip2').src = '/resources/TB2/Casse/Ricompense/Evoluzione.png';
  //Dà l'evoluz.
} else {
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2);
}


// Pulizia delle istanze
probManager.clearInstance('CassRar')