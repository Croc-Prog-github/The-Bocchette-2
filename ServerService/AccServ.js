// Script gestione account server

const fileUrl = 'https://web-platform-a8hddt.stackblitz.io/style.css'; // URL del file da scaricare

function Salv() {

  fetch(fileUrl)
    .then(response => response.text())
    .then(data => {
      const savePath = 'example.htm'; // Non è possibile specificare un percorso su disco da un browser

      const blob = new Blob([data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.htm';
      a.textContent = 'Scarica il file';

      document.body.appendChild(a);
    })
    .catch(error => {
      console.error('Errore durante il download:', error);
    });
}