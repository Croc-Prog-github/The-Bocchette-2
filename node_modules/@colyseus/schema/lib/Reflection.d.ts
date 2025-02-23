import { ArraySchema } from "./types/custom/ArraySchema";
import { Iterator } from "./encoding/decode";
import { Encoder } from "./encoder/Encoder";
import { Decoder } from "./decoder/Decoder";
import { Schema } from "./Schema";
/**
 * Reflection
 */
export declare class ReflectionField extends Schema {
    name: string;
    type: string;
    referencedType: number;
}
export declare class ReflectionType extends Schema {
    id: number;
    extendsId: number;
    fields: ArraySchema<ReflectionField>;
}
export declare class Reflection extends Schema {
    types: ArraySchema<ReflectionType>;
    rootType: number;
    /**
     * Encodes the TypeContext of an Encoder into a buffer.
     *
     * @param encoder Encoder instance
     * @param it
     * @returns
     */
    static encode(encoder: Encoder, it?: Iterator): Buffer;
    /**
     * Decodes the TypeContext from a buffer into a Decoder instance.
     *
     * @param bytes Reflection.encode() output
     * @param it
     * @returns Decoder instance
     */
    static decode<T extends Schema = Schema>(bytes: Buffer, it?: Iterator): Decoder<T>;
}
