/*Old ID
  roomId; SquadInp; createRoom
*/

const Colyseus = require('colyseus.js');
const client = new Colyseus.Client('ws://localhost:2567');

document.getElementById('createRoom').addEventListener('click', async () => { 
});

async function EntraInSq() {
  try {
    const room = await client.create('my_room');
    document.getElementById('roomId').innerText = room.id;
    document.getElementById('sessionId').innerText = room.sessionId;

    room.onJoin(() => {
      console.log("Joined successfully: ", room);
    });

  } catch (e) {
    console.error("Join error", e);
  }
}