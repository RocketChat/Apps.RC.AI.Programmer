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
import { sendNotification, sendMessage } from "../helpers/message";
import { shareComponent } from "../definition/ui-kit/Modals/shareComponent";

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
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#language`);
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
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#LLM`);
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

    public async getLanguage(): Promise<string> {
        const persis = this.read.getPersistenceReader();
        try{
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#language`);
            const record = await persis.readByAssociation(association);
            if (record != undefined) {
                this.language = record[0]['language'] as string;
            }
            else {
                console.log("Read language Fail!");
                this.language = 'Python';
            }
        }
        catch (err) {
            console.log("Error read languange: "+err); 
        }
        return this.language;
    }

    public async getLLM(): Promise<string> {
        const persis = this.read.getPersistenceReader();
        try{
            const LLMassociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#LLM`);
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
            console.log("Error read LLM: "+err); 
        }
        return this.LLM;
    }

    public async regenerateCodeFromResult(dialogue: string, last_result: string){
        
        try{
            this.language = await this.getLanguage();
            this.LLM = await this.getLLM();
        }
        catch (err) {
            console.log("Error in getting language and llm: "+err);
            return this.app.getLogger().error(err);
        }
        await sendNotification(
            this.read,
            this.modify,
            this.sender,
            this.room,
            `You are using language: `+this.language+' with LLM: '+this.LLM+` to refine code.
            Please wait for the response... it may take a long time`
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
        const code_content = this.extractCodeBlockContent(result)
        if (!code_content)  {
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                `Something is wrong with the AI programmer bot, please check your settings to ensure correct language and LLM are configured!`
            );
        } else {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#result`);
            await this.persistence.updateByAssociation(association, { result: code_content }, true);
            this.sendCodeResultwithBlocks(code_content);
        }
    }

    public async generateCodeFromParam(query: string){  
       
        try{
            this.language = await this.getLanguage();
            this.LLM = await this.getLLM();
        }
        catch (err) {
            console.log("Error in getting language and llm: "+err);
            return this.app.getLogger().error(err);
        }
        await sendNotification(
            this.read,
            this.modify,
            this.sender,
            this.room,
            `You are using language: `+this.language+' with LLM: '+this.LLM+` to generate code.
            Please wait for the response... it may take a long time`
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
        const code_content = this.extractCodeBlockContent(result)
        if (!code_content) {
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                `Something is wrong with the AI programmer bot, please check your settings to ensure correct language and LLM are configured!`
            );
        } else {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${this.sender.id}#result`);
            await this.persistence.updateByAssociation(association, { result: code_content }, true);
            this.sendCodeResultwithBlocks(code_content);
        }
    }
    private async sendCodeResultwithBlocks(result: string){
        const share_block = await shareComponent(this.app,
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
            share_block,
        );
    }
    private extractCodeBlockContent(text: string): string | null {
        const codeBlockRegex = /```[\s\S]*?\n([\s\S]*?)```/;
        const match = text.match(codeBlockRegex);
        
        if (match && match[1]) {
            const extractedContent = match[1].trim();
            return '```\n' + extractedContent + '\n```';
        }
        
        return null;
    }
    
}