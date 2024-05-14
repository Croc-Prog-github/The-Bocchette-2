// Importa Colyseus
const { Server } = require("colyseus");

// Crea una nuova istanza del server Colyseus
const server = new Server();

// Definisci una classe per la tua stanza di gioco
class MyRoom extends Room {
  // Implementa la logica per la creazione della stanza
  onCreate(options) {
    // Genera un RoomId univoco
    const roomId = generateUniqueId();

    // Crea la stanza con il RoomId generato
    this.setState({ roomId });

    // Assegna un SessionId al giocatore
    const sessionId = generateUniqueId();
    this.assignSessionId(this.connectedClients[0], sessionId);

    // Invia RoomId e SessionId al giocatore
    this.sendToClient(this.connectedClients[0], { roomId, sessionId });
  }
}

// Registra la tua stanza con il server Colyseus
server.define("my_room", MyRoom);

// Avvia il server sulla porta desiderata
server.listen(2567);