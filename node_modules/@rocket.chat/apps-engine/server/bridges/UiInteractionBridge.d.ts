import type { IUIKitInteraction } from '../../definition/uikit';
import type { IUser } from '../../definition/users';
import { BaseBridge } from './BaseBridge';
export declare abstract class UiInteractionBridge extends BaseBridge {
    doNotifyUser(user: IUser, interaction: IUIKitInteraction, appId: string): Promise<void>;
    protected abstract notifyUser(user: IUser, interaction: IUIKitInteraction, appId: string): Promise<void>;
    private hasInteractionPermission;
}
