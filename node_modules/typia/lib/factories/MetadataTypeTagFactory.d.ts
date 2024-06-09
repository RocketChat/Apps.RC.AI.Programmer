import { IMetadataTypeTag } from "../schemas/metadata/IMetadataTypeTag";
import { MetadataObject } from "../schemas/metadata/MetadataObject";
import { MetadataFactory } from "./MetadataFactory";
export declare namespace MetadataTypeTagFactory {
    const analyze: (errors: MetadataFactory.IError[]) => (type: "boolean" | "bigint" | "number" | "string" | "array") => (objects: MetadataObject[], explore: MetadataFactory.IExplore) => IMetadataTypeTag[];
    const validate: (report: (property: string | null) => (msg: string) => false) => (type: "boolean" | "bigint" | "number" | "string" | "array") => (tagList: IMetadataTypeTag[]) => boolean;
}
