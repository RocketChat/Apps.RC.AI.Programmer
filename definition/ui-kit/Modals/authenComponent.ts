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

export async function authenComponent(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
    url: string,
	viewId?: string,
): Promise<Array<Block>> {
	const { elementBuilder, blockBuilder } = app.getUtils();
    const buttonElement = elementBuilder.addButton(
        {
            text: "GitHub Login",
            style: ButtonStyle.PRIMARY,
            url: url,
        },
        {
            blockId: "Modals.SHARE_BUTTON_BLOCK",
            actionId: "Modals.SHARE_BUTTON_ACTION",
        }
    );
    const actionBlock = blockBuilder.createActionBlock({
        elements: [buttonElement],
    });
    const textBlock = blockBuilder.createSectionBlock({
        text: "Login to Github",
    });

    return [textBlock, actionBlock];
}