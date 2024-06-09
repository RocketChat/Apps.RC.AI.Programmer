/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IMetadataComponents } from "../schemas/metadata/IMetadataComponents";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataAlias } from "../schemas/metadata/MetadataAlias";
import { MetadataArrayType } from "../schemas/metadata/MetadataArrayType";
import { MetadataObject } from "../schemas/metadata/MetadataObject";
import { MetadataTupleType } from "../schemas/metadata/MetadataTupleType";
export declare class MetadataCollection {
    private readonly options?;
    private readonly objects_;
    private readonly object_unions_;
    private readonly aliases_;
    private readonly arrays_;
    private readonly tuples_;
    private readonly names_;
    private object_index_;
    private recursive_array_index_;
    private recursive_tuple_index_;
    constructor(options?: Partial<MetadataCollection.IOptions> | undefined);
    aliases(): MetadataAlias[];
    objects(): MetadataObject[];
    unions(): MetadataObject[][];
    arrays(): MetadataArrayType[];
    tuples(): MetadataTupleType[];
    private getName;
    emplace(checker: ts.TypeChecker, type: ts.Type): [MetadataObject, boolean];
    emplaceAlias(checker: ts.TypeChecker, type: ts.Type, symbol: ts.Symbol): [MetadataAlias, boolean, (meta: Metadata) => void];
    emplaceArray(checker: ts.TypeChecker, type: ts.Type): [MetadataArrayType, boolean, (meta: Metadata) => void];
    emplaceTuple(checker: ts.TypeChecker, type: ts.TupleType): [MetadataTupleType, boolean, (elements: Metadata[]) => void];
    setTupleRecursive(tuple: MetadataTupleType, recursive: boolean): void;
    toJSON(): IMetadataComponents;
}
export declare namespace MetadataCollection {
    interface IOptions {
        replace?(str: string): string;
    }
    const replace: (str: string) => string;
    const escape: (str: string) => string;
}
