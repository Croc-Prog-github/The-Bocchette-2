/*New ID
  roomId; SquadInp; createRoom (Non presente in html)
*/

const Colyseus = require('colyseus.js');
const client = new Colyseus.Client('ws://localhost:2567');

document.getElementById('createRoom').addEventListener('click', async () => { 
});

function CreaCodSq() {
  EntraInSq(0);
  document.getElementById('roomId').style.display = 'block';
  document.getElementById('SquadInp').value = '';
  ToggleButton();

  //...
}

