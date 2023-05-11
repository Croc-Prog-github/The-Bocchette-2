const socket = new WebSocket('ws://localhost:3000');

// Dopo aver effettuato il login dell'utente
socket.send(JSON.stringify({
  type: 'login',
  username: localStorage.getItem('username')
}));

// Quando l'utente accede alla pagina degli utenti online
socket.send(JSON.stringify({
  type: 'getConnectedUsers'
}));

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'connectedUsers':
      const connectedUsers = data.users;
      // Mostra gli username degli utenti connessi nella pagina
      break;
    // Altri tipi di messaggi
  }
};