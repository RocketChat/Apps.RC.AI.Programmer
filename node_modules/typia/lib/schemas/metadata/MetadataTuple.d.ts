import { IMetadataTuple } from "./IMetadataTuple";
import { IMetadataTypeTag } from "./IMetadataTypeTag";
import { MetadataTupleType } from "./MetadataTupleType";
export declare class MetadataTuple {
    readonly type: MetadataTupleType;
    readonly tags: IMetadataTypeTag[][];
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadataTuple;
}
