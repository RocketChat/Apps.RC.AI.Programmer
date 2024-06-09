/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "./IProject";
export declare namespace CallExpressionTransformer {
    const transform: (project: IProject) => (expression: ts.CallExpression) => ts.Expression | null;
}
