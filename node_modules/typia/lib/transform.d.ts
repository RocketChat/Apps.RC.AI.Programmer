/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IProject } from "./transformers/IProject";
import { ITransformOptions } from "./transformers/ITransformOptions";
export declare const transform: (program: ts.Program, options: ITransformOptions | undefined, extras: IProject["extras"]) => ts.TransformerFactory<ts.SourceFile>;
export default transform;
