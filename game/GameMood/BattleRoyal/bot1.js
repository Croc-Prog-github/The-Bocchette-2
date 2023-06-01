let bot1 = document.getElementById("bot1");

//Sceglie la Bocchetta e la sua evoluzione in base al rango della partita


//Rileva la sua vita
let vitaBot1 = document.getElementById('vita_bot1').value;
if (vitaBot1 > 0) {
  bot1.hidden = false;

  //Cerca attorno a sè power-up
    bot1 = document.getElementById("bot1");
    const pwupElement = document.getElementById("PwUP");

    if (bot1 && pwupElement) {
      const botRect = bot1.getBoundingClientRect();
      const pwupRect = pwupElement.getBoundingClientRect();

      const distance = getDistance(botRect, pwupRect);

      if (distance <= 100) {
        console.log("Il div PwUP è all'interno del raggio di 100px da bot1.");
      } else {
        console.log("Il div PwUP non è all'interno del raggio di 100px da bot1.");
      }
    }
    function getDistance(rect1, rect2) {
      const dx = rect1.x - rect2.x;
      const dy = rect1.y - rect2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  //End

  
} else {
  bot1.hidden = true;
}

//Inizia a camminare...