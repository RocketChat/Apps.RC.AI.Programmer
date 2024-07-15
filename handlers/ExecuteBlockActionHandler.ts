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

export class ExecuteBlockActionHandler {
    private context: UIKitBlockInteractionContext;
    // private select_lang: string;
    // private select_llm: string;
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
        const { actionId, user, room, triggerId, value, message } =
            this.context.getInteractionData();
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
                break;
            }
            case Modals.MAIN_CLOSE_ACTION: {
                console.log("pressed close2");
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
                
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
