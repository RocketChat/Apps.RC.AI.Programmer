/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace StatementFactory {
    const mut: (name: string, initializer?: ts.Expression) => ts.VariableStatement;
    const constant: (name: string, initializer?: ts.Expression) => ts.VariableStatement;
    const entry: (key: string) => (value: string) => ts.VariableDeclarationList;
    const transpile: (script: string) => ts.ExpressionStatement;
    const block: (expression: ts.Expression) => ts.Block;
}
