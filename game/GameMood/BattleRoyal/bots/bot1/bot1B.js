document.addEventListener('DOMContentLoaded', () => {
  const bot1 = document.getElementById('bot1');
  const mover = new MoverTS(bot1);

  mover.glideAtIdElement('', 5)
})