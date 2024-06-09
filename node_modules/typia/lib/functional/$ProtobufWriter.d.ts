import { $ProtobufSizer } from "./$ProtobufSizer";
import { IProtobufWriter } from "./IProtobufWriter";
export declare class $ProtobufWriter implements IProtobufWriter {
    /**
     * Related sizer
     */
    private readonly sizer;
    /**
     * Current pointer.
     */
    private ptr;
    /**
     * Protobuf buffer.
     */
    private buf;
    /**
     * DataView for buffer.
     */
    private view;
    /**
     * Index in varlen array from sizer.
     */
    private varlenidx;
    constructor(sizer: $ProtobufSizer);
    buffer(): Uint8Array;
    bool(value: boolean): void;
    byte(value: number): void;
    int32(value: number): void;
    sint32(value: number): void;
    uint32(value: number): void;
    sint64(value: number | bigint): void;
    int64(value: number | bigint): void;
    uint64(value: number | bigint): void;
    float(val: number): void;
    double(val: number): void;
    bytes(value: Uint8Array): void;
    string(value: string): void;
    fork(): void;
    ldelim(): void;
    finish(): Uint8Array;
    reset(): void;
    private variant32;
    private variant64;
    private varlen;
}
