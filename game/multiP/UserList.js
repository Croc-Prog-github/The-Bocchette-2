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
        userDiv.style.backgroundColor = 'dodgerblue';
        userDiv.style.marginInline = '5px';
        userDiv.style.display = 'flex';
        userDiv.style.flexDirection = 'row';
        userDiv.style.justifyContent = 'space-between';
        userDiv.style.alignItems = 'stretch';
        userDiv.style.marginTop = '5px';

        const usernameElement = document.createElement('x');
        usernameElement.style.color = 'white';
        usernameElement.id = 'BUser';
        usernameElement.textContent = username;

        const inviteButton = document.createElement('button');
        inviteButton.style.background = 'limegreen';
        inviteButton.style.borderStyle = 'revert';
        inviteButton.style.cursor = 'pointer';
        inviteButton.textContent = 'Invita';

        userDiv.appendChild(usernameElement);
        userDiv.appendChild(inviteButton);
        userOnlineDiv.appendChild(userDiv);
      });
      break;
    // Altri tipi di messaggi
  }
};