//import Colyseus from "/workspaces/The-Bocchette-2/game/multiP/colyseus.js";
import Colyseus from "https://unpkg.com/colyseus.js@^0.15.0/dist/colyseus.js";

let client = new Colyseus.Client("ws://localhost:2567");

client.Create("room_name").then(room => {
  console.log(room.sessionId, "joined", room.name);
}).catch(e => {
  console.log("JOIN ERROR", e);
});