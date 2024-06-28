import {
	IAppAccessors,
	IConfigurationExtend,
	IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { CodeCommand} from './commands/CodeCommand';
import { settings } from './settings/settings';
import { BlockElementType, ISectionBlock, IUIKitResponse, UIKitBlockInteractionContext, UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ElementBuilder } from "./lib/ElementBuilder";
import { BlockBuilder } from "./lib/BlockBuilder";

export class AiProgrammerApp extends App {
	private elementBuilder: ElementBuilder;
    private blockBuilder: BlockBuilder;
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
		this.elementBuilder = new ElementBuilder(this.getID());
        this.blockBuilder = new BlockBuilder(this.getID());
	}

	public getUtils(){
        return {
            elementBuilder: this.elementBuilder,
            blockBuilder: this.blockBuilder,
        };
    }

	// public async executeBlockActionHandler(context: UIKitBlockInteractionContext, _read: IRead, _http: IHttp, _persistence: IPersistence, modify: IModify) {
    //     const data = context.getInteractionData();

    //     const contextualbarBlocks = createContextualBarBlocks(modify, data.container.id);

    //     // [9]
    //     await modify.getUiController().updateContextualBarView(contextualbarBlocks, { triggerId: data.triggerId }, data.user);

    //     return {
    //         success: true,
    //     };
    // }

    // // [10]
    // public async executeViewSubmitHandler(context: UIKitViewSubmitInteractionContext): Promise<IUIKitResponse> {
    //     const data = context.getInteractionData()

    //     // [11]
    //     const text = (data.view.blocks[0] as ISectionBlock).text.text;

    //     // [12]
    //     console.log(text);

    //     return {
    //         success: true,
    //     };
    // }
}
