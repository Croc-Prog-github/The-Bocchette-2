let gemme = sessionStorage.getItem("gemme");
let soldi = sessionStorage.getItem("soldi");

let passP = sessionStorage.getItem("passP"); //Pass premium (aqcuistato)?
let obb = sessionStorage.getItem("obb"); //(n.) obbiettivi (del pass) conquistati
let gett = sessionStorage.getItem("gett"); //n. di gettoni (pass)


let tecnicUnlock =  sessionStorage.getItem("tecnicUnlock");//Tecniche Sbloccate (Acquisite)
let tecnicLock = sessionStorage.getItem("tecnicLock"); //Tecniche Bloccate (Da trovare o aquistare)
let evoluzUnlock = sessionStorage.getItem("evoluzUnlock"); //Evoluzioni Sbloccate
let evoluzLock = sessionStorage.getItem("evoluzLock"); //Evoluzioni Bloccate

if (1 > 0) {
  tecnicUnlock = ['dispersione', 'taglio netto', 'super taglio netto'];
  tecnicLock = ['rasengan', 'fulmine'];
  evoluzUnlock = [];
  evoluzLock = [];
}

function SS() {
  // Session Storage legato alle variabili
  sessionStorage.setItem("gemme", gemme);
  sessionStorage.setItem("soldi", soldi);
  sessionStorage.setItem("passP", passP);
  sessionStorage.setItem("obb", obb);
  sessionStorage.setItem("gett", gett);

  sessionStorage.setItem("tecnicUnlock", tecnicUnlock)
  sessionStorage.setItem("tecnicLock", tecnicLock)
  sessionStorage.setItem("evoluzUnlock", evoluzUnlock)
  sessionStorage.setItem("evoluzLock", evoluzLock)
}
//Da ora il Session Storage non è più controllato dal filtro dei soli numeri interi
setInterval(function() {
  SS();
  /*
  for (let key in sessionStorage) {
    let value = sessionStorage.getItem(key);
    if (isNaN(parseInt(value))) {
      for (let key in sessionStorage) {
        sessionStorage.setItem(key, "0");
        console.error("La chiave: " + key + " aveva valore != da variabile di tipo int.");
        console.warn("I valori di tutte le chiavi sono portati a 0.");
      }
      break;
    }
  }
  */
}, 100);