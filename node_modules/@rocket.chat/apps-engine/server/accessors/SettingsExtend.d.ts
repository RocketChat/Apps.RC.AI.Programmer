import type { ProxiedApp } from '../ProxiedApp';
import type { ISettingsExtend } from '../../definition/accessors';
import type { ISetting } from '../../definition/settings';
export declare class SettingsExtend implements ISettingsExtend {
    private readonly app;
    constructor(app: ProxiedApp);
    provideSetting(setting: ISetting): Promise<void>;
}
