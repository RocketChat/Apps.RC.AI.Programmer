/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { MetadataObject } from "../../schemas/metadata/MetadataObject";
import { IExpressionEntry } from "./IExpressionEntry";
export declare namespace PruneJoiner {
    const object: (input: ts.Expression, entries: IExpressionEntry[], obj: MetadataObject) => ts.ConciseBody;
    const array: (input: ts.Expression, arrow: ts.ArrowFunction) => ts.CallExpression;
    const tuple: (children: ts.ConciseBody[], rest: ts.ConciseBody | null) => ts.Block;
}
