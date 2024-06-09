/// <reference types="ts-expose-internals/typescript" />
import ts from "typescript";
export declare class FunctionImporter {
    readonly method: string;
    private readonly used_;
    private readonly local_;
    private readonly unions_;
    private sequence_;
    constructor(method: string);
    empty(): boolean;
    use(name: string): ts.Identifier;
    useLocal(name: string): string;
    hasLocal(name: string): boolean;
    declare(modulo: ts.LeftHandSideExpression, includeUnions?: boolean): ts.Statement[];
    declareUnions(): ts.Statement[];
    increment(): number;
    emplaceUnion(prefix: string, name: string, factory: () => ts.ArrowFunction): string;
    trace(): void;
}
