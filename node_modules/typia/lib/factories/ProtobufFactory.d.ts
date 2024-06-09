/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataCollection } from "./MetadataCollection";
export declare namespace ProtobufFactory {
    const metadata: (method: string) => (checker: ts.TypeChecker, context?: ts.TransformationContext) => (collection: MetadataCollection) => (type: ts.Type) => Metadata;
}
