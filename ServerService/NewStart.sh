#!/bin/bash

# Avvia yarn install e yarn run dev in background
(yarn install && yarn run dev) &

# Attendi 5 secondi
sleep 5

# Cambia directory
cd ServerService/MultiP-server

# Avvia npm start in un nuovo terminale e usa localtunnel per esporre la porta
x-terminal-emulator -e "npm start" && npx localtunnel --port 2567