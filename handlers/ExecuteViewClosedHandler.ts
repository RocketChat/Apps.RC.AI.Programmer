import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from '../AiProgrammerApp';
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { Modals } from "../enum/Modals";

export class ExecuteViewClosedHandler {
    private context:  UIKitViewCloseInteractionContext;
    constructor(
        protected readonly app: AiProgrammerApp,
        protected readonly read: IRead,
        protected readonly http: IHttp,
        protected readonly persistence: IPersistence,
        protected readonly modify: IModify,
        context:  UIKitViewCloseInteractionContext
    ) {
        this.context = context;
    }

    public async handleActions(): Promise<IUIKitResponse> {
        const { actionId, user, room, triggerId} =
            this.context.getInteractionData();

        switch (actionId) {
            case Modals.CONFIGURE_ACTION: {
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                break;
            }
            case Modals.GEN_ACTION: {
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
