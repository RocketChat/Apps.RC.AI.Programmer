import { TypeGuardError } from "../TypeGuardError";
export declare const $throws: (method: string) => (props: Pick<TypeGuardError.IProps, "expected" | "value">) => never;
