/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { ProtobufAtomic } from "../typings/ProtobufAtomic";
export declare namespace NumericRangeFactory {
    const number: (type: ProtobufAtomic.Numeric) => (input: ts.Expression) => ts.Expression;
    const bigint: (type: ProtobufAtomic.BigNumeric) => (input: ts.Expression) => ts.Expression;
}
