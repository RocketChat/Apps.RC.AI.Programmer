import {
	IAppAccessors,
	IConfigurationExtend,
	IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { CodeCommand } from './commands/CodeCommand';
import { settings } from './settings/settings';
import { IUIKitResponse, UIKitActionButtonInteractionContext, UIKitBlockInteractionContext, UIKitViewCloseInteractionContext, UIKitViewSubmitInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { ElementBuilder } from "./lib/ElementBuilder";
import { BlockBuilder } from "./lib/BlockBuilder";
import { ExecuteBlockActionHandler } from './handlers/ExecuteBlockActionHandler';
import { ExecuteViewClosedHandler } from './handlers/ExecuteViewClosedHandler';
import { ExecuteViewSubmitHandler } from './handlers/ExecuteViewSubmitHandler';
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { ProcessorsEnum } from "./enum/Processors";
import {
    IAuthData,
    IOAuth2Client,
    IOAuth2ClientOptions,
} from "@rocket.chat/apps-engine/definition/oauth2/IOAuth2";
import { createOAuth2Client } from "@rocket.chat/apps-engine/definition/oauth2/OAuth2";
import { sendNotification, sendMessage, sendDirectMessage } from "./helpers/message";
import { clearInteractionRoomData, getInteractionRoomData } from "./persistance/roomInteraction";
import { deleteOathToken } from "./processors/deleteOAthToken";
import { SendReminder } from "./handlers/SendReminder";
import { IJobContext, StartupType } from "@rocket.chat/apps-engine/definition/scheduler";
import { githubWebHooks } from "./endpoints/githubEndpoints";
import {
    ApiSecurity,
    ApiVisibility,
} from "@rocket.chat/apps-engine/definition/api";

export class AiProgrammerApp extends App {
	private elementBuilder: ElementBuilder;
    private blockBuilder: BlockBuilder;
	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
		super(info, logger, accessors);
	}


	public async extendConfiguration(configuration: IConfigurationExtend) {
		await Promise.all([
			...settings.map((setting) =>
				configuration.settings.provideSetting(setting)
			),
			configuration.slashCommands.provideSlashCommand(
				new CodeCommand(this)
			),
            this.getOauth2ClientInstance().setup(configuration),
		]);
		this.elementBuilder = new ElementBuilder(this.getID());
        this.blockBuilder = new BlockBuilder(this.getID());
        configuration.scheduler.registerProcessors([
            {
                id: ProcessorsEnum.REMOVE_GITHUB_LOGIN,
                processor: async (jobContext, read, modify, http, persis) => {
                    let user = jobContext.user as IUser;
                    let config = jobContext.config as IOAuth2ClientOptions;
                    try {
                        await deleteOathToken({
                            user,
                            config,
                            read,
                            modify,
                            http,
                            persis,
                        });
                    } catch (e) {
                        await sendDirectMessage(
                            read,
                            modify,
                            user,
                            e.message,
                            persis
                        );
                    }
                },
            },
            {
                id:ProcessorsEnum.PR_REMINDER,
                processor:async(jobData,read,modify,http,persis) =>{
                    await SendReminder(jobData,read,modify,http,persis,this)
                },
                startupSetting:{
                    type:StartupType.RECURRING,
                    interval:"0 9 * * *"
                }
            },
        ]);
        configuration.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [new githubWebHooks(this)],
        });
	}

	public getUtils(){
        return {
            elementBuilder: this.elementBuilder,
            blockBuilder: this.blockBuilder,
        };
    }
    public async authorizationCallback(
        token: IAuthData,
        user: IUser,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ) {
        const deleteTokenTask = {
            id: ProcessorsEnum.REMOVE_GITHUB_LOGIN,
            when: "7 days",
            data: {
                user: user,
                config: this.oauth2Config,
            },
        };
        let text = `GitHub Authentication Succesfull 🚀`;
        let interactionData = await getInteractionRoomData(
            read.getPersistenceReader(),
            user.id
        );

        if (token) {
            await modify.getScheduler().scheduleOnce(deleteTokenTask);
        } else {
            text = `Authentication Failure 😔`;
        }
        if (interactionData && interactionData.roomId) {
            let roomId = interactionData.roomId as string;
            let room = (await read.getRoomReader().getById(roomId)) as IRoom;
            await clearInteractionRoomData(persistence, user.id);
            await sendNotification(read, modify, user, room, text);
        } else {
            await sendDirectMessage(read, modify, user, text, persistence);
        }
    }
    public oauth2ClientInstance: IOAuth2Client;
    public oauth2Config: IOAuth2ClientOptions = {
        alias: "github-app",
        accessTokenUri: "https://github.com/login/oauth/access_token",
        authUri: "https://github.com/login/oauth/authorize",
        refreshTokenUri: "https://github.com/login/oauth/access_token",
        revokeTokenUri: `https://api.github.com/applications/client_id/token`,
        authorizationCallback: this.authorizationCallback.bind(this),
        defaultScopes: ["users", "repo", "gist"],
    };
    public getOauth2ClientInstance(): IOAuth2Client {
        if (!this.oauth2ClientInstance) {
            this.oauth2ClientInstance = createOAuth2Client(
                this,
                this.oauth2Config
            );
        }
        return this.oauth2ClientInstance;
    }

	public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const handler = new ExecuteBlockActionHandler(
            this,
            read,
            http,
            persistence,
            modify,
            context
        );

        return await handler.handleActions();
    }

    public async executeViewSubmitHandler(
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const handler = new ExecuteViewSubmitHandler(
            this,
            read,
            http,
            persistence,
            modify,
            context
        );

        return await handler.handleActions();
    }

    public async executeViewClosedHandler(
        context: UIKitViewCloseInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const handler = new ExecuteViewClosedHandler(
            this,
            read,
            http,
            persistence,
            modify,
            context
        );

        return await handler.handleActions();
    }

}
