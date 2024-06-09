/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IExpressionEntry } from "./IExpressionEntry";
export declare namespace CloneJoiner {
    const object: (input: ts.Expression, entries: IExpressionEntry<ts.Expression>[]) => ts.ConciseBody;
    const tuple: (children: ts.Expression[], rest: ts.Expression | null) => ts.Expression;
    const array: (input: ts.Expression, arrow: ts.Expression) => ts.CallExpression;
}
