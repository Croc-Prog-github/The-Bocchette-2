import debug from 'debug';
import { ServerError } from './errors/ServerError.mjs';

const debugMatchMaking = debug('colyseus:matchmaking');
const debugPatch = debug('colyseus:patch');
const debugError = debug('colyseus:errors');
const debugConnection = debug('colyseus:connection');
const debugDriver = debug('colyseus:driver');
const debugPresence = debug('colyseus:presence');
const debugAndPrintError = (e) => {
    const message = (e instanceof Error) ? e.stack : e;
    if (!(e instanceof ServerError)) {
        console.error(message);
    }
    debugError.call(debugError, message);
};

export { debugAndPrintError, debugConnection, debugDriver, debugError, debugMatchMaking, debugPatch, debugPresence };
//# sourceMappingURL=Debug.mjs.map
