/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { MetadataAlias } from "../../../schemas/metadata/MetadataAlias";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_alias: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (type: ts.Type, nullable: boolean, explore: MetadataFactory.IExplore) => MetadataAlias;
