/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "../../transformers/IProject";
export declare namespace MiscLiteralsProgrammer {
    const write: (project: IProject) => (type: ts.Type) => ts.AsExpression;
}
