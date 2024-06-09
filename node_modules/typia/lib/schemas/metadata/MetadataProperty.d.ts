import { IJsDocTagInfo } from "./IJsDocTagInfo";
import { IMetadataProperty } from "./IMetadataProperty";
import { Metadata } from "./Metadata";
export declare class MetadataProperty {
    readonly key: Metadata;
    readonly value: Metadata;
    readonly description: string | null;
    readonly jsDocTags: IJsDocTagInfo[];
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadataProperty;
}
