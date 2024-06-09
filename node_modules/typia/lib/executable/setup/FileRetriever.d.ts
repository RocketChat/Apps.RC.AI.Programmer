export declare namespace FileRetriever {
    const directory: (name: string) => (dir: string, depth?: number) => string | null;
    const file: (name: string) => (directory: string, depth?: number) => string | null;
}
