#!/bin/bash

npm start

# Avvia yarn install e yarn run dev in background
(yarn install && yarn run dev) &

# Attendi 1 secondi
sleep 1

# Cambia directory e avvia npm start nello stesso terminale
cd ServerService/MultiP-server
npm start
