import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitViewSubmitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from '../AiProgrammerApp';
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { Modals } from "../enum/Modals";
import { IAppInfo, RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { sendNotification, sendMessage } from "../helpers/message";
import { Handler } from "./Handler";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { generationComponent } from "../definition/ui-kit/Modals/generationComponent";

export class ExecuteViewSubmitHandler {
    private context:  UIKitViewSubmitInteractionContext;
    constructor(
        protected readonly app: AiProgrammerApp,
        protected readonly read: IRead,
        protected readonly http: IHttp,
        protected readonly persistence: IPersistence,
        protected readonly modify: IModify,
        context:  UIKitViewSubmitInteractionContext
    ) {
        this.context = context;
    }

    public async handleActions(): Promise<IUIKitResponse> {
        const { actionId, user, view, triggerId} =
            this.context.getInteractionData();
        
        const persistenceRead = this.read.getPersistenceReader();
        const association = new RocketChatAssociationRecord(
            RocketChatAssociationModel.USER,
            `${user.id}#RoomId`
        );
        const [result] = (await persistenceRead.readByAssociation(
            association
        )) as Array<{ roomId: string }>;
        const roomId = result.roomId;
        const room = (await this.read.getRoomReader().getById(roomId)) as IRoom;
        if (!room) return this.context.getInteractionResponder().errorResponse();
        const handler = new Handler({
            app: this.app,
            read: this.read,
            modify: this.modify,
            persistence: this.persistence,
            http: this.http,
            sender: user,
            room,
            triggerId,
        });
        switch (actionId) {
            case Modals.CONFIGURE_ACTION: {
                console.log("pressed configure4");
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                console.log("pressed close4");
                break;
            }
            case Modals.GEN_ACTION: {
                console.log("gen_action view submit");
                break;
            }
            
        }

        switch (view.id) {
            case "mainContextualBar": {
                console.log("submit handling main context -->");
                let lan: string|undefined = view.state?.[Modals.SELECT_LAN_BLOCK]?.[Modals.SELECT_LAN_ACTION];
                let llm: string|undefined = view.state?.[Modals.SELECT_LLM_BLOCK]?.[Modals.SELECT_LLM_ACTION];
                if (lan && llm) {
                    const association_llm = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_llm`);
                    await this.persistence.updateByAssociation(association_llm, { LLM: llm }, true);
                    handler.setLLM(llm);
                    const association_lan = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_language`);
                    await this.persistence.updateByAssociation(association_lan, { language: lan }, true);
                    handler.setLanguage(lan);
                    await sendNotification(
                        this.read,
                        this.modify,
                        user,
                        room,
                        `You have successfully configured language: `+lan +' with LLM: '+llm+` for code generation!`
                    );
                    const gen_block = await generationComponent(this.app,
                        user,
                        this.read,
                        this.persistence,
                        this.modify,
                        room);
                    await sendNotification(
                        this.read,
                        this.modify,
                        user,
                        room,
                        undefined,
                        gen_block
                    );
                }
                else {
                    await sendNotification(
                        this.read,
                        this.modify,
                        user,
                        room,
                        `Your configuration is invalid, please check your configuration!`
                    );
                }
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
