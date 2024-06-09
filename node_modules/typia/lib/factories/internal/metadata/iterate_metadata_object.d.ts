/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../../../schemas/metadata/Metadata";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const iterate_metadata_object: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (meta: Metadata, type: ts.Type, ensure?: boolean) => boolean;
