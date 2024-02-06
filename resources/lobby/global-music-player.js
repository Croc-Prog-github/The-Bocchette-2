const audio = new Audio(localStorage.getItem('LobbyMusic'));
audio.loop = true;
audio.play();