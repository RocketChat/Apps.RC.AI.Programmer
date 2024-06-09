/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { MetadataTupleType } from "../../../schemas/metadata/MetadataTupleType";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const emplace_metadata_tuple: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (type: ts.TupleType, nullable: boolean, explore: MetadataFactory.IExplore) => MetadataTupleType;
