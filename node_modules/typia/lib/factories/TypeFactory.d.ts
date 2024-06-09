/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace TypeFactory {
    const isFunction: (type: ts.Type) => boolean;
    const getReturnType: (checker: ts.TypeChecker) => (type: ts.Type) => (name: string) => ts.Type | null;
    const getFullName: (checker: ts.TypeChecker) => (type: ts.Type, symbol?: ts.Symbol) => string;
    const keyword: (type: "void" | "any" | "unknown" | "boolean" | "number" | "bigint" | "string") => ts.KeywordTypeNode<ts.SyntaxKind.VoidKeyword | ts.SyntaxKind.AnyKeyword | ts.SyntaxKind.BooleanKeyword | ts.SyntaxKind.NumberKeyword | ts.SyntaxKind.StringKeyword | ts.SyntaxKind.UnknownKeyword | ts.SyntaxKind.BigIntKeyword>;
}
