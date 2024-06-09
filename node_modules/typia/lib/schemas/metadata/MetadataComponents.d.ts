import { IMetadataComponents } from "./IMetadataComponents";
import { IMetadataDictionary } from "./IMetadataDictionary";
import { MetadataAlias } from "./MetadataAlias";
import { MetadataArrayType } from "./MetadataArrayType";
import { MetadataObject } from "./MetadataObject";
import { MetadataTupleType } from "./MetadataTupleType";
export declare class MetadataComponents {
    readonly aliases: MetadataAlias[];
    readonly objects: MetadataObject[];
    readonly arrays: MetadataArrayType[];
    readonly tuples: MetadataTupleType[];
    readonly dictionary: IMetadataDictionary;
    private constructor();
    static from(json: IMetadataComponents): MetadataComponents;
    toJSON(): IMetadataComponents;
}
