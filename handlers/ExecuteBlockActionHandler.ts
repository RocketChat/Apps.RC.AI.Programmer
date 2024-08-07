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
import { createMainContextualBar } from "../definition/ui-kit/Modals/createMainContextualBar";
import { sendNotification, sendMessage } from "../helpers/message";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { generateCodeModal } from "../definition/ui-kit/Modals/generateCodeModal";
import { regenerateCodeModal } from "../definition/ui-kit/Modals/regenerateCodeModal";
import { shareCodeModal } from "../definition/ui-kit/Modals/shareCodeModal";

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
                const persis = this.read.getPersistenceReader();
                const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_language`);
                const record = await persis.readByAssociation(association);
                let selected_language = "";
                if (record) {
                    selected_language = record[0]['language'];
                    handler.setLanguage(selected_language);
                }
                let selected_llm = "";
                const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_llm`);
                const LLMrecord = await persis.readByAssociation(LLMassociation);
                if (LLMrecord) {
                    selected_llm = LLMrecord[0]['LLM'];
                    handler.setLLM(selected_llm);
                }
                if (selected_language != "" && selected_llm != ""){
                    await sendNotification(
                        this.read,
                        this.modify,
                        user,
                        room,
                        `You have successfully configured language: `+selected_language +' with LLM: '+selected_llm+` for code generation!`
                    );
                    const contextualBar = await createMainContextualBar(
                            this.app,
                            user,
                            this.read,
                            this.persistence,
                            this.modify,
                            room,
                            undefined,
                            true
                    );
                    if (contextualBar instanceof Error) {
                        this.app.getLogger().error(contextualBar.message);
                        break;
                    }
                    if (triggerId) {
                        await this.modify.getUiController().updateSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            user
                        );
                    }
                }
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                break;
            }
            case Modals.SELECT_LAN_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_language`);
                    await this.persistence.updateByAssociation(association, { language: value }, true);
                }
                break;
            }
            case Modals.SELECT_LLM_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#selected_llm`);
                    await this.persistence.updateByAssociation(association, { LLM: value }, true);
                }
                break;
            }
            case Modals.COMMENT_INPUT_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#regen_input`);
                    await this.persistence.updateByAssociation(association, { regen_input: value }, true);
                }
                break;
            }
            case Modals.GEN_INPUT_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#gen_input`);
                    await this.persistence.updateByAssociation(association, { gen_input: value }, true);
                }
                break;
            }
            case Modals.SHARE_INPUT_ACTION: {
                if (value) {
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_input`);
                    await this.persistence.updateByAssociation(association, { share_input: value }, true);
                }
                break;
            }
            case Modals.SHARE_ACTION: {
                const persis = this.read.getPersistenceReader();
                const association_input = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_input`);
                const share_record = await persis.readByAssociation(association_input);
                if (share_record) {
                    let input_str = share_record[0]['share_input'] as string
                    await sendMessage(
                            this.modify,
                            room,
                            user,
                            input_str,
                        );
                } else {
                    this.app.getLogger().debug("error: no sharing content");
                }
                break;
            }
            case Modals.GEN_ACTION: {
                const persis = this.read.getPersistenceReader();
                const association_input = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#gen_input`);
                const gen_record = await persis.readByAssociation(association_input);
                if (gen_record) {
                    let input_str = gen_record[0]['gen_input'] as string
                    input_str = input_str.substring(0,Math.min(1000, input_str.length))
                    handler.generateCodeFromParam(input_str);
                } else {
                    this.app.getLogger().debug("error: no gen command");
                }
                break;
            }
            case Modals.REGEN_ACTION: {
                const persis = this.read.getPersistenceReader();
                const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#result`);
                const result_record = await persis.readByAssociation(association);
                const association_input = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#regen_input`);
                const regen_record = await persis.readByAssociation(association_input);
                if (result_record && regen_record) {
                    let result_str = result_record[0]['result'] as string
                    result_str = result_str.substring(0,Math.min(3000, result_str.length))
                    let input_str = regen_record[0]['regen_input'] as string
                    input_str = input_str.substring(0,Math.min(1000, input_str.length))
                    handler.regenerateCodeFromResult(result_str, input_str);
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
                    const modal = await regenerateCodeModal(
                        this.app,
                        user,
                        room,
                        this.read,
                        this.modify,
                        this.http,
                        this.persistence,
                        triggerId
                    );
                    if (modal instanceof Error) {
                        this.app.getLogger().error(modal.message);
                        break;
                    }
                    
                    if (triggerId) {
                        await this.modify.getUiController().openSurfaceView(
                            modal,
                            {
                                triggerId,
                            },
                            user
                        );
                    }
                }
                catch (err) {
                    console.log("Error in when render regen modal: "+err);
                    this.app.getLogger().error(err);
                }
                break;
            }
            case Modals.GEN_BUTTON_ACTION: {
                if (!room) {
                    this.app.getLogger().error("Room is not specified!");
                    break;
                }
                try{
                    let language = handler.getLanguage()
                    let LLM = handler.getLLM()
                    if (language == undefined || LLM == undefined){
                        await sendNotification(
                            this.read,
                            this.modify,
                            user,
                            room,
                            `Please make sure you have set correct language and LLM !`
                        );
                        break;
                    }
                    else {
                        const modal = await generateCodeModal(
                            this.app,
                            user,
                            room,
                            this.read,
                            this.modify,
                            this.http,
                            this.persistence,
                            triggerId
                        );
                        if (modal instanceof Error) {
                            this.app.getLogger().error(modal.message);
                            break;
                        }
                        
                        if (triggerId) {
                            await this.modify.getUiController().openSurfaceView(
                                modal,
                                {
                                    triggerId,
                                },
                                user
                            );
                        }
                    }
                }
                catch (err) {
                    console.log("Error in when render gen modal: "+err);
                    this.app.getLogger().error(err);
                }
                break;
            }
            case Modals.SHARE_BUTTON_ACTION: {
                if (!room) {
                    this.app.getLogger().error("Room is not specified!");
                    break;
                }
                try{
                    const persis = this.read.getPersistenceReader();
                    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#result`);
                    const result_record = await persis.readByAssociation(association);
                    
                    if (result_record) {
                        let result_str = result_record[0]['result'] as string;
                        const modal = await shareCodeModal(
                            this.app,
                            user,
                            room,
                            this.read,
                            this.modify,
                            this.http,
                            this.persistence,
                            result_str,
                            triggerId
                        );
                        if (modal instanceof Error) {
                            this.app.getLogger().error(modal.message);
                            break;
                        }
                        
                        if (triggerId) {
                            await this.modify.getUiController().openSurfaceView(
                                modal,
                                {
                                    triggerId,
                                },
                                user
                            );
                        }
                    } else {
                        this.app.getLogger().debug("error: no share content");
                    }
                }
                catch (err) {
                    console.log("Error in when render share modal: "+err);
                    this.app.getLogger().error(err);
                }
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
