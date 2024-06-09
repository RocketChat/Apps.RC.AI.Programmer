/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../transformers/IProject";
export declare namespace RandomProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (init?: ts.Expression) => (type: ts.Type, name?: string) => ts.ArrowFunction;
}
