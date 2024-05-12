import Colyseus from "/workspaces/The-Bocchette-2/game/multiP/colyseus.js";

let client = new Colyseus.Client("ws://localhost:2567");

client.Create("room_name").then(room => {
  console.log(room.sessionId, "joined", room.name);
}).catch(e => {
  console.log("JOIN ERROR", e);
});