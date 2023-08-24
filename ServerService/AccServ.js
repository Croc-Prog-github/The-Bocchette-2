// Script gestione account server

function Salve() {

  const fs = require('fs');
  const https = require('https');

  const fileUrl = 'https://example.com'; // URL del file da scaricare
  const savePath = 'C:\\Users\\princ\\Desktop\\TH2_Data\\example.htm'; // Percorso in cui salvare il file

  const downloadFile = (url, destination) => {
  const file = fs.createWriteStream(destination);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('File scaricato con successo.');
      });
    })
    .on('error', (err) => {
      fs.unlink(destination, () => {}); // Elimina il file se si verifica un errore durante il download
      console.error('Errore durante il download:', err.message);
    });
  };

  downloadFile(fileUrl, savePath);

}