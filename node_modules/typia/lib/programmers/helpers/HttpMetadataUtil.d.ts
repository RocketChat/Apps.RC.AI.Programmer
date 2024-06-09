import { Metadata } from "../../schemas/metadata/Metadata";
export declare namespace HttpMetadataUtil {
    const atomics: (meta: Metadata) => Set<"boolean" | "bigint" | "number" | "string">;
    const isUnion: (meta: Metadata) => boolean;
}
