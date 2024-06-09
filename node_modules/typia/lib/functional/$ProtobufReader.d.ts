import { ProtobufWire } from "../programmers/helpers/ProtobufWire";
export declare class $ProtobufReader {
    /**
     * Read buffer
     */
    private buf;
    /**
     * Read buffer pointer.
     */
    private ptr;
    /**
     * DataView for buffer.
     */
    private view;
    constructor(buf: Uint8Array);
    index(): number;
    size(): number;
    uint32(): number;
    int32(): number;
    sint32(): number;
    uint64(): bigint;
    int64(): bigint;
    sint64(): bigint;
    bool(): boolean;
    float(): number;
    double(): number;
    bytes(): Uint8Array;
    string(): string;
    skip(length: number): void;
    skipType(wireType: ProtobufWire): void;
    private varint32;
    private varint64;
    private u8;
    private u8n;
}
