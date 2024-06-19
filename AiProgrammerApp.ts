import {
	IAppAccessors,
	IConfigurationExtend,
	ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { CodeCommand } from './commands/CodeCommand';
import { settings } from './settings/settings';

export class AiProgrammerApp extends App {
	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
		super(info, logger, accessors);
	}

	public async extendConfiguration(configuration: IConfigurationExtend) {
		await Promise.all([
			...settings.map((setting) =>
				configuration.settings.provideSetting(setting)
			),
			configuration.slashCommands.provideSlashCommand(
				new CodeCommand(this)
			),
		]);
	}
}
