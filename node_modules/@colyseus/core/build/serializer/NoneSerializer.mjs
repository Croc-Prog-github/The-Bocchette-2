// packages/core/src/serializer/NoneSerializer.ts
var NoneSerializer = class {
  constructor() {
    this.id = "none";
  }
  reset(data) {
  }
  getFullState(client) {
    return null;
  }
  applyPatches(clients, state) {
    return false;
  }
};
export {
  NoneSerializer
};
