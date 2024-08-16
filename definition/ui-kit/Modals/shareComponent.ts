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

export async function shareComponent(
	app: AiProgrammerApp,
	user: IUser,
	read: IRead,
	persistence: IPersistence,
	modify: IModify,
	room: IRoom,
	viewId?: string,
): Promise<Array<Block>> {
	const { elementBuilder, blockBuilder } = app.getUtils();
    const refineButton = elementBuilder.addButton(
        {
            text: "Refine the code",
            style: ButtonStyle.PRIMARY,
        },
        {
            blockId: Modals.REGEN_BUTTON_BLOCK,
            actionId: Modals.REGEN_BUTTON_ACTION,
        }
    );
    const buttonElement = elementBuilder.addButton(
        {
            text: "Share in channel",
            style: ButtonStyle.PRIMARY,
        },
        {
            blockId: Modals.SHARE_BUTTON_BLOCK,
            actionId: Modals.SHARE_BUTTON_ACTION,
        }
    );
    const buttonGithubElement = elementBuilder.addButton(
        {
            text: "Share to Gist",
            style: ButtonStyle.PRIMARY,
        },
        {
            blockId: Modals.SHARE_GITHUB_BUTTON_BLOCK,
            actionId: Modals.SHARE_GITHUB_BUTTON_ACTION,
        }
    );
    const genButton = elementBuilder.addButton(
        {
            text: "Generate new code",
            style: ButtonStyle.PRIMARY,
        },
        {
            blockId: Modals.GEN_BUTTON_BLOCK,
            actionId: Modals.GEN_BUTTON_ACTION,
        }
    );
    const configureButton = elementBuilder.addButton(
        {
            text: "Adjust configuration",
            style: ButtonStyle.PRIMARY,
        },
        {
            blockId: Modals.CONFIGURE_BAR_BLOCK,
            actionId: Modals.CONFIGURE_BAR_ACTION,
        }
    );
    const actionBlock = blockBuilder.createActionBlock({
        elements: [refineButton, buttonElement, buttonGithubElement, genButton, configureButton],
    });
    const textBlock = blockBuilder.createSectionBlock({
        text: `Congratulations! You have successfully generated code! You can choose from the following actions:`,
    });

    return [textBlock, actionBlock];
}