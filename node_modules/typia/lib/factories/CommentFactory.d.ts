/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace CommentFactory {
    const description: (symbol: ts.Symbol, includeTags?: boolean) => string | undefined;
    const merge: (comments: ts.SymbolDisplayPart[]) => string;
}
