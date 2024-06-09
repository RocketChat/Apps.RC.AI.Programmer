export type IValidation<T = unknown> = IValidation.ISuccess<T> | IValidation.IFailure;
export declare namespace IValidation {
    interface ISuccess<T = unknown> {
        success: true;
        data: T;
        errors: [];
    }
    interface IFailure {
        success: false;
        errors: IError[];
    }
    interface IError {
        path: string;
        expected: string;
        value: any;
    }
}
