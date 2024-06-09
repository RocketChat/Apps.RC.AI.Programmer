/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../../transformers/IProject";
export declare namespace NotationGeneralProgrammer {
    const returnType: (rename: (str: string) => string) => (type: string) => string;
    const write: (rename: (str: string) => string) => (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string | undefined) => ts.ArrowFunction;
}
