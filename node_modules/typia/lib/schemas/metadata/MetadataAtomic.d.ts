import { ClassProperties } from "../../typings/ClassProperties";
import { IMetadataAtomic } from "./IMetadataAtomic";
import { IMetadataTypeTag } from "./IMetadataTypeTag";
export declare class MetadataAtomic {
    readonly type: "boolean" | "bigint" | "number" | "string";
    readonly tags: IMetadataTypeTag[][];
    private name_?;
    static create(props: ClassProperties<MetadataAtomic>): MetadataAtomic;
    static from(json: IMetadataAtomic): MetadataAtomic;
    getName(): string;
    toJSON(): IMetadataAtomic;
}
