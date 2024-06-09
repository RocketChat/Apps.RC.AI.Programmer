/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataAlias } from "../schemas/metadata/MetadataAlias";
import { MetadataArrayType } from "../schemas/metadata/MetadataArrayType";
import { MetadataObject } from "../schemas/metadata/MetadataObject";
import { MetadataTupleType } from "../schemas/metadata/MetadataTupleType";
import { ValidationPipe } from "../typings/ValidationPipe";
import { MetadataCollection } from "./MetadataCollection";
export declare namespace MetadataFactory {
    type Validator = (meta: Metadata, explore: IExplore) => string[];
    interface IOptions {
        escape: boolean;
        constant: boolean;
        absorb: boolean;
        validate?: Validator;
        onError?: (node: ts.Node | undefined, message: string) => void;
    }
    interface IExplore {
        top: boolean;
        object: MetadataObject | null;
        property: string | object | null;
        nested: null | MetadataAlias | MetadataArrayType | MetadataTupleType;
        escaped: boolean;
        aliased: boolean;
    }
    interface IError {
        name: string;
        explore: IExplore;
        messages: string[];
    }
    const analyze: (checker: ts.TypeChecker, context?: ts.TransformationContext) => (options: IOptions) => (collection: MetadataCollection) => (type: ts.Type | null) => ValidationPipe<Metadata, IError>;
}
