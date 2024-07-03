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
    InputBlock
} from "@rocket.chat/ui-kit";
import { IUIKitContextualBarViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { AiProgrammerApp } from '../../../AiProgrammerApp';
import { ButtonInActionComponent } from "./buttonInActionComponent";
import { ButtonInSectionComponent } from "./buttonInSectionComponent";
import { Modals } from "../../../enum/Modals";

export async function selectLLMComponent(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
	viewId?: string,
): Promise<InputBlock> {
	const { elementBuilder, blockBuilder } = app.getUtils();
    const LLMModels = [
        { key: 'llama3-70b', i18nLabel: 'Llama3 70B' },
		{ key: 'mistral-7b', i18nLabel: 'Mistral 7B' },
        { key: 'codellama-7b', i18nLabel: 'CodeLlama-7b' },
        { key: 'codestral-22b', i18nLabel: 'Codestral-22b' },
    ];
    const options = LLMModels.map((LLM) => {
        const text = LLM.i18nLabel;
        const value = LLM.key;
        return {
            text,
            value,
        };
    });
    const dropDownOption = elementBuilder.createDropDownOptions(options);
    const dropDown = elementBuilder.addDropDown(
        {
            placeholder: "Select a LLM",
            options: dropDownOption,
            dispatchActionConfig: [Modals.dispatchActionConfigOnSelect],
        },
        { blockId: Modals.SELECT_LLM_BLOCK, actionId: Modals.SELECT_LLM_ACTION }
    );
    const inputBlock = blockBuilder.createInputBlock({
        text: "Select your language model",
        element: dropDown,
        optional: false,
    });
    return inputBlock;
}