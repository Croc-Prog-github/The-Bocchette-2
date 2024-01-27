let username = sessionStorage.getItem('username');

let gemme = sessionStorage.getItem("gemme");
let soldi = sessionStorage.getItem("soldi");
let passP = sessionStorage.getItem("passP"); //Pass premium (aqcuistato)?
let obb = sessionStorage.getItem("obb"); //(n.) obbiettivi (del pass) conquistati
let gett = sessionStorage.getItem("gett"); //n. di gettoni (pass)

let NCassCom = parseInt(sessionStorage.getItem("NCassCom"), 10); //n. casse comuni (il n. 10 è inteso come b dei logaritmi)
let NCassRar = parseInt(sessionStorage.getItem("NCassRar"), 10); //n. casse comuni (il n. 10 è inteso come b dei logaritmi)


let tecnicUnlock = sessionStorage.getItem("tecnicUnlock");//Tecniche Sbloccate (Acquisite)
let tecnicLockCom = sessionStorage.getItem("tecnicLockCom"); //TecnicheComuni Bloccate (Da trovare o aquistare)
let evoluzUnlock = sessionStorage.getItem("evoluzUnlock"); //Evoluzioni Sbloccate
let evoluzLock = sessionStorage.getItem("evoluzLock"); //Evoluzioni Bloccate

function setArrayTeE() { //Settig iniziale Tecniche e Evoluzioni
  //
}
tecnicUnlock = ['dispersione', 'taglio netto', 'super taglio netto'];
tecnicLockCom = ['rasengan', 'fulmine'];
evoluzUnlock = [];
evoluzLock = [];

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

  sessionStorage.setItem("NCassCom", NCassCom);
  sessionStorage.setItem("NCassRar", NCassRar)

  //Aggiorna i singoli array di dati
  sessionStorage.setItem("tecnicUnlock", JSON.stringify(tecnicUnlock));
  sessionStorage.setItem("tecnicLockCom", JSON.stringify(tecnicLockCom));

  sessionStorage.setItem("evoluzUnlock", evoluzUnlock);
  sessionStorage.setItem("evoluzLock", evoluzLock);
};
//Ulime modifiche: solo le chiavi nominate in keysToCheck sono soggette a controllo del valore 0, le alte vengono ignorate
const keysToCheck = ['obb', 'gett', 'soldi', 'passP', 'gemme', 'NCassCom', 'NCassRar'];
setInterval(function () {
  for (let key of keysToCheck) {
    let value = sessionStorage.getItem(key);
    if (value === null || isNaN(parseInt(value))) {
      sessionStorage.setItem(key, "0");
      console.error("La chiave: " + key + " aveva un valore non valido o mancante.");
      console.warn("Il valore di " + key + " è stato impostato a 0.");
    }
  }
  SS();
}, 100);

// Categorizzare contatori delle casse come Int (Micro debug)
parseInt(NCassCom, 10);
parseInt(NCassRar, 10);
NCassCom += 0;
NCassRar += 0;
if (NCassCom < 0) {NCassCom = 0};
if (NCassRar < 0) {NCassRar = 0};