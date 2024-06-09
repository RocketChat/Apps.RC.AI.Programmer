export declare namespace ArrayUtil {
    const has: <T>(array: T[], pred: (elem: T) => boolean) => boolean;
    const add: <T>(array: T[], value: T, pred?: (x: T, y: T) => boolean) => boolean;
    const set: <Key, T>(array: T[], value: T, key: (elem: T) => Key) => void;
    const take: <T>(array: T[], pred: (elem: T) => boolean, init: () => T) => T;
    const repeat: <T>(count: number, closure: (index: number, count: number) => T) => T[];
    const flat: <T>(matrix: T[][]) => T[];
}
