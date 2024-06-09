/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataCollection } from "./MetadataCollection";
export declare namespace JsonMetadataFactory {
    const analyze: (method: string) => (checker: ts.TypeChecker, context?: ts.TransformationContext) => (type: ts.Type) => [MetadataCollection, Metadata];
    const validate: (meta: Metadata) => string[];
}
