import { ClassProperties } from "../../typings/ClassProperties";
import { IMetadataArray } from "./IMetadataArray";
import { IMetadataTypeTag } from "./IMetadataTypeTag";
import { MetadataArrayType } from "./MetadataArrayType";
export declare class MetadataArray {
    readonly type: MetadataArrayType;
    readonly tags: IMetadataTypeTag[][];
    private name_?;
    /**
     * @hidden
     */
    private constructor();
    static create(props: ClassProperties<MetadataArray>): MetadataArray;
    getName(): string;
    toJSON(): IMetadataArray;
}
