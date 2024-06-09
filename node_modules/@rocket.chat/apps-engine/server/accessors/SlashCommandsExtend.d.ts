import type { AppSlashCommandManager } from '../managers/AppSlashCommandManager';
import type { ISlashCommandsExtend } from '../../definition/accessors';
import type { ISlashCommand } from '../../definition/slashcommands';
export declare class SlashCommandsExtend implements ISlashCommandsExtend {
    private readonly manager;
    private readonly appId;
    constructor(manager: AppSlashCommandManager, appId: string);
    provideSlashCommand(slashCommand: ISlashCommand): Promise<void>;
}
