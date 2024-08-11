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
import { IUser } from '@rocket.chat/apps-engine/definition/users';
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
import { AiProgrammerApp } from '../../../AiProgrammerApp';
import { ButtonInActionComponent } from "./buttonInActionComponent";
import { ButtonInSectionComponent } from "./buttonInSectionComponent";
import { selectLanguageComponent} from "./selectLanguageComponent";
import { selectLLMComponent} from "./selectLLMComponent";
import { Modals } from "../../../enum/Modals";
import { inputElementComponent } from "./common/inputElementComponent";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { Handler } from "../../../handlers/Handler";

export async function regenerateCodeModal(
	app: AiProgrammerApp,
    user: IUser,
    room: IRoom,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persistence: IPersistence,
    triggerId?: string,
    threadId?: string,
    viewId?: string
): Promise<IUIKitSurfaceViewParam | Error> {
	const { elementBuilder, blockBuilder } = app.getUtils();
	const blocks: Block[] = [];
    try{
        const handler = new Handler({
            app: app,
            read: read,
            modify: modify,
            persistence: persistence,
            http: http,
            sender: user,
            room: room,
            triggerId: triggerId,
        });
        let language = await handler.getLanguage();
        let LLM = await handler.getLLM();
        const configureText : SectionBlock= {
            type: 'section',
            text: blockBuilder.createTextObjects([`User Configuration: You are using language: `+ language+' with LLM: '+LLM+` .`])[0],
        };
        const regenerateInput = inputElementComponent(
            {
                app,
                placeholder: "Please help me refine the code to make it...",
                label: "Not satisfied with code result? Refine it with your requirements:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: '',
            },
            {
                actionId: Modals.COMMENT_INPUT_ACTION,
                blockId: Modals.COMMENT_INPUT_BLOCK,
            }
        );
        const regenerateButton = ButtonInSectionComponent(
            {
                app,
                buttonText: "Help me refine it!",
                style: ButtonStyle.PRIMARY,
            },
            {
                actionId: Modals.REGEN_ACTION,
                blockId: Modals.REGEN_BLOCK,
            }
        );
        blocks.push(configureText);
        blocks.push(regenerateInput);
        blocks.push(regenerateButton);
    }
    catch (err) {
        console.log("Error in Gen: "+err);
        this.app.getLogger().error(err);
    }
    
	return {
        id: viewId || 'modalId',
        type: UIKitSurfaceType.MODAL,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
    };
}
