// Funzione per gestire la creazione di una nuova stanza
function createNewRoom() {
  // Fai una richiesta al server per creare una nuova stanza
  fetch('http://localhost:2567/createRoom')
    .then(response => response.json())
    .then(data => {
      // Aggiorna l'interfaccia utente con RoomId e SessionId ottenuti dal server
      document.getElementById('roomId').textContent = data.roomId;
      document.getElementById('sessionId').textContent = data.sessionId;
    })
    .catch(error => {
      console.error('Error creating room:', error);
    });
}