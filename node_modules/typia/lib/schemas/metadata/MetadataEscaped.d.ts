import { IMetadataEscaped } from "./IMetadataEscaped";
import { Metadata } from "./Metadata";
export declare class MetadataEscaped {
    readonly original: Metadata;
    readonly returns: Metadata;
    /**
     * @hidden
     */
    private constructor();
    getName(): string;
    toJSON(): IMetadataEscaped;
}
