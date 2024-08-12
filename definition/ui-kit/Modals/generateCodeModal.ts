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
import { Modals } from "../../../enum/Modals";
import { inputElementComponent } from "./common/inputElementComponent";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { Handler } from "../../../handlers/Handler";


export async function generateCodeModal(
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
        const generateInput = inputElementComponent(
            {
                app,
                placeholder: "Please help me generate a binary search tree ...",
                label: "Write the description for the code you want to generate:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: '',
            },
            {
                actionId: Modals.GEN_INPUT_ACTION,
                blockId: Modals.GEN_INPUT_BLOCK,
            }
        );
        blocks.push(configureText);
        blocks.push(generateInput);
    }
    catch (err) {
        console.log("Error in code modal: "+err);
        this.app.getLogger().error(err);
    }
    const block = modify.getCreator().getBlockBuilder();
    
	return {
        id: 'generateModal',
        type: UIKitSurfaceType.MODAL,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
        submit: block.newButtonElement({
            actionId: "generateModal",
            text: block.newPlainTextObject("Generate code"),
        }),
    };
}
