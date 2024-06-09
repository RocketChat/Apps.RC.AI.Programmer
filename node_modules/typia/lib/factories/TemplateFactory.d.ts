/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare namespace TemplateFactory {
    const generate: (expressions: ts.Expression[]) => ts.Expression;
}
