import type { ServerSettingBridge } from '../bridges/ServerSettingBridge';
import type { IServerSettingRead } from '../../definition/accessors';
import type { ISetting } from '../../definition/settings';
export declare class ServerSettingRead implements IServerSettingRead {
    private readonly settingBridge;
    private readonly appId;
    constructor(settingBridge: ServerSettingBridge, appId: string);
    getOneById(id: string): Promise<ISetting>;
    getValueById(id: string): Promise<any>;
    getAll(): Promise<IterableIterator<ISetting>>;
    isReadableById(id: string): Promise<boolean>;
}
