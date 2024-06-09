import { IJsDocTagInfo } from "./IJsDocTagInfo";
import { IMetadataObject } from "./IMetadataObject";
import { MetadataProperty } from "./MetadataProperty";
export declare class MetadataObject {
    readonly name: string;
    readonly properties: Array<MetadataProperty>;
    readonly description: string | undefined;
    readonly jsDocTags: IJsDocTagInfo[];
    readonly index: number;
    validated: boolean;
    recursive: boolean;
    nullables: boolean[];
    /**
     * @hidden
     */
    private constructor();
    toJSON(): IMetadataObject;
}
