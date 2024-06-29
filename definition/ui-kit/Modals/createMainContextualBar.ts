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

export async function createMainContextualBar(
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
    try{
        const LanguageComponent = await selectLanguageComponent(app,
            user,
            read,
            persistence,
            modify,
            room);
        const LLMComponent = await selectLLMComponent(app,
            user,
            read,
            persistence,
            modify,
            room);
        const divider = blockBuilder.createDividerBlock();
        const startButton = ButtonInSectionComponent(
            {
                app,
                buttonText: "Configure",
                style: ButtonStyle.PRIMARY,
            },
            {
                actionId: Modals.CONFIGURE_ACTION,
                blockId: Modals.CONFIGURE_BLOCK,
            }
        );
        blocks.push(LanguageComponent);
        blocks.push(LLMComponent);
        blocks.push(startButton);
        blocks.push(divider);
    }
    catch (err) {
        console.log("Error in Gen: "+err);
        return this.app.getLogger().error(err);
    }

	const close = elementBuilder.addButton(
        { text: "close", style: ButtonStyle.DANGER },
        {
            actionId: Modals.MAIN_CLOSE_ACTION,
            blockId: Modals.MAIN_CLOSE_BLOCK,
        }
    );
    
	return {
        id: viewId || 'contextualbarId',
        type: UIKitSurfaceType.CONTEXTUAL_BAR,
        title: {
            type: TextObjectType.MRKDWN,
            text: "Ai Programmer",
        },
        blocks,
        close,
    };
}
