//import Colyseus from "/workspaces/The-Bocchette-2/game/multiP/colyseus.js";
import Colyseus from "https://unpkg.com/colyseus.js@^0.15.0/dist/colyseus.js";

function ConnectWithCode() {
  let client = new Colyseus.Client("ws://localhost:2567");

  client.create("battle", {/* options */}).then(room => {
    console.log("joined successfully", room);
  }).catch(e => {
    console.error("join error", e);
  });


  room.onStateChange((state) => {
    console.log(room.name, "has new state:", state);
  });
  room.onMessage("message_type", (message) => {
    console.log(room.sessionId, "received on", room.name, message);
  });
  room.onError((code, message) => {
    console.log(room.sessionId, "couldn't join", room.name);
  });
  room.onLeave((code) => {
    console.log(room.sessionId, "left", room.name);
  });
}



/*
const colyseus = require('colyseus');

export class MyRoom extends colyseus.Room {
    // (optional) Validate client auth token before joining/creating the room
    static async onAuth (token: Client, request: http.IncomingMessage) { }

    // When room is initialized
    onCreate (options) { }

    // When client successfully join the room
    onJoin (client, options, auth) { }

    // When a client leaves the room
    onLeave (client, consented) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}*/