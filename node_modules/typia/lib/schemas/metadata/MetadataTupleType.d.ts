import { ClassProperties } from "../../typings/ClassProperties";
import { IMetadataTupleType } from "./IMetadataTupleType";
import { Metadata } from "./Metadata";
export declare class MetadataTupleType {
    readonly name: string;
    readonly elements: Metadata[];
    readonly index: number | null;
    readonly recursive: boolean;
    readonly nullables: boolean[];
    static create(props: ClassProperties<MetadataTupleType>): MetadataTupleType;
    isRest(): boolean;
    toJSON(): IMetadataTupleType;
}
