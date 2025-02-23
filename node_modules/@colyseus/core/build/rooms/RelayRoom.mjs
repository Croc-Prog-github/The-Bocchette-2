// packages/core/src/rooms/RelayRoom.ts
import { defineTypes, MapSchema, Schema } from "@colyseus/schema";
import { Room } from "../Room.mjs";
var Player = class extends Schema {
};
defineTypes(Player, {
  connected: "boolean",
  name: "string",
  sessionId: "string"
});
var State = class extends Schema {
  constructor() {
    super(...arguments);
    // tslint:disable-line
    this.players = new MapSchema();
  }
};
defineTypes(State, {
  players: { map: Player }
});
var RelayRoom = class extends Room {
  constructor() {
    super(...arguments);
    // tslint:disable-line
    this.allowReconnectionTime = 0;
  }
  onCreate(options) {
    this.setState(new State());
    if (options.maxClients) {
      this.maxClients = options.maxClients;
    }
    if (options.allowReconnectionTime) {
      this.allowReconnectionTime = Math.min(options.allowReconnectionTime, 40);
    }
    if (options.metadata) {
      this.setMetadata(options.metadata);
    }
    this.onMessage("*", (client, type, message) => {
      this.broadcast(type, [client.sessionId, message], { except: client });
    });
  }
  onJoin(client, options = {}) {
    const player = new Player();
    player.connected = true;
    player.sessionId = client.sessionId;
    if (options.name) {
      player.name = options.name;
    }
    this.state.players.set(client.sessionId, player);
  }
  async onLeave(client, consented) {
    if (this.allowReconnectionTime > 0) {
      const player = this.state.players.get(client.sessionId);
      player.connected = false;
      try {
        if (consented) {
          throw new Error("consented leave");
        }
        await this.allowReconnection(client, this.allowReconnectionTime);
        player.connected = true;
      } catch (e) {
        this.state.players.delete(client.sessionId);
      }
    }
  }
};
export {
  RelayRoom
};
