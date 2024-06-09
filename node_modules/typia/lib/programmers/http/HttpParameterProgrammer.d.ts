/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../../schemas/metadata/Metadata";
import { IProject } from "../../transformers/IProject";
export declare namespace HttpParameterProgrammer {
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.ArrowFunction;
    const validate: (meta: Metadata) => string[];
}
