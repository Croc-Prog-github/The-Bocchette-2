#!/bin/bash

# Avvia yarn install e yarn run dev in background
(npm install && npm run publish) &

# Attendi 1 secondi
sleep 1

# Cambia directory e avvia npm start nello stesso terminale
cd ServerService/MultiP-server
npm start

echo "Nota: Non sei nella index del progetto."