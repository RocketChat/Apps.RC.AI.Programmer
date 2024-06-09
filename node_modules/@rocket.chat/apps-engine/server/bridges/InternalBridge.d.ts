import type { ISetting } from '../../definition/settings';
import { BaseBridge } from './BaseBridge';
export declare abstract class InternalBridge extends BaseBridge {
    doGetUsernamesOfRoomById(roomId: string): Promise<Array<string>>;
    doGetUsernamesOfRoomByIdSync(roomId: string): Array<string>;
    doGetWorkspacePublicKey(): Promise<ISetting>;
    protected abstract getUsernamesOfRoomById(roomId: string): Promise<Array<string>>;
    protected abstract getUsernamesOfRoomByIdSync(roomId: string): Array<string>;
    protected abstract getWorkspacePublicKey(): Promise<ISetting>;
}
