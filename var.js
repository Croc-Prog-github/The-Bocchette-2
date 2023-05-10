let gemme = sessionStorage.getItem("gemme");
let soldi = sessionStorage.getItem("soldi");

let passP = sessionStorage.getItem("passP"); //Pass premium (aqcuistato)?
let obb = sessionStorage.getItem("obb"); //(n.) obbiettivi (del pass) conquistati
let gett = sessionStorage.getItem("gett"); //n. di gettoni (pass)

function SS() {
  // Session Storage legato alle variabili
  sessionStorage.setItem("gemme", gemme);
  sessionStorage.setItem("soldi", soldi);
  sessionStorage.setItem("passP", passP);
  sessionStorage.setItem("obb", obb);
  sessionStorage.setItem("gett", gett);
}
setInterval(function() {
  SS();
  for (let key in sessionStorage) {
    /*if (key === "username") {
      continue;
    }*/
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
}, 100);