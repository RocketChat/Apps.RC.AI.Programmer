import { ITransformOptions } from "../../transformers/ITransformOptions";
export declare namespace OptionPredicator {
    const numeric: (options: ITransformOptions) => boolean;
    const functional: (options: ITransformOptions) => boolean;
    const finite: (options: ITransformOptions) => boolean;
    const undefined: (options: ITransformOptions) => boolean;
}
