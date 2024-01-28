"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
// Credenziali AWS
AWS.config.update({
    accessKeyId: 'AKIAZH7DXZ32EBBQOMVJ',
    secretAccessKey: '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',
    region: 'us-east-1',
});
// Crea oggetto S3
var s3 = new AWS.S3();
// Nome del bucket S3
var bucketName = 'IL_TUO_BUCKET_NAME';
// Contenuto del file TXT da archiviare
var fileContent = 'Questo è il contenuto del tuo file TXT con credenziali e dati.';
// Nome del file TXT
var fileName = 'il_tuo_file.txt';
// Parametri per il caricamento del file in S3
var params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
};
// Carica il file in S3
s3.upload(params, function (err, data) {
    if (err) {
        console.error('Errore durante il caricamento del file:', err);
    }
    else {
        console.log('File caricato con successo:', data.Location);
    }
});
