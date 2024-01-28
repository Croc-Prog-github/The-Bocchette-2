import * as AWS from 'aws-sdk';
import * as fs from 'fs';

export function uploadToS3() {
  // Credenziali AWS
  AWS.config.update({
    accessKeyId: 'ACCESS_KEY',
    secretAccessKey: 'SECRET_KEY',
    region: 'us-east-1',
  });

  // Crea oggetto S3
  const s3 = new AWS.S3();
  // Nome del bucket S3
  const bucketName = 'IL_TUO_BUCKET_NAME';

  // Contenuto del file TXT da archiviare
  const fileContent = 'Questo è il contenuto del file TXT archiviato in cloud.';

  // Nome del file TXT
  const fileName = 'il_tuo_file.txt';

  // Parametri per il caricamento del file in S3
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  // Carica il file in S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Errore durante il caricamento del file:', err);
    } else {
      console.log('File caricato con successo:', data.Location);
    }
  });
}