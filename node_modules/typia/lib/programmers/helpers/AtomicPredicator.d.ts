import { Metadata } from "../../schemas/metadata/Metadata";
import { Atomic } from "../../typings/Atomic";
export declare namespace AtomicPredicator {
    const constant: (meta: Metadata) => (name: Atomic.Literal) => boolean;
    const atomic: (meta: Metadata) => (name: Atomic.Literal) => boolean;
    const native: (name: string) => boolean;
    const template: (meta: Metadata) => boolean;
}
