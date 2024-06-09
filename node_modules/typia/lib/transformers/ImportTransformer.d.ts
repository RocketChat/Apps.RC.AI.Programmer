/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace ImportTransformer {
    const transform: (from: string) => (to: string) => (context: ts.TransformationContext) => (file: ts.SourceFile) => ts.SourceFile;
}
