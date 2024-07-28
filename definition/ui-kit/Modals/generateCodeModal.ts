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


export async function generateCodeModal(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
	viewId?: string,
): Promise<IUIKitSurfaceViewParam | Error> {
	const { elementBuilder, blockBuilder } = app.getUtils();
	const blocks: Block[] = [];
    let language = "";
    let LLM = "";
    try{
        const persis = read.getPersistenceReader();
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#language`);
        const record = await persis.readByAssociation(association);
        if (record != undefined) {
            language = record[0]['language'] as string;
        }
        const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#LLM`);
        const LLMrecord = await persis.readByAssociation(LLMassociation);
        if (LLMrecord != undefined) {
            LLM = LLMrecord[0]['LLM'] as string;
        }
        const configureText = {
            type: TextObjectType.MRKDWN,
            text: `You are using language: `+ language+' with LLM: '+LLM+` to generate code.`,
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
        console.log("Error in Gen: "+err);
        this.app.getLogger().error(err);
    }

	const close = elementBuilder.addButton(
        { text: "close", style: ButtonStyle.DANGER },
        {
            actionId: Modals.MAIN_CLOSE_ACTION,
            blockId: Modals.MAIN_CLOSE_BLOCK,
        }
    );

    const submit = elementBuilder.addButton(
        { text: "submit", style: ButtonStyle.PRIMARY },
        {
            actionId: Modals.GEN_ACTION,
            blockId: Modals.GEN_BLOCK,
        }
    )
    
	return {
        id: viewId || 'modalId',
        type: UIKitSurfaceType.MODAL,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
        submit,
        close,
    };
}
