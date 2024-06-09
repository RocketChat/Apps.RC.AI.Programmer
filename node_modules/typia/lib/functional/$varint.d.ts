export declare function $varint_decode_i32(buf: Uint8Array, offset: number): [value: number, offset: number];
export declare function $varint_decode_u32(buf: Uint8Array, offset: number): [value: number, offset: number];
export declare function $varint_decode_i64(buf: Uint8Array, offset: number): [value: bigint, offset: number];
export declare function $varint_decode_u64(buf: Uint8Array, offset: number): [value: bigint, offset: number];
export declare function $varint_encode(dst: Uint8Array, offset: number, value: number): number;
export declare function $varint_encode(dst: Uint8Array, offset: number, value: bigint): number;
