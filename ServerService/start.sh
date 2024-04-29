#!/bin/bash

# Avvia yarn install e yarn run dev in background
(yarn install && yarn run dev) &

# Attendi 5 secondi
sleep 5

# Cambia directory e avvia npm start in un nuovo terminale
cd ServerService/MultiP-server

# Avvia npm start utilizzando il terminale di macOS (Terminal.app)
open -a Terminal.app npm start