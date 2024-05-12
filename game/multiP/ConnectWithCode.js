//import Colyseus from "/workspaces/The-Bocchette-2/game/multiP/colyseus.js";
import Colyseus from "https://unpkg.com/colyseus.js@^0.15.0/dist/colyseus.js";

let client = new Colyseus.Client("ws://localhost:2567");

client.Create("room_name").then(room => {
  console.log(room.sessionId, "joined", room.name);
}).catch(e => {
  console.log("JOIN ERROR", e);
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
