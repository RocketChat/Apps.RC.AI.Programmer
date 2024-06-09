/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "./IProject";
export declare namespace FileTransformer {
    const transform: (environments: Omit<IProject, "context">) => (context: ts.TransformationContext) => (file: ts.SourceFile) => ts.SourceFile;
}
