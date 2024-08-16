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


export async function shareGistModal(
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
            text: blockBuilder.createTextObjects([`You can now share your generated code to the Gist. Please verify the content and configure the Github OAuth before sharing!`])[0],
        };
        const filenameInput = inputElementComponent(
            {
                app,
                placeholder: "yourcode.java",
                label: "Enter the filename for the code piece you're sharing:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GIST_FILENAME_INPUT_ACTION,
                blockId: Modals.SHARE_GIST_FILENAME_INPUT_BLOCK
            }
        );
        const commitInput = inputElementComponent(
            {
                app,
                placeholder: "This helps users to create a new function...",
                label: "Enter the description for this code piece:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GIST_COMMIT_INPUT_ACTION,
                blockId: Modals.SHARE_GIST_COMMIT_INPUT_BLOCK,
            }
        );
        const generateInput = inputElementComponent(
            {
                app,
                placeholder: "",
                label: "The following content will be shared to gist:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: content,
            },
            {
                actionId: Modals.SHARE_GIST_INPUT_ACTION,
                blockId: Modals.SHARE_GIST_INPUT_BLOCK,
            }
        );
        blocks.push(configureText);
        blocks.push(filenameInput);
        blocks.push(commitInput);
        blocks.push(generateInput);
    }
    catch (err) {
        
        this.app.getLogger().error(err);
    }

    const block = modify.getCreator().getBlockBuilder();
    
	return {
        id: 'shareGist',
        type: UIKitSurfaceType.MODAL,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
        submit: block.newButtonElement({
            actionId: "shareGist",
            text: block.newPlainTextObject("Share to the Gist"),
        }),
    };
}
