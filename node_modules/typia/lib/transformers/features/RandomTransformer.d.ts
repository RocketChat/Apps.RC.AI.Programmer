/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../IProject";
export declare namespace RandomTransformer {
    const transform: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (expression: ts.CallExpression) => ts.Expression;
}
