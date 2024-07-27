import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SubcommandEnum } from "../enum/Subcommands";
import { helperMessage } from "./helperMessage";
import { generateCodePrompt } from '../constants/CodePrompts';
import { generateCode } from './generateCode';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { sendNotification } from "./message";
import { AiProgrammerApp } from "../AiProgrammerApp";
import { createMainContextualBar } from "../definition/ui-kit/Modals/createMainContextualBar";
import { IAppInfo, RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { Handler } from "../handlers/Handler";
import { regenerationComponent } from "../definition/ui-kit/Modals/regenerationComponent";

export class CommandUtility {
    sender: IUser;
    room: IRoom;
    command: string[];
    context: SlashCommandContext;
    read: IRead;
    modify: IModify;
    http: IHttp;
    persistence: IPersistence;
    app: AiProgrammerApp;
    triggerId?: string;
    language: string;
    LLM: string;
    

    constructor(props) {
        this.sender = props.sender;
        this.room = props.room;
        this.command = props.command;
        this.context = props.context;
        this.read = props.read;
        this.modify = props.modify;
        this.http = props.http;
        this.persistence = props.persistence;
        this.app = props.app;
        this.triggerId = props.triggerId;
        this.language = 'Python';
        this.LLM = 'mistral-7b';
    }

    private async handleSingularParamCommands() {
        const data = {
            room: this.room,
            sender: this.sender,
            arguments: this.command,
        };
        const handler = new Handler({
            app: this.app,
            read: this.read,
            modify: this.modify,
            persistence: this.persistence,
            http: this.http,
            sender: this.sender,
            room: this.room,
            triggerId: this.triggerId,
        });
        if (this.command[0].includes("/")) {
            
        } else {
            switch (this.command[0]) {
                case SubcommandEnum.TEST: {
                    break;
                }
                case SubcommandEnum.UI: {
                    const contextualBar = await createMainContextualBar(
                        this.app,
                        this.sender,
                        this.read,
                        this.persistence,
                        this.modify,
                        this.room
                    );
            
                    if (contextualBar instanceof Error) {
                        this.app.getLogger().error(contextualBar.message);
                        return;
                    }
                    const triggerId = this.triggerId;
                    if (triggerId) {
                        await this.modify.getUiController().openSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            this.sender
                        );
                        await this.modify.getUiController().updateSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            this.sender
                        );
                    }
                    break;
                }
                case SubcommandEnum.LIST: {
                    console.log("Room Number: "+this.room.id);
                    await sendNotification(
                        this.read,
                        this.modify,
                        this.sender,
                        this.room,
                        ` 
                        * According to the regulation fo RC community, you can choose from the following LLMs: *
1. mistral-7b
2. llama3-70b
3. codellama-7b
4. codestral-22b
Please use the direct name of LLM as above in the command \`/ai-programmer llm xxx\` to switch to that LLM.
    `
                    );
                    break;
                }
                case SubcommandEnum.REGEN: {
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
                        undefined,
                        regen_block,
                    );
                    break;
                }
                default: {
                    await helperMessage({
                        room: this.room,
                        read: this.read,
                        persistence: this.persistence,
                        modify: this.modify,
                        http: this.http,
                        user: this.sender
                    });
                    break;
                }
            }
        }
    }

    private async handleDualParamCommands() {
        const query = this.command[1];
        const param = this.command[0];
        const handler = new Handler({
            app: this.app,
            read: this.read,
            modify: this.modify,
            persistence: this.persistence,
            http: this.http,
            sender: this.sender,
            room: this.room,
            triggerId: this.triggerId,
        });
        if (param.startsWith('set')){
            handler.setLanguage(query);
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                "You have successfully set programming language to: " + query
            );
        }
        else if (param.startsWith('LLM')){
            handler.setLLM(query);
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                "You have successfully switched LLM to: " + query
            );
        }
    }


    private async handleTriParamCommand() {
        const data = {
            repository: this.command[0],
            query: this.command[1],
            number: this.command[2],
        };

    }

    public async resolveCommand() {
        const handler = new Handler({
            app: this.app,
            read: this.read,
            modify: this.modify,
            persistence: this.persistence,
            http: this.http,
            sender: this.sender,
            room: this.room,
            triggerId: this.triggerId,
        });
        if (this.command.length && this.command[0].startsWith('gen')) {
            let query = '';
            for(let i = 1; i < this.command.length; i++) {
                query += this.command[i];
                query += ' ';
            }
            handler.generateCodeFromParam(query);
        } else {
            switch (this.command.length) {
                case 0: {
                    const contextualBar = await createMainContextualBar(
                        this.app,
                        this.sender,
                        this.read,
                        this.persistence,
                        this.modify,
                        this.room
                    );
            
                    if (contextualBar instanceof Error) {
                        this.app.getLogger().error(contextualBar.message);
                        return;
                    }
                    const triggerId = this.triggerId;
                    if (triggerId) {
                        await this.modify.getUiController().openSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            this.sender
                        );
                        await this.modify.getUiController().updateSurfaceView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            this.sender
                        );
                    }
                    break;
                }
                case 1: {
                    this.handleSingularParamCommands();
                    break;
                }
                case 2: {
                    this.handleDualParamCommands();
                    break;
                }
                case 3: {
                    this.handleTriParamCommand();
                    break;
                }
                default: {
                    await helperMessage({
                        room: this.room,
                        read: this.read,
                        persistence: this.persistence,
                        modify: this.modify,
                        http: this.http,
                        user: this.sender
                    });
                    break;
                }
            }
        }
    }

}
