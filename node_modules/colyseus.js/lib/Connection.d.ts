import { ITransport, ITransportEventMap } from "./transport/ITransport";
export declare class Connection implements ITransport {
    transport: ITransport;
    events: ITransportEventMap;
    constructor(protocol?: string);
    connect(url: string, options?: any): void;
    send(data: Buffer | Uint8Array): void;
    sendUnreliable(data: Buffer | Uint8Array): void;
    close(code?: number, reason?: string): void;
    get isOpen(): boolean;
}
