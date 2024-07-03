import {
	IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
	IUIKitSurfaceViewParam,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import {
	ISlashCommand,
	SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { CommandUtility } from "../helpers/commandUtility";
import { AiProgrammerApp } from '../AiProgrammerApp';


export class CodeCommand implements ISlashCommand {
	public command = 'ai-programmer';
	public i18nParamsExample = 'Automatically create short codes according to specification';
	public i18nDescription = '';
	public providesPreview = false;
	private readonly app: AiProgrammerApp;

	constructor(app: AiProgrammerApp) {
		this.app = app;
	}

	public async executor(
		context: SlashCommandContext,
		read: IRead,
		modify: IModify,
		http: IHttp,
		persistence: IPersistence
	): Promise<void> {
		const user = context.getSender();
		const room = context.getRoom();
		const command = context.getArguments();
		const triggerId = context.getTriggerId();
		
		const commandUtility = new CommandUtility(
            {
                sender: user,
                room: room,
                command: command,
                context: context,
                read: read,
                modify: modify,
                http: http,
                persistence: persistence,
				triggerId: triggerId,
                app: this.app
            }
        );
        commandUtility.resolveCommand();

	}


}

