/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { IMetadataTypeTag } from "../../schemas/metadata/IMetadataTypeTag";
export declare namespace RandomRanger {
    interface IDefaults {
        minimum: number;
        maximum: number;
        gap: number;
    }
    const length: (coalesce: (method: string) => ts.Expression) => (defs: IDefaults) => (acc: length.IAccessors) => (tags: IMetadataTypeTag[]) => ts.Expression | undefined;
    namespace length {
        interface IAccessors {
            minimum: string;
            maximum: string;
        }
    }
    const number: (config: number.IConfig) => (defs: IDefaults) => (tags: IMetadataTypeTag[]) => ts.Expression;
    namespace number {
        interface IConfig {
            setter: (args: number[]) => ts.Expression;
            transform: (value: number) => ts.Expression;
            type: "int" | "uint" | "double";
        }
    }
}
