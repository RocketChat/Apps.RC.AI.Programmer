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
        if (this.command[0].includes("/")) {
            
        } else {
            switch (this.command[0]) {
                // case SubcommandEnum.LOGIN: {
                //     await handleLogin(
                //         this.app,
                //         this.read,
                //         this.modify,
                //         this.context,
                //         this.room,
                //         this.persistence
                //     );
                //     break;
                // }
                // case SubcommandEnum.LOGOUT: {
                //     await handleLogout(
                //         this.app,
                //         this.read,
                //         this.modify,
                //         this.context,
                //         this.room,
                //         this.persistence,
                //         this.sender,
                //         this.http
                //     );
                //     break;
                // }
                case SubcommandEnum.TEST: {
                    const contextualBar = await createMainContextualBar(
                        this.app,
                        this.sender,
                        this.read,
                        this.persistence,
                        this.modify,
                        this.room
                    );
            
                    if (contextualBar instanceof Error) {
                        // Something went Wrong Propably SearchPageComponent Couldn't Fetch the Pages
                        this.app.getLogger().error(contextualBar.message);
                        return;
                    }
                    const triggerId = this.triggerId;
                    this.app.getLogger().debug("In test, triggerid: "+triggerId);
                    if (triggerId) {
                        this.app.getLogger().debug("inside");
                        await this.modify.getUiController().openContextualBarView(
                            contextualBar,
                            {
                                triggerId,
                            },
                            this.sender
                        );
                    }
                    break;
                }
                // case SubcommandEnum.SUBSCRIBE: {
                //     ManageSubscriptions(
                //         this.read,
                //         this.context,
                //         this.app,
                //         this.persistence,
                //         this.http,
                //         this.room,
                //         this.modify
                //     );
                //     break;
                // }
                // case SubcommandEnum.NEW_ISSUE: {
                //     handleNewIssue(
                //         this.read,
                //         this.context,
                //         this.app,
                //         this.persistence,
                //         this.http,
                //         this.room,
                //         this.modify
                //     );
                //     break;
                // }
                // case SubcommandEnum.SEARCH: {
                //     handleSearch(
                //         this.read,
                //         this.context,
                //         this.app,
                //         this.persistence,
                //         this.http,
                //         this.room,
                //         this.modify
                //     );
                //     break;
                // }
                // case SubcommandEnum.PROFILE: {
                //     await handleUserProfileRequest(
                //         this.read,
                //         this.context,
                //         this.app,
                //         this.persistence,
                //         this.http,
                //         this.room,
                //         this.modify
                //     );
                //     break;
                // }
                // case SubcommandEnum.ISSUES: {
                //     handleIssues(
                //         this.read,
                //         this.context,
                //         this.app,
                //         this.persistence,
                //         this.http,
                //         this.room,
                //         this.modify
                //     )
                //     break;
                // }
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
        if (param.startsWith('gen')){
            const prompt = generateCodePrompt(query, this.language);
            const result = await generateCode(
                this.app,
                this.room,
                this.read,
                this.sender,
                this.http,
                this.context,
                this.persistence,
                this.modify,
                this.language,
                this.LLM,
                prompt
            );
            await sendNotification(
                this.read,
                this.modify,
                this.sender,
                this.room,
                result
            );
        }
        else if (param.startsWith('set')){
            this.language = query;
        }
        else if (param.startsWith('LLM')){
            this.LLM = query;
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
        switch (this.command.length) {
            case 0: {
                // handleMainModal(
                //     this.read,
                //     this.context,
                //     this.persistence,
                //     this.http,
                //     this.room,
                //     this.modify
                // );
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
