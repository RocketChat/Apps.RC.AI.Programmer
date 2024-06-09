export declare const clone: (method: string) => {
    throws: (props: Pick<import("../..").TypeGuardError.IProps, "expected" | "value">) => never;
    any: (val: any) => any;
    is_between: (value: number, minimum: number, maximum: number) => boolean;
    is_bigint_string: (str: string) => boolean;
};
export declare const prune: (method: string) => {
    throws: (props: Pick<import("../..").TypeGuardError.IProps, "expected" | "value">) => never;
    is_between: (value: number, minimum: number, maximum: number) => boolean;
    is_bigint_string: (str: string) => boolean;
};
