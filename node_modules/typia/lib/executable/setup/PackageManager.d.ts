export declare class PackageManager {
    readonly directory: string;
    data: Package.Data;
    manager: string;
    get file(): string;
    static mount(): Promise<PackageManager>;
    save(modifier: (data: Package.Data) => void): Promise<void>;
    install(props: {
        dev: boolean;
        modulo: string;
        version: string;
    }): boolean;
    private constructor();
    private static load;
}
export declare namespace Package {
    interface Data {
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    }
}
