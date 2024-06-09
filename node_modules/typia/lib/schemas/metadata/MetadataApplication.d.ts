import { IMetadataApplication } from "./IMetadataApplication";
import { Metadata } from "./Metadata";
import { MetadataComponents } from "./MetadataComponents";
export declare class MetadataApplication {
    readonly metadatas: Metadata[];
    readonly components: MetadataComponents;
    /**
     * @hidden
     */
    private constructor();
    static from(app: IMetadataApplication): MetadataApplication;
    toJSON(): IMetadataApplication;
}
