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
    Block,
    TextObjectType,
    ContextBlock,
    SectionBlock,
    InputBlock
} from "@rocket.chat/ui-kit";
import { IUIKitContextualBarViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import { AiProgrammerApp } from '../../../AiProgrammerApp';
import { Modals } from "../../../enum/Modals";
import {
    StaticSelectElementParam,
    StaticSelectOptionsParam,
} from "../Element/IStaticSelectElement";
export interface ILanguage {
    name: string;
    id: string;
}

export async function selectLanguageComponent(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
	viewId?: string,
): Promise<InputBlock | Error>{
   
        const { elementBuilder, blockBuilder } = app.getUtils();
        const languageModels : Array<ILanguage>= [
            {name:'python', id:'python'},
            {name:'c++', id:'c++'},
            {name:'Java', id:'java'},
            {name:'JavaScript', id:'javascript'},
            {name:'TypeScript', id:'typescript'}
        ];
        const options : StaticSelectOptionsParam = languageModels.map((lang) => {
            const text = lang.name;
            const value = lang.id;
            return {
                text,
                value,
            };
        });
        const dropDownOption = elementBuilder.createDropDownOptions(options);
        const dropDown = elementBuilder.addDropDown(
            {
                placeholder: "Select a programming language",
                options: dropDownOption,
                dispatchActionConfig: [Modals.dispatchActionConfigOnSelect],
            },
            { blockId: Modals.SELECT_LAN_BLOCK, actionId: Modals.SELECT_LAN_ACTION }
        );
        const inputBlock = blockBuilder.createInputBlock({
            text: "Select your target programming language",
            element: dropDown,
            optional: false,
        });
        return inputBlock;
    
    
}