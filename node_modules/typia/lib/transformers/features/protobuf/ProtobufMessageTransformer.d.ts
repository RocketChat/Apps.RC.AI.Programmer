/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../../IProject";
export declare namespace ProtobufMessageTransformer {
    const transform: (project: IProject) => (_modulo: ts.LeftHandSideExpression) => (expression: ts.CallExpression) => ts.Expression;
}
