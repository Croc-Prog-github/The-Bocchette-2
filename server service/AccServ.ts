//Script gestione account server

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const fileUrl = 'https://example.com/path/to/yourfile.txt'; // URL del file da scaricare
const savePath = 'C:\\Users\\princ\\Desktop\\TH2_Data\\yourfile.txt'; // Percorso in cui salvare il file

const downloadFile = (url: string, destination: string) => {
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
