/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { MetadataFactory } from "../../factories/MetadataFactory";
import { Metadata } from "../../schemas/metadata/Metadata";
import { IProject } from "../../transformers/IProject";
export declare namespace HttpQueryProgrammer {
    const INPUT_TYPE = "string | URLSearchParams";
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.ArrowFunction;
    const validate: (meta: Metadata, explore: MetadataFactory.IExplore) => string[];
}
