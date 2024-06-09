import type { AppVideoConfProviderManager } from '../managers/AppVideoConfProviderManager';
import type { IVideoConfProvidersExtend } from '../../definition/accessors';
import type { IVideoConfProvider } from '../../definition/videoConfProviders';
export declare class VideoConfProviderExtend implements IVideoConfProvidersExtend {
    private readonly manager;
    private readonly appId;
    constructor(manager: AppVideoConfProviderManager, appId: string);
    provideVideoConfProvider(provider: IVideoConfProvider): Promise<void>;
}
