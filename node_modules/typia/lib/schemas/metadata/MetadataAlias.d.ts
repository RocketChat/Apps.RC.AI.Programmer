import { IJsDocTagInfo } from "./IJsDocTagInfo";
import { IMetadataAlias } from "./IMetadataAlias";
import { Metadata } from "./Metadata";
export declare class MetadataAlias {
    readonly name: string;
    readonly value: Metadata;
    readonly description: string | null;
    readonly jsDocTags: IJsDocTagInfo[];
    readonly recursive: boolean;
    readonly nullables: boolean[];
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadataAlias;
}
