const socket = new WebSocket('ws://localhost:5173');

socket.onopen = function(event) {
  // Dopo aver effettuato il login dell'utente
  socket.send(JSON.stringify({
    type: 'login',
    username: sessionStorage.getItem('username')
  }));

  // Quando l'utente accede alla pagina degli utenti online
  socket.send(JSON.stringify({
    type: 'getConnectedUsers'
  }));
};

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'connectedUsers':
      const connectedUsers = data.users;
      const userOnlineDiv = document.getElementById('UserOnline');
      userOnlineDiv.innerHTML = '';
      connectedUsers.forEach(username => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<div style="background-color: dodgerblue; margin-inline: 5px; display: flex; flex-direction: row; justify-content: space-between; align-items: stretch; margin-top: 5px;"><x style="color: white;" id="BUser">${username}</x><button style="background: limegreen; border-style: revert; cursor: pointer;">Invita</button></div>`;
        userOnlineDiv.appendChild(userDiv);
      });
      break;
    // Altri tipi di messaggi
  }
};