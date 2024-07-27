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
import { generateCode } from '../helpers/generateCode';
import { regenerateCodePrompt, generateCodePrompt } from '../constants/CodePrompts';
import { sendNotification } from "../helpers/message";
import { regenerationComponent } from "../definition/ui-kit/Modals/regenerationComponent";

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
    language: string;
    LLM: string;

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
        this.language = 'Python';
        this.LLM = 'mistral-7b';
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

    public async regenerateCodeFromResult(dialogue: string, last_result: string){
        
        const persis = this.read.getPersistenceReader();
        try{
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'language');
            const record = await persis.readByAssociation(association);
            if (record != undefined) {
                this.language = record[0]['language'] as string;
            }
            else {
                console.log("Read language Fail!");
                this.language = 'Python';
            }
            const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'LLM');
            const LLMrecord = await persis.readByAssociation(LLMassociation);
            if (LLMrecord != undefined) {
                this.LLM = LLMrecord[0]['LLM'] as string;
            }
            else {
                console.log("Read LLM Fail!");
                this.LLM = 'mistral-7b';
            }
        }
        catch (err) {
            console.log("Error in Gen: "+err);
            return this.app.getLogger().error(err);
        }
        await sendNotification(
            this.read,
            this.modify,
            this.sender,
            this.room,
            `You are using language: `+this.language+' with LLM: '+this.LLM+` to generate code. Please wait for the response...
            (Please set language and LLM properly, otherwise you will not get any response!)`
        );
        const prompt = regenerateCodePrompt(dialogue, last_result);
        const result = await generateCode(
            this.app,
            this.room,
            this.read,
            this.sender,
            this.http,
            this.persistence,
            this.modify,
            this.language,
            this.LLM,
            prompt
        );
        if (!result) {
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                `Something is wrong with the AI programmer bot, please check your settings to ensure correct language and LLM are configured!`
            );
        } else {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `result`);
            await this.persistence.updateByAssociation(association, { result: result }, true);
            const regen_block = await regenerationComponent(this.app,
                this.sender,
                this.read,
                this.persistence,
                this.modify,
                this.room);
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                result,
            );
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                undefined,
                regen_block,
            );
        }
    }

    public async generateCodeFromParam(query: string){  
        const persis = this.read.getPersistenceReader();
        try{
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'language');
            const record = await persis.readByAssociation(association);
            if (record != undefined) {
                this.language = record[0]['language'] as string;
            }
            else {
                console.log("Read language Fail!");
                this.language = 'Python';
            }
            const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'LLM');
            const LLMrecord = await persis.readByAssociation(LLMassociation);
            if (LLMrecord != undefined) {
                this.LLM = LLMrecord[0]['LLM'] as string;
            }
            else {
                console.log("Read LLM Fail!");
                this.LLM = 'mistral-7b';
            }
        }
        catch (err) {
            console.log("Error in Gen: "+err);
            return this.app.getLogger().error(err);
        }
        await sendNotification(
            this.read,
            this.modify,
            this.sender,
            this.room,
            `You are using language: `+this.language+' with LLM: '+this.LLM+` to generate code. Please wait for the response...
            (Please set language and LLM properly, otherwise you will not get any response!)`
        );
    
        const prompt = generateCodePrompt(query, this.language);
        const result = await generateCode(
            this.app,
            this.room,
            this.read,
            this.sender,
            this.http,
            this.persistence,
            this.modify,
            this.language,
            this.LLM,
            prompt
        );
        if (!result) {
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                `Something is wrong with the AI programmer bot, please check your settings to ensure correct language and LLM are configured!`
            );
        } else {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `result`);
            await this.persistence.updateByAssociation(association, { result: result }, true);
            const regen_block = await regenerationComponent(this.app,
                this.sender,
                this.read,
                this.persistence,
                this.modify,
                this.room);
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                result,
            );
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                undefined,
                regen_block,
            );
        }
    }
}