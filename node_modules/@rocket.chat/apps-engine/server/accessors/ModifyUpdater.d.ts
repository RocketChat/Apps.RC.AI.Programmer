import type { ILivechatUpdater, IMessageBuilder, IModifyUpdater, IRoomBuilder } from '../../definition/accessors';
import type { IUserUpdater } from '../../definition/accessors/IUserUpdater';
import type { IUser } from '../../definition/users';
import type { AppBridges } from '../bridges';
export declare class ModifyUpdater implements IModifyUpdater {
    private readonly bridges;
    private readonly appId;
    private livechatUpdater;
    private userUpdater;
    constructor(bridges: AppBridges, appId: string);
    getLivechatUpdater(): ILivechatUpdater;
    getUserUpdater(): IUserUpdater;
    message(messageId: string, updater: IUser): Promise<IMessageBuilder>;
    room(roomId: string, updater: IUser): Promise<IRoomBuilder>;
    finish(builder: IMessageBuilder | IRoomBuilder): Promise<void>;
    private _finishMessage;
    private _finishRoom;
}
