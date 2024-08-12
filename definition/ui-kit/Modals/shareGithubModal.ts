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


export async function shareGithubModal(
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
            text: blockBuilder.createTextObjects([`You can now share your generated code to the Github Repository. Please verify the content and configure the Github information before sharing!`])[0],
        };
        const repoInput = inputElementComponent(
            {
                app,
                placeholder: "Username/RepositoryName",
                label: "Enter the name for your Github Repository:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GITHUB_REPO_INPUT_ACTION,
                blockId: Modals.SHARE_GITHUB_REPO_INPUT_BLOCK,
            }
        );
        const pathInput = inputElementComponent(
            {
                app,
                placeholder: "path/to/yourcode.java",
                label: "Enter the path for your file in repository, remember to specify file extension:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GITHUB_PATH_INPUT_ACTION,
                blockId: Modals.SHARE_GITHUB_PATH_INPUT_BLOCK,
            }
        );
        const branchInput = inputElementComponent(
            {
                app,
                placeholder: "main",
                label: "Enter the branch you want to upload your code in:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GITHUB_BRANCH_INPUT_ACTION,
                blockId: Modals.SHARE_GITHUB_BRANCH_INPUT_BLOCK,
            }
        );
        const commitInput = inputElementComponent(
            {
                app,
                placeholder: "This helps users to create a new function...",
                label: "Enter the commit information for this upload:",
                optional: false,
                multiline: true,
                dispatchActionConfigOnInput: true,
                initialValue: "",
            },
            {
                actionId: Modals.SHARE_GITHUB_COMMIT_INPUT_ACTION,
                blockId: Modals.SHARE_GITHUB_COMMIT_INPUT_BLOCK,
            }
        );
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
                actionId: Modals.SHARE_GITHUB_INPUT_ACTION,
                blockId: Modals.SHARE_GITHUB_INPUT_BLOCK,
            }
        );
        blocks.push(configureText);
        blocks.push(repoInput);
        blocks.push(pathInput);
        blocks.push(branchInput);
        blocks.push(commitInput);
        blocks.push(generateInput);
    }
    catch (err) {
        console.log("Error in code modal: "+err);
        this.app.getLogger().error(err);
    }

    const block = modify.getCreator().getBlockBuilder();
    
	return {
        id: 'shareGithub',
        type: UIKitSurfaceType.MODAL,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
        submit: block.newButtonElement({
            actionId: "shareGithub",
            text: block.newPlainTextObject("Share to the Github"),
        }),
    };
}
