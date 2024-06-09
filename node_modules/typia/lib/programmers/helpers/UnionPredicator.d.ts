import { MetadataObject } from "../../schemas/metadata/MetadataObject";
import { MetadataProperty } from "../../schemas/metadata/MetadataProperty";
export declare namespace UnionPredicator {
    interface ISpecialized {
        index: number;
        object: MetadataObject;
        property: MetadataProperty;
        neighbour: boolean;
    }
    const object: (targets: MetadataObject[]) => Array<ISpecialized>;
}
