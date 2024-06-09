export declare namespace MapUtil {
    const take: <Key, T>(dict: Map<Key, T>) => (key: Key, generator: () => T) => T;
}
