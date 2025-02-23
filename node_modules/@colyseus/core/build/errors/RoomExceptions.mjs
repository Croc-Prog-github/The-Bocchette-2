// packages/core/src/errors/RoomExceptions.ts
var OnCreateException = class extends Error {
  constructor(cause, message, options) {
    super(message, { cause });
    this.options = options;
    this.name = "OnCreateException";
  }
};
var OnAuthException = class extends Error {
  constructor(cause, message, client, options) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.name = "OnAuthException";
  }
};
var OnJoinException = class extends Error {
  constructor(cause, message, client, options, auth) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.auth = auth;
    this.name = "OnJoinException";
  }
};
var OnLeaveException = class extends Error {
  constructor(cause, message, client, consented) {
    super(message, { cause });
    this.client = client;
    this.consented = consented;
    this.name = "OnLeaveException";
  }
};
var OnDisposeException = class extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "OnDisposeException";
  }
};
var OnMessageException = class extends Error {
  constructor(cause, message, client, payload, type) {
    super(message, { cause });
    this.client = client;
    this.payload = payload;
    this.type = type;
    this.name = "OnMessageException";
  }
};
var SimulationIntervalException = class extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "SimulationIntervalException";
  }
};
var TimedEventException = class extends Error {
  constructor(cause, message, ...args) {
    super(message, { cause });
    this.name = "TimedEventException";
    this.args = args;
  }
};
export {
  OnAuthException,
  OnCreateException,
  OnDisposeException,
  OnJoinException,
  OnLeaveException,
  OnMessageException,
  SimulationIntervalException,
  TimedEventException
};
