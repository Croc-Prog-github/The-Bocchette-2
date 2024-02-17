import { Client } from "./Client";
import * as httpie from "httpie";
export declare class HTTP {
    protected client: Client;
    authToken: string;
    constructor(client: Client);
    get<T = any>(path: string, options?: Partial<httpie.Options>): Promise<httpie.Response<T>>;
    post<T = any>(path: string, options?: Partial<httpie.Options>): Promise<httpie.Response<T>>;
    del<T = any>(path: string, options?: Partial<httpie.Options>): Promise<httpie.Response<T>>;
    put<T = any>(path: string, options?: Partial<httpie.Options>): Promise<httpie.Response<T>>;
    protected request(method: "get" | "post" | "put" | "del", path: string, options?: Partial<httpie.Options>): Promise<httpie.Response>;
    protected getOptions(options: Partial<httpie.Options>): Partial<httpie.Options>;
}
