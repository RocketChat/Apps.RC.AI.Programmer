/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../../../schemas/metadata/Metadata";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const explore_metadata: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (type: ts.Type | null, explore: MetadataFactory.IExplore) => Metadata;
