import { IProtobufWriter } from "./IProtobufWriter";
export declare class $ProtobufSizer implements IProtobufWriter {
    /**
     * Total length.
     */
    len: number;
    /**
     * Position stack.
     */
    readonly pos: Array<number>;
    /**
     * Variable length list.
     */
    readonly varlen: Array<number>;
    /**
     * Variable length index stack.
     */
    readonly varlenidx: Array<number>;
    constructor(length?: number);
    bool(): void;
    int32(value: number): void;
    sint32(value: number): void;
    uint32(value: number): void;
    int64(value: bigint | number): void;
    sint64(value: bigint | number): void;
    uint64(value: bigint | number): void;
    float(_value: number): void;
    double(_value: number): void;
    bytes(value: Uint8Array): void;
    string(value: string): void;
    fork(): void;
    ldelim(): void;
    reset(): void;
    private varint32;
    private varint64;
}
