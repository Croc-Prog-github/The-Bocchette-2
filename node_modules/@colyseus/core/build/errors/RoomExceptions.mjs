class OnCreateException extends Error {
  constructor(cause, message, options) {
    super(message, { cause });
    this.options = options;
    this.name = "OnCreateException";
  }
}
class OnAuthException extends Error {
  constructor(cause, message, client, options) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.name = "OnAuthException";
  }
}
class OnJoinException extends Error {
  constructor(cause, message, client, options, auth) {
    super(message, { cause });
    this.client = client;
    this.options = options;
    this.auth = auth;
    this.name = "OnJoinException";
  }
}
class OnLeaveException extends Error {
  constructor(cause, message, client, consented) {
    super(message, { cause });
    this.client = client;
    this.consented = consented;
    this.name = "OnLeaveException";
  }
}
class OnDisposeException extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "OnDisposeException";
  }
}
class OnMessageException extends Error {
  constructor(cause, message, client, payload, type) {
    super(message, { cause });
    this.client = client;
    this.payload = payload;
    this.type = type;
    this.name = "OnMessageException";
  }
}
class SimulationIntervalException extends Error {
  constructor(cause, message) {
    super(message, { cause });
    this.name = "SimulationIntervalException";
  }
}
class TimedEventException extends Error {
  constructor(cause, message, ...args) {
    super(message, { cause });
    this.name = "TimedEventException";
    this.args = args;
  }
}
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
