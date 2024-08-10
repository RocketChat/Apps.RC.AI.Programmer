import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitActionButtonInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from '../AiProgrammerApp';
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { Modals } from "../enum/Modals";

export class ExecuteActionButtonHandler {
    private context: UIKitActionButtonInteractionContext;
    constructor(
        protected readonly app: AiProgrammerApp,
        protected readonly read: IRead,
        protected readonly http: IHttp,
        protected readonly persistence: IPersistence,
        protected readonly modify: IModify,
        context: UIKitActionButtonInteractionContext
    ) {
        this.context = context;
    }

    public async handleActions(): Promise<IUIKitResponse> {
        const { actionId, user, room, triggerId, message } =
            this.context.getInteractionData();

        switch (actionId) {
            case Modals.CONFIGURE_ACTION: {
                console.log("in action button2");
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                break;
            }
            case Modals.GEN_ACTION: {
                break;
            }
            case Modals.CONFIGURE_BLOCK:{
                console.log("in action button");
                break;
            }
            case Modals.SELECT_LAN_BLOCK:{
                console.log("action2");
            }
            case Modals.SELECT_LAN_ACTION: {
               console.log("action 1")
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
