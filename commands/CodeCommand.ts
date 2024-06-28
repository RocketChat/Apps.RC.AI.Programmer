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
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { notifyMessage } from '../helpers/notifyMessage';
import { generateCodePrompt } from '../constants/CodePrompts';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { CommandUtility } from "../helpers/commandUtility";
import { BlockElementType, ISectionBlock, IUIKitResponse, UIKitBlockInteractionContext, UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import {
    ButtonStyle,
    UIKitSurfaceType,
} from "@rocket.chat/apps-engine/definition/uikit";
import {
    Block,
    TextObjectType,
    ContextBlock,
    SectionBlock,
} from "@rocket.chat/ui-kit";
import { IUIKitContextualBarViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
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
		const threadId = context.getThreadId();
		const triggerId = context.getTriggerId();

		// const contextualbarBlocks = createContextualBarBlocks(modify);
		// await modify.getUiController().openContextualBarView(contextualbarBlocks, { triggerId }, user); 

		// const contextualBar = await createMainContextualBar(
        //     this.app,
        //     user,
        //     read,
        //     persistence,
        //     modify,
        //     room
        // );

		// if (contextualBar instanceof Error) {
        //     // Something went Wrong Propably SearchPageComponent Couldn't Fetch the Pages
        //     this.app.getLogger().error(contextualBar.message);
        //     return;
        // }
		// this.app.getLogger().debug("triggerid: "+triggerId);
        // if (triggerId) {
		// 	this.app.getLogger().debug("inside");
        //     await modify.getUiController().openSurfaceView(
        //         contextualBar,
        //         {
        //             triggerId,
        //         },
        //         user
        //     );
        // }

		
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

function createContextualBarBlocks(modify: IModify, viewId?: string): IUIKitContextualBarViewParam {
    const blocks = modify.getCreator().getBlockBuilder();

    const date = new Date().toISOString();

    blocks.addSectionBlock({
        text: blocks.newMarkdownTextObject(`The current date-time is\n${date}`), // [4]
        accessory: { // [5]
            type: BlockElementType.BUTTON,
            actionId: 'date',
            text: blocks.newPlainTextObject('Refresh'),
            value: date,
        },
    });

    return { // [6]
        id: viewId || 'contextualbarId',
        title: blocks.newPlainTextObject('Contextual Bar'),
        submit: blocks.newButtonElement({
            text: blocks.newPlainTextObject('Submit'),
        }),
        blocks: blocks.getBlocks(),
    };
}

// export async function createMainContextualBar(
// 	app: AiProgrammerApp,
// 	user: IUser,
// 	read: IRead,
// 	persistence: IPersistence,
// 	modify: IModify,
// 	room: IRoom,
// 	viewId?: string,
// ): Promise<IUIKitSurfaceViewParam | Error> {
// 	const { elementBuilder, blockBuilder } = app.getUtils();
// 	const blocks: Block[] = [];
// 	const divider = blockBuilder.createDividerBlock();
// 	blocks.push(divider);

// 	const close = elementBuilder.addButton(
//         { text: "close", style: ButtonStyle.DANGER },
//         {
//             actionId: "1",
//             blockId: "1",
//         }
//     );
// 	return {
//         id: viewId || 'contextualbarId',
//         type: UIKitSurfaceType.CONTEXTUAL_BAR,
//         title: {
//             type: TextObjectType.MRKDWN,
//             text: "Ai Programmer",
//         },
//         blocks,
//         close,
//     };
// }
