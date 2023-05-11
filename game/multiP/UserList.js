const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function (event) {
  socket.send(JSON.stringify({
    type: 'login',
    username: localStorage.getItem('username')
  }));
});

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'connectedUsers':
      const connectedUsers = data.users;
      // Mostra gli username degli utenti connessi nella pagina
      break;
    // Altri tipi di messaggi
  }
});

socket.addEventListener('error', function (event) {
  console.log('WebSocket error', event);
});