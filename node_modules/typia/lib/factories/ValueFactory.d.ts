/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace ValueFactory {
    const NULL: () => ts.NullLiteral;
    const UNDEFINED: () => ts.Identifier;
    const BOOLEAN: (value: boolean) => ts.FalseLiteral | ts.TrueLiteral;
    const INPUT: (str?: string) => ts.Identifier;
    const TYPEOF: (input: ts.Expression) => ts.TypeOfExpression;
}
