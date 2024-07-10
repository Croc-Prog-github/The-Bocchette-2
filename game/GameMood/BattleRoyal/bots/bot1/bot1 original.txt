const bot1 = document.getElementById('bot1');

// Rileva la vita
const vitaBot1 = document.getElementById('vita_bot1');
const vitaValue = parseInt(vitaBot1.value);

let N_distance = 100;
//N_distance += 50;
if (vitaValue === 100) {
  bot1.hidden = false;
  
  // Cerca attorno a sé un power-up
  const PwUP = document.getElementById("PwUP");

  if (bot1 && PwUP) {
    const botRect = bot1.getBoundingClientRect();
    const pwupRect = PwUP.getBoundingClientRect();
    const distance = getDistance(botRect, pwupRect);

    if (distance <= N_distance) {
      console.log("Bot 1 ha rilevato un Power-up a " + distance + " px di distanza");
    } else {
      console.log("Il Power-up non è all'interno del raggio di " + distance + " px da bot1.");
    }

    function getDistance(rect1, rect2) {
      const dx = rect1.x - rect2.x;
      const dy = rect1.y - rect2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
} else {
  bot1.hidden = true;
}