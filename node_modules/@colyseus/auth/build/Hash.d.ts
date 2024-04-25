type HashPasswordAlgorihtm = (password: string, salt?: string) => Promise<string> | string;
type HashAlgorithm = "sha1" | "scrypt" | string;
export declare class Hash {
    static algorithm: HashAlgorithm;
    static algorithms: {
        [id: HashAlgorithm]: HashPasswordAlgorihtm;
    };
    /**
     * Make a hash from a password
     *
     * @param password Password to be hashed
     * @param salt Password salt
     *
     * @returns Hashed password
     */
    static make(password: string, salt?: string): Promise<string>;
}
export {};
