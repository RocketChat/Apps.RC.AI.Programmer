import { Metadata } from "../../schemas/metadata/Metadata";
import { MetadataObject } from "../../schemas/metadata/MetadataObject";
import { ProtobufAtomic } from "../../typings/ProtobufAtomic";
export declare namespace ProtobufUtil {
    const isStaticObject: (obj: MetadataObject) => boolean;
    const size: (meta: Metadata) => number;
    const isUnion: (meta: Metadata) => boolean;
    const getAtomics: (meta: Metadata) => ProtobufAtomic[];
    const getNumbers: (meta: Metadata) => ProtobufAtomic.Numeric[];
    const getBigints: (meta: Metadata) => ProtobufAtomic.BigNumeric[];
}
