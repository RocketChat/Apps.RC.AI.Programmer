import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitBlockInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { AiProgrammerApp } from '../AiProgrammerApp';
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { Modals } from "../enum/Modals";
import { Handler } from "./Handler";
import { IAppInfo, RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { regenerateCodePrompt } from '../constants/CodePrompts';
import { generateCode } from '../helpers/generateCode';
import { createRegenerationContextualBar } from "../definition/ui-kit/Modals/createRegenerationContextualBar";
import { sendNotification } from "../helpers/message";
import { RoomInteractionStorage } from "../storage/RoomInteraction";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";

export class ExecuteBlockActionHandler {
    private context: UIKitBlockInteractionContext;
    constructor(
        protected readonly app: AiProgrammerApp,
        protected readonly read: IRead,
        protected readonly http: IHttp,
        protected readonly persistence: IPersistence,
        protected readonly modify: IModify,
        context: UIKitBlockInteractionContext
    ) {
        this.context = context;
    }

    public async handleActions(): Promise<IUIKitResponse> {
        const { actionId, user, triggerId, value, message } =
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
        console.log("handleAction(): room ->" + room.id + " roomId: " + roomId);
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
                console.log("Room Number: "+room.id);
                const persis = this.read.getPersistenceReader();
                const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `selected_language`);
                const record = await persis.readByAssociation(association);
                if (record) {
                    handler.setLanguage(record[0]['language']);
                }
                const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `selected_llm`);
                const LLMrecord = await persis.readByAssociation(LLMassociation);
                if (LLMrecord) {
                    handler.setLLM(LLMrecord[0]['LLM']);
                }
                await sendNotification(
                    this.read,
                    this.modify,
                    user,
                    room,
                    `You have successfully configured to use language: `+record[0]['language'] +' with LLM: '+LLMrecord[0]['LLM']+`!`
                );
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                break;
            }
            case Modals.SELECT_LAN_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `selected_language`);
                    await this.persistence.updateByAssociation(association, { language: value }, true);
                }
                break;
            }
            case Modals.SELECT_LLM_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `selected_llm`);
                    await this.persistence.updateByAssociation(association, { LLM: value }, true);
                }
                break;
            }
            case Modals.COMMENT_INPUT_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `regen_input`);
                    await this.persistence.updateByAssociation(association, { regen_input: value }, true);
                }
                break;
            }
            case Modals.GEN_INPUT_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `gen_input`);
                    await this.persistence.updateByAssociation(association, { gen_input: value }, true);
                }
                break;
            }
            case Modals.GEN_ACTION: {
                const persis = this.read.getPersistenceReader();
                const association_input = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `gen_input`);
                const gen_record = await persis.readByAssociation(association_input);
                if (gen_record) {
                    handler.generateCodeFromParam(gen_record[0]['gen_input'] as string);
                } else {
                    this.app.getLogger().debug("error: no gen command");
                }
                break;
            }
            case Modals.REGEN_ACTION: {
                const persis = this.read.getPersistenceReader();
                const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `result`);
                const result_record = await persis.readByAssociation(association);
                const association_input = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `regen_input`);
                const regen_record = await persis.readByAssociation(association_input);
                if (result_record && regen_record) {
                    handler.regenerateCodeFromResult(result_record[0]['result'], regen_record[0]['regen_input']);
                } else {
                    this.app.getLogger().debug("error: no result/regen command");
                }
                break;
            }
            case Modals.REGEN_BUTTON_ACTION: {
                if (!room) {
                    this.app.getLogger().error("Room is not specified!");
                    break;
                }
                try{
                    const contextualBar = await createRegenerationContextualBar(
                        this.app,
                        user,
                        this.read,
                        this.persistence,
                        this.modify,
                        room
                    );
            
                    if (contextualBar instanceof Error) {
                        this.app.getLogger().error(contextualBar.message);
                        break;
                    }
                    
                    if (triggerId) {
                        await this.modify.getUiController().openSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            user
                        );
                        await this.modify.getUiController().updateSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            user
                        );
                        return this.context.getInteractionResponder().updateContextualBarViewResponse(contextualBar);
                    }
                }
                catch (err) {
                    console.log("Error in when render regen contextual bar: "+err);
                    this.app.getLogger().error(err);
                }
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
