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
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { Handler } from "../../../handlers/Handler";


export async function shareCodeModal(
	app: AiProgrammerApp,
    user: IUser,
    room: IRoom,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persistence: IPersistence,
    content: string,
    triggerId?: string,
    threadId?: string,
    viewId?: string,
    
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
        
        const configureText : SectionBlock= {
            type: 'section',
            text: blockBuilder.createTextObjects([`You can now share your generated code to the current channel. In the input box below, you can verify the content you're gonna share and make some edits.`])[0],
        };
        const generateInput = inputElementComponent(
            {
                app,
                placeholder: "",
                label: "The following content will be shared:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: content,
            },
            {
                actionId: Modals.SHARE_INPUT_ACTION,
                blockId: Modals.SHARE_INPUT_BLOCK,
            }
        );
        const generateButton = ButtonInSectionComponent(
            {
                app,
                buttonText: "Share in the channel!",
                style: ButtonStyle.PRIMARY,
            },
            {
                actionId: Modals.SHARE_ACTION,
                blockId: Modals.SHARE_BLOCK,
            }
        );
        blocks.push(configureText);
        blocks.push(generateInput);
        blocks.push(generateButton)
    }
    catch (err) {
        console.log("Error in code modal: "+err);
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
