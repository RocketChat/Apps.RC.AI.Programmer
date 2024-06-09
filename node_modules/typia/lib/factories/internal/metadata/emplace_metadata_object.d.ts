/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { MetadataObject } from "../../../schemas/metadata/MetadataObject";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_object: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (parent: ts.Type, nullable: boolean) => MetadataObject;
