import { ButtonStyle } from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from "../../../AiProgrammerApp";
import { ElementInteractionParam } from "../../../definition/ui-kit/Element/IElementBuilder";
import { SectionBlock } from "@rocket.chat/ui-kit";

export function ButtonInSectionComponent(
    {
        app,
        buttonText,
        style,
        value,
        url,
        text,
    }: {
        app: AiProgrammerApp;
        buttonText: string;
        style?: ButtonStyle;
        value?: string;
        url?: string;
        text?: string;
    },
    { blockId, actionId }: ElementInteractionParam
): SectionBlock {
    const { elementBuilder, blockBuilder } = app.getUtils();

    const buttonElement = elementBuilder.addButton(
        { text: buttonText, style, value, url },
        {
            blockId,
            actionId,
        }
    );

    const buttonSection = blockBuilder.createSectionBlock({
        text,
        accessory: buttonElement,
    });

    return buttonSection;
}
