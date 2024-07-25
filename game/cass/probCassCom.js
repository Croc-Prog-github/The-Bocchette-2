//import probManager from "https://raw.githubusercontent.com/Croc-Prog-github/Probability-Manager.js/main/core/Probability-Manager.js";
const probManager = new ProbabilityManager();

function EstrazTecnica() {
  probManager.addList('tecnicLockCom', 1);

  //Script che legge array tecnicLockCom e con for usa probManager.addObject per impostare tutti gli elementi
  let tecnicLockComArr = JSON.parse(sessionStorage.getItem('tecnicLockCom'))/* || []*/; // Recupera array da sessionStorage e verif se exist
  for (let i = 0; i < tecnicLockComArr.length; i++) {
    const element = tecnicLockComArr[i]; //Usa la percentuale calcolata per ogni elemento
    probManager.addObject('tecnicLockCom', 1, element, (100 / tecnicLockComArr.length));
  }
  /*probManager.addObject('tecnicLockCom', 1, 'Fulmine', 25)
  probManager.addObject('tecnicLockCom', 1, 'AcquaSchizzo', 25)
  probManager.addObject('tecnicLockCom', 1, 'Stalagmiti', 25)
  probManager.addObject('tecnicLockCom', 1, 'CeneriBollenti', 25)*/
  
  let Return = probManager.getRandomObject('tecnicLockCom', 1);

  //Cancella Return da array tecnicLockCom in SesStorage;
    const index = tecnicLockComArr.indexOf(Return); // Trova l'indice dell'elemento (dato da Return)
    tecnicLockComArr.splice(index, 1); // Rimuove l'elemento dall'array
  //END
  //Aggiungi Return in array SesStorage tecnicUnlock
    //let tecnicUnlock = JSON.parse(sessionStorage.getItem('tecnicUnlock'))
    sessionStorage.setItem('tecnicUnlock', (Return + sessionStorage.getItem('tecnicUnlock')))
  //END
  
  console.log(probManager.toArrayForInstance('tecnicLockCom'))
  //console.log(probManager.toArrayForInstance('tecnicUnlock'))

  //console.log(Return)
  return Return;
}

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
  let NPuntOttim = probManager.getRandomObject('CassComun_PntOtm', '1')
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ NPuntOttim + ' ' + SkipN2);

  document.getElementById('TextSkip2').textContent = (NPuntOttim + ' ' + SkipN2);
  document.getElementById('ImgSkip2').src = '/resources/TB2/Casse/Ricompense/Punti-ottimiz.png';
  PuntOttimizz = parseInt(PuntOttimizz) + parseInt(NPuntOttim); //Dà i punti ottimizz.
} else if (SkipN2 == 'Tecnica') {
  let tecScielt = EstrazTecnica();
  console.log(`Oggetto estratto Lista 1 (Skip 2): `+ SkipN2 + ' Comune: '+ tecScielt);

  document.getElementById('TextSkip2').textContent = 'Tecnica comune: '+ tecScielt;
  document.getElementById('ImgSkip2').src = '/resources/TB2/Casse/Ricompense/Tecnica.png';
  probManager.clearInstance('tecnicLockCom')
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
probManager.clearInstance('CassComun')