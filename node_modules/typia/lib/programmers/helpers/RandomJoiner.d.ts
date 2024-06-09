/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../../schemas/metadata/Metadata";
import { MetadataObject } from "../../schemas/metadata/MetadataObject";
export declare namespace RandomJoiner {
    type Decoder = (meta: Metadata) => ts.Expression;
    const array: (coalesce: (method: string) => ts.Expression) => (decoder: Decoder) => (explore: IExplore) => (length: ts.Expression | undefined) => (item: Metadata) => ts.Expression;
    const tuple: (decoder: Decoder) => (elements: Metadata[]) => ts.ArrayLiteralExpression;
    const object: (coalesce: (method: string) => ts.Expression) => (decoder: Decoder) => (obj: MetadataObject) => ts.ConciseBody;
}
interface IExplore {
    function: boolean;
    recursive: boolean;
}
export {};
