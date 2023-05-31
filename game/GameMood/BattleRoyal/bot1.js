let bot1 = document.getElementById("bot1");

//Sceglie la Bocchetta e la sua evoluzione in base al rango della partita

//Rileva la sua vita
let vitaBot1 = document.getElementById("vita_bot1").value;
if (vitaBot1 > 0) {
  bot1.hidden = false;

  //Cerca attorno a sè power-up
  
} else {
  bot1.hidden = true;
}

//Inizia a camminare...