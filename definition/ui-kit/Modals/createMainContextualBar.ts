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
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";
// import type {IOptionObject} from "@rocket.chat/apps-engine/definition/uikit/blocks/Elements"

export async function createMainContextualBar(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
	viewId?: string,
    showGen?: boolean,
): Promise<IUIKitSurfaceViewParam | Error> {
	const { elementBuilder, blockBuilder } = app.getUtils();
    const association = new RocketChatAssociationRecord(
        RocketChatAssociationModel.USER,
        `${user.id}#RoomId`
    );
    await persistence.updateByAssociation(
        association,
        { roomId: room.id },
        true
    );
    console.log("maincontext(): room ->" + room.id);
    
	const close = elementBuilder.addButton(
        { text: "close", style: ButtonStyle.DANGER },
        {
            actionId: Modals.MAIN_CLOSE_ACTION,
            blockId: Modals.MAIN_CLOSE_BLOCK,
        }
    );
    const block = modify.getCreator().getBlockBuilder();
    const languageOptions = [
        {text: block.newPlainTextObject('python'), value:'python'},
        {text:block.newPlainTextObject('c++'), value:'c++'},
        {text:block.newPlainTextObject('java'), value:'java'},
        {text:block.newPlainTextObject('JavaScript'), value:'javascript'},
        {text:block.newPlainTextObject('TypeScript'), value:'typescript'}
    ];
    const LLMOptions = [
        { value: 'llama3-70b', text: block.newPlainTextObject('Llama3 70B') },
		{ value: 'mistral-7b', text: block.newPlainTextObject('Mistral 7B') },
        { value: 'codellama-7b', text: block.newPlainTextObject('CodeLlama-7b') },
        { value: 'codestral-22b', text: block.newPlainTextObject('Codestral-22b') },
    ];
    block.addInputBlock({
        blockId: Modals.SELECT_LAN_BLOCK,
        label: block.newPlainTextObject("Select your target programming language"),
        element: block.newStaticSelectElement({
            actionId:  Modals.SELECT_LAN_ACTION,
            placeholder: block.newPlainTextObject("Select a programming language"),
            initialValue: 'c++',
            options: languageOptions,
        }),
    })
    .addInputBlock({
        blockId: Modals.SELECT_LLM_BLOCK,
        label: block.newPlainTextObject("Select a LLM"),
        element: block.newStaticSelectElement({
            actionId:  Modals.SELECT_LLM_ACTION,
            placeholder: block.newPlainTextObject("Select a language model"),
            initialValue: 'mistral-7b',
            options: LLMOptions,
        }),
    })
    .addDividerBlock();
    
	return {
        id: 'mainContextualBar',
        type: UIKitSurfaceType.CONTEXTUAL_BAR,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer - User Configuration",
        },
        blocks: block.getBlocks(),
        close: close,
        submit: block.newButtonElement({
            actionId: "submit",
            text: block.newPlainTextObject("Configure"),
        }),
    };
}
