let gemme = sessionStorage.getItem("gemme");
let soldi = sessionStorage.getItem("soldi");

let passP = sessionStorage.getItem("passP"); //Pass premium (aqcuistato)?
let obb = sessionStorage.getItem("obb"); //(n.) obbiettivi (del pass) conquistati
let gett = sessionStorage.getItem("gett"); //n. di gettoni (pass)


let tecnicUnlock =  sessionStorage.getItem("tecnicUnlock");//Tecniche Sbloccate (Acquisite)
let tecnicLockCom = sessionStorage.getItem("tecnicLockCom"); //TecnicheComuni Bloccate (Da trovare o aquistare)
let evoluzUnlock = sessionStorage.getItem("evoluzUnlock"); //Evoluzioni Sbloccate
let evoluzLock = sessionStorage.getItem("evoluzLock"); //Evoluzioni Bloccate

if (true) {
  tecnicUnlock = ['dispersione', 'taglio netto', 'super taglio netto'];
  tecnicLockCom = ['rasengan', 'fulmine'];
  evoluzUnlock = [];
  evoluzLock = [];
}

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
  sessionStorage.setItem("gemme", gemme);
  sessionStorage.setItem("soldi", soldi);
  sessionStorage.setItem("passP", passP);
  sessionStorage.setItem("obb", obb);
  sessionStorage.setItem("gett", gett);

  //Aggiorna i singoli array di dati
  sessionStorage.setItem("tecnicUnlock", JSON.stringify(tecnicUnlock));
  sessionStorage.setItem("tecnicLockCom", JSON.stringify(tecnicLockCom));

  sessionStorage.setItem("evoluzUnlock", evoluzUnlock);
  sessionStorage.setItem("evoluzLock", evoluzLock);
}
//Da ora il Session Storage non è più controllato dal filtro dei soli numeri interi
setInterval(function() {
  SS();
  const keysToCheck = ['obb', 'gett', 'soldi', 'passP', 'gemme']; // Array delle chiavi da verificare (solo variabili Intere)
  for (let key in sessionStorage) {
    if (keysToCheck.includes(key)) { // Verifica se la chiave corrente è presente nell'array keysToCheck
      let value = sessionStorage.getItem(key);
      if (isNaN(parseInt(value))) {
        for (let key in sessionStorage) {
          sessionStorage.setItem(key, "0");
          console.error("La chiave: " + key + " aveva valore diverso da una variabile di tipo int.");
          console.warn("I valori di tutte le chiavi sono impostati a 0.");
        }
        break;
      }
    }
  }
}, 100);