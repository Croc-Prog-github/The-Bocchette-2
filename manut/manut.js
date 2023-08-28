let manut = 0;

if (window.location.pathname.endsWith('/manut/manut.html')) {
  const TR = document.getElementById('TR');
  const text = 'Non molto'

  if (manut == 0) {
    TR.innerHTML = 'FATTO!';
    setInterval(() => {
      window.location.href = '/';
    }, 4000)
  } else if (manut == 1) {
    TR.innerHTML = text;
  }

  setInterval(() => {
    if (manut == 0) {
      TR.innerHTML = 'FATTO!';
      setInterval(() => {
        window.location.href = '/';
      }, 4000)
    } else if (manut == 1) {
      TR.innerHTML = text;
    }
    window.location.href = '/manut/manut.html';
  }, 5000);
} else if (manut == 1) { //Disconnette forzatamente in qualunque pag html con dentro: <script src="/manut/manut.js"></script>
  window.location.href = '/manut/manut.html';


  const TR = document.getElementById('TR');
  const text = 'Non molto'

  if (manut == 0) {
    TR.innerHTML = 'FATTO!';
    setInterval(() => {
      window.location.href = '/';
    }, 4000)
  } else if (manut == 1) {
    TR.innerHTML = text;
  }

  setInterval(() => {
    if (manut == 0) {
      TR.innerHTML = 'FATTO!';
      setInterval(() => {
        window.location.href = '/';
      }, 4000)
    } else if (manut == 1) {
      TR.innerHTML = text;
    }
    window.location.href = '/manut/manut.html';
  }, 5000);
}