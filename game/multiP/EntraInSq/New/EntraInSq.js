const Colyseus = require('colyseus.js');

// Inizializza il client Colyseus
const client = new Colyseus.Client('ws://localhost:2567');

async function EntraInSq() {
  try {
    const room = await client.create('my_room');
    document.getElementById('roomId').innerText = room.id;
    document.getElementById('sessionId').innerText = room.sessionId;

    room.onJoin(() => {
      console.log("Joined successfully: ", room);
    });

  } catch (e) {
    // Gestisci eventuali errori
    console.error("Join error", e);
  }
}

// Esporta la funzione se necessario
module.exports = { EntraInSq };
