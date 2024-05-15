// Funzione per gestire la creazione di una nuova stanza
function CreaCodSq() {
  // Fai una richiesta al server per creare una nuova stanza
  fetch('http://127.0.0.1:2567/')
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