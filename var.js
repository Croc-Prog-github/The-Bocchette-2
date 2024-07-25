let username = sessionStorage.getItem('username');

let gemme = sessionStorage.getItem("gemme");
let soldi = sessionStorage.getItem("soldi");
let passP = sessionStorage.getItem("passP"); //Pass premium (aqcuistato)?
let obb = sessionStorage.getItem("obb"); //(n.) obbiettivi (del pass) conquistati
let gett = sessionStorage.getItem("gett"); //n. di gettoni (pass)
let PuntOttimizz = sessionStorage.getItem("PuntOttimizz") //Punti ottimizzazione per migliorare le Tecniche

let NCassCom = sessionStorage.getItem("NCassCom"); //n. casse comuni
let NCassRar = sessionStorage.getItem("NCassRar"); //n. casse comuni

let tecnicUnlock = JSON.parse(sessionStorage.getItem('tecnicUnlock')) || ['Dispersione', 'Taglio Netto', 'Super Taglio Netto']; //Tecniche Sbloccate (Acquisite)
let tecnicLockCom = JSON.parse(sessionStorage.getItem('tecnicLockCom')) || ['Fulmine', 'Acqua Schizzo', 'Stalagmiti', 'Ceneri Bollenti']; //TecnicheComuni Bloccate (Da trovare o aquistare)
let evoluzUnlock = sessionStorage.getItem("evoluzUnlock"); //Evoluzioni Sbloccate
let evoluzLock = sessionStorage.getItem("evoluzLock"); //Evoluzioni Bloccate

function setArrayTeE() { //Settig iniziale Tecniche e Evoluzioni
  tecnicUnlock = ['Dispersione', 'Taglio Netto', 'Super Taglio Netto'];
  tecnicLockCom = ['Fulmine', 'Acqua Schizzo', 'Stalagmiti', 'Ceneri Bollenti'];
  evoluzUnlock = [];
  evoluzLock = [];
  sessionStorage.setItem('tecnicUnlock', tecnicUnlock)
  sessionStorage.setItem('tecnicLockCom', tecnicLockCom)
}

let obbUnlockPG = sessionStorage.getItem("obbUnlockPG"); //obb Unlock Pass Gratis
let obbUnlockPP = sessionStorage.getItem("obbUnlockPP"); //obb Unlock Pass Premium
//Non posso continuare dato che gli obbiettivi sono array e creano bug nel Session Storage come questi array sopra.-----------------------------------


//Array totale che contiene gli array tecnicUnlock e tecnicLockCom
  var data = {
    tecnicUnlock: tecnicUnlock,
    tecnicLockCom: tecnicLockCom
  };
  sessionStorage.setItem('Tecnic_&_Evoluz', JSON.stringify(data));
  var storedData = JSON.parse(sessionStorage.getItem('Tecnic_&_Evoluz'));
//END

function SS() {
  // Session Storage legato alle variabili
  sessionStorage.setItem("username", username);
  
  sessionStorage.setItem("gemme", gemme);
  sessionStorage.setItem("soldi", soldi);
  sessionStorage.setItem("passP", passP);
  sessionStorage.setItem("obb", obb);
  sessionStorage.setItem("gett", gett);
  sessionStorage.setItem("PuntOttimizz", PuntOttimizz);

  sessionStorage.setItem("NCassCom", NCassCom);
  sessionStorage.setItem("NCassRar", NCassRar)

  //Aggiorna i singoli array di dati
  sessionStorage.setItem("tecnicUnlock", JSON.stringify(tecnicUnlock));
  sessionStorage.setItem("tecnicLockCom", JSON.stringify(tecnicLockCom));

  sessionStorage.setItem("evoluzUnlock", evoluzUnlock);
  sessionStorage.setItem("evoluzLock", evoluzLock);
}
//Da ora il Session Storage non è più controllato dal filtro dei soli numeri interi
setInterval(function() {
  SS();
  const keysToCheck = ['obb', 'gett', 'soldi', 'passP', 'gemme', 'NCassCom', 'NCassRar', 'PuntOttimizz']; // Array delle chiavi da verificare (solo variabili Int)
  for (let key in sessionStorage) {
    if (keysToCheck.includes(key)) { // Verifica se la chiave corrente è presente nell'array keysToCheck
      let value = sessionStorage.getItem(key);
      if (isNaN(parseInt(value))) {
        for (let key in sessionStorage) {
          sessionStorage.setItem(key, 0);
          console.error("La chiave: " + key + " aveva valore diverso da una variabile di tipo int.");
          console.warn("I valori di tutte le chiavi sono impostati a 0.");
        }
        break;
      }
    }
  }
}, 300);

setInterval(SS, 300);

if (NCassCom < 0) {NCassCom = 0};
if (NCassRar < 0) {NCassRar = 0};