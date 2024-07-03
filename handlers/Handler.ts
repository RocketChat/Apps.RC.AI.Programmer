import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { AiProgrammerApp } from "../AiProgrammerApp";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IAppInfo, RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';

export class Handler {
    public app: AiProgrammerApp;
    public sender: IUser;
    public room: IRoom;
    public read: IRead;
    public modify: IModify;
    public http: IHttp;
    public persistence: IPersistence;
    public triggerId?: string;
    public threadId?: string;

    constructor(params) {
        this.app = params.app;
        this.sender = params.sender;
        this.room = params.room;
        this.read = params.read;
        this.modify = params.modify;
        this.http = params.http;
        this.persistence = params.persistence;
        this.triggerId = params.triggerId;
        this.threadId = params.threadId;
    }

    public async setLanguage(query : string) : Promise<void> {
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `language`);
        const persis = this.read.getPersistenceReader();
        try {
            await this.persistence.updateByAssociation(association, { language: query }, true);
            const record = await persis.readByAssociation(association);
            console.log("Successfully set language: " + record[0]['language']);
        } catch (err) {
            console.log("Error: "+err);
            return this.app.getLogger().error(err);
        }
    }

    public async setLLM(query : string) : Promise<void> {
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `LLM`);
        const persis = this.read.getPersistenceReader();
        try {
            await this.persistence.updateByAssociation(association, { LLM: query }, true);
            const record = await persis.readByAssociation(association);
            console.log("Successfully set LLM: " + record[0]['LLM']);
        } catch (err) {
            console.log("Error: "+err);
            return this.app.getLogger().error(err);
        }
    }
}