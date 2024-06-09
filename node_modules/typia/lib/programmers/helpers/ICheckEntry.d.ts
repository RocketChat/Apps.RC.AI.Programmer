/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export interface ICheckEntry {
    expected: string;
    expression: ts.Expression | null;
    conditions: ICheckEntry.ICondition[][];
}
export declare namespace ICheckEntry {
    interface ICondition {
        expected: string;
        expression: ts.Expression;
    }
}
