import type { App } from '../../definition/App';
import type { IAppsEngineRuntimeOptions } from './AppsEngineRuntime';
import { AppsEngineRuntime } from './AppsEngineRuntime';
export declare class AppsEngineNodeRuntime extends AppsEngineRuntime {
    private readonly app;
    private readonly customRequire;
    static defaultRuntimeOptions: {
        timeout: number;
    };
    static defaultContext: {
        Buffer: BufferConstructor;
        console: Console;
        process: {};
        exports: {};
        setTimeout: typeof setTimeout;
        clearTimeout: typeof clearTimeout;
        setInterval: typeof setInterval;
        clearInterval: typeof clearInterval;
        setImmediate: typeof setImmediate;
        clearImmediate: typeof clearImmediate;
    };
    static runCode(code: string, sandbox?: Record<string, any>, options?: IAppsEngineRuntimeOptions): Promise<any>;
    static runCodeSync(code: string, sandbox?: Record<string, any>, options?: IAppsEngineRuntimeOptions): any;
    constructor(app: App, customRequire: (mod: string) => any);
    runInSandbox(code: string, sandbox?: Record<string, any>, options?: IAppsEngineRuntimeOptions): Promise<any>;
}
