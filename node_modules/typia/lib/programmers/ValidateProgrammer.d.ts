/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../transformers/IProject";
export declare namespace ValidateProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (equals: boolean) => (type: ts.Type, name?: string) => ts.ArrowFunction;
}
