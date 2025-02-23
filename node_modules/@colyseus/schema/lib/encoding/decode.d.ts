/**
 * Copyright (c) 2018 Endel Dreyer
 * Copyright (c) 2014 Ion Drive Software Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 */
import type { BufferLike } from "./encode";
/**
 * msgpack implementation highly based on notepack.io
 * https://github.com/darrachequesne/notepack
 */
export interface Iterator {
    offset: number;
}
declare function utf8Read(bytes: BufferLike, it: Iterator, length: number): string;
declare function int8(bytes: BufferLike, it: Iterator): number;
declare function uint8(bytes: BufferLike, it: Iterator): any;
declare function int16(bytes: BufferLike, it: Iterator): number;
declare function uint16(bytes: BufferLike, it: Iterator): number;
declare function int32(bytes: BufferLike, it: Iterator): number;
declare function uint32(bytes: BufferLike, it: Iterator): number;
declare function float32(bytes: BufferLike, it: Iterator): number;
declare function float64(bytes: BufferLike, it: Iterator): number;
declare function int64(bytes: BufferLike, it: Iterator): number;
declare function uint64(bytes: BufferLike, it: Iterator): number;
declare function bigint64(bytes: BufferLike, it: Iterator): bigint;
declare function biguint64(bytes: BufferLike, it: Iterator): bigint;
declare function boolean(bytes: BufferLike, it: Iterator): boolean;
declare function string(bytes: BufferLike, it: Iterator): string;
declare function number(bytes: BufferLike, it: Iterator): any;
export declare function stringCheck(bytes: BufferLike, it: Iterator): boolean;
export declare const decode: {
    utf8Read: typeof utf8Read;
    int8: typeof int8;
    uint8: typeof uint8;
    int16: typeof int16;
    uint16: typeof uint16;
    int32: typeof int32;
    uint32: typeof uint32;
    float32: typeof float32;
    float64: typeof float64;
    int64: typeof int64;
    uint64: typeof uint64;
    bigint64: typeof bigint64;
    biguint64: typeof biguint64;
    boolean: typeof boolean;
    string: typeof string;
    number: typeof number;
    stringCheck: typeof stringCheck;
};
export {};
