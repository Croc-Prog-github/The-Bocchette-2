const colyseus = require('colyseus');
const http = require('https');
const express = require('express');
const port = process.env.PORT || 2567;

class MyRoom extends colyseus.Room {
  onCreate(options) {
    console.log("Room created:", this.roomId);
  }

  onJoin(client, options) {
    console.log("Player joined:", client.sessionId);
  }

  onLeave(client, consented) {
    console.log("Player left:", client.sessionId);
  }

  onDispose() {
    console.log("Room disposed");
  }
}

const app = express();
const server = http.createServer(app);
const gameServer = new colyseus.Server({
  server: server,
});

gameServer.define('my_room', MyRoom);

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);