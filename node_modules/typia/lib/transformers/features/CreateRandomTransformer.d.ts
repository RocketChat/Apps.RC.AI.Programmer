/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../IProject";
export declare namespace CreateRandomTransformer {
    const transform: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (expression: ts.CallExpression) => ts.Expression;
}
