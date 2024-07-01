import { ButtonStyle } from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from "../../../AiProgrammerApp";
import { ElementInteractionParam } from "../../../definition/ui-kit/Element/IElementBuilder";
import { ActionsBlock } from "@rocket.chat/ui-kit";

export function ButtonInActionComponent(
    {
        app,
        buttonText,
        style,
        value,
        url,
    }: {
        app: AiProgrammerApp;
        buttonText: string;
        style?: ButtonStyle;
        value?: string;
        url?: string;
    },
    { blockId, actionId }: ElementInteractionParam
): ActionsBlock {
    const { elementBuilder, blockBuilder } = app.getUtils();

    const buttonElement = elementBuilder.addButton(
        { text: buttonText, style, value, url },
        {
            blockId,
            actionId,
        }
    );

    const buttonAction = blockBuilder.createActionBlock({
        elements: [buttonElement],
    });

    return buttonAction;
}
