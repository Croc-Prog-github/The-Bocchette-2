import { HTTP } from "./HTTP";
export interface AuthSettings {
    path: string;
    key: string;
}
export interface PopupSettings {
    prefix: string;
    width: number;
    height: number;
}
export interface AuthData {
    user: any;
    token: string;
}
export declare class Auth {
    #private;
    protected http: HTTP;
    settings: AuthSettings;
    constructor(http: HTTP);
    set token(token: string);
    get token(): string;
    onChange(callback: (response: AuthData) => void): () => void;
    getUserData(): Promise<any>;
    registerWithEmailAndPassword(email: string, password: string, options?: any): Promise<any>;
    signInWithEmailAndPassword(email: string, password: string): Promise<any>;
    signInAnonymously(options?: any): Promise<any>;
    sendPasswordResetEmail(email: string): Promise<any>;
    signInWithProvider(providerName: string, settings?: Partial<PopupSettings>): Promise<unknown>;
    signOut(): Promise<void>;
    private emitChange;
}
