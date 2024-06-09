/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace ExpressionFactory {
    const number: (value: number) => ts.NumericLiteral | ts.PrefixUnaryExpression;
    const bigint: (value: number | bigint) => ts.CallExpression;
    const isRequired: (input: ts.Expression) => ts.Expression;
    const isArray: (input: ts.Expression) => ts.Expression;
    const isObject: (options: {
        checkNull: boolean;
        checkArray: boolean;
    }) => (input: ts.Expression) => ts.Expression;
    const isInstanceOf: (type: string) => (input: ts.Expression) => ts.Expression;
    const coalesce: (x: ts.Expression) => (y: ts.Expression) => ts.Expression;
    const currying: (target: ts.Expression) => (parameters: ts.Expression[]) => ts.CallExpression;
    const selfCall: (body: ts.ConciseBody) => ts.CallExpression;
    const getEscapedText: (printer: ts.Printer) => (input: ts.Expression) => string;
    const transpile: (context: ts.TransformationContext) => (script: string) => (input: ts.Expression) => ts.Expression;
}
