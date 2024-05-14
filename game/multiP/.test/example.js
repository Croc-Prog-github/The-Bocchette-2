const colyseus = require('colyseus');
const schema = require('@colyseus/schema');

// An abstract player object, demonstrating a potential 2D world position
exports.Player = class Player extends schema.Schema {
  constructor() {
    super();
    this.x = 0.11;
    this.y = 2.22;
  }
}
schema.defineTypes(Player, {
  x: "number",
  y: "number",
});

// Our custom game state, an ArraySchema of type Player only at the moment
exports.State = class State extends schema.Schema {
  constructor() {
    super();
    this.players = new schema.MapSchema();
  }
}
defineTypes(State, {
  players: { map: Player }
});

exports.GameRoom = class GameRoom extends colyseus.Room {
  // Colyseus will invoke when creating the room instance
  onCreate(options) {
    // initialize empty room state
    this.setState(new State());

    // Called every time this room receives a "move" message
    this.onMessage("move", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.x += data.x;
      player.y += data.y;
      console.log(client.sessionId + " at, x: " + player.x, "y: " + player.y);
    });
  }

  // Called every time a client joins
  onJoin(client, options) {
    this.state.players.set(client.sessionId, new Player());
  }
}