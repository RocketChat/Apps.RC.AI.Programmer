/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
import { Metadata } from "../../../schemas/metadata/Metadata";
export declare const iterate_metadata_native: (checker: ts.TypeChecker) => (meta: Metadata, type: ts.Type) => boolean;
