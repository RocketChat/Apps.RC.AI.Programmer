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
import { getNewCode, uploadNewCode, uploadGist } from "../helpers/githubSDK";
import { getAccessTokenForUser } from '../persistance/auth';
import { handleLogin, handleLogout } from "../handlers/GithubHandler";

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
    
        switch (view.id) {
            case "mainContextualBar": {
                
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
                        `You have successfully configured programming language: `+lan +' with LLM: '+llm+`!`
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
            case 'generateModal':{
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
            case 'regenModal': {
                
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
            case 'shareInChannel':{
                try{
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
                } catch(err){
                    
                }
                break;
            }
            case 'shareGithub':{
                try{
                    const persis = this.read.getPersistenceReader();
                    const share_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_github_input`));
                    const share_repo_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_github_repo_input`));
                    const share_path_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_github_path_input`));
                    const share_commit_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_github_commit_input`));
                    const share_branch_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_github_branch_input`));
                    if (share_record && share_repo_record && share_path_record && share_commit_record) {
                        let input_str = share_record[0]['share_github_input'] as string
                        let repo = share_repo_record[0]['share_github_repo_input'] as string
                        let path = share_path_record[0]['share_github_path_input'] as string
                        let commit = share_commit_record[0]['share_github_commit_input'] as string
                        let branch = share_branch_record[0]['share_github_branch_input'] as string
                        let accessToken = await getAccessTokenForUser(this.read, user, this.app.oauth2Config);
                        
                        if (!accessToken) {
                            await sendNotification(this.read, this.modify, user, room, "Please make sure your OAuth2 settings are ready and logged into Github using  \`/ai-programmer login \` !");
                        } else {
                            let getresponse = await getNewCode(this.http, repo, path, input_str, commit, accessToken?.token, branch);
                            
                            if (getresponse && !getresponse?.serverError) {
                                
                                await sendNotification(this.read,this.modify,user,room,`File exists, current content will be overwritten!`);
                                
                                let response = await uploadNewCode(
                                    this.http, repo, path, input_str, commit, accessToken?.token, branch, getresponse.sha
                                )
                                if(response && !response?.serverError){
                                    await sendNotification(this.read,this.modify,user,room,`Successfully shared your code to Github!`);
                                }else{
                                    await sendNotification(this.read,this.modify,user,room,`Sharing to Github failed!`);
                                }
                            }
                            else {
                                
                                let response = await uploadNewCode(
                                    this.http, repo, path, input_str, commit, accessToken?.token, branch
                                )
                                if(response && !response?.serverError){
                                    await sendNotification(this.read,this.modify,user,room,`Successfully shared your code to Github!`);
                                }else{
                                    await sendNotification(this.read,this.modify,user,room,`Sharing to Github failed!`);
                                }
                            }
                            
                        }
                    } else {
                        await sendNotification(this.read, this.modify, user, room, "You have to enter all information!");
                    }
                }
                catch(err){
                    
                }
                break;
            }
            case 'shareGist': {
                try {
                    const persis = this.read.getPersistenceReader();
                    const share_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_gist_input`));
                    const gist_filename_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_gist_filename_input`));
                    const gist_commit_record = await persis.readByAssociation(new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `${user.id}#share_gist_commit_input`));
                    const content = share_record[0]["share_gist_input"] as string;
                    const filename = gist_filename_record[0]["share_gist_filename_input"] as string;
                    const commit = gist_commit_record[0]["share_gist_commit_input"] as string;
                    let accessToken = await getAccessTokenForUser(this.read, user, this.app.oauth2Config);
                    if (accessToken == undefined) {
                        console.log("access token undefined");
                        break;
                    }
                    let response = await uploadGist(
                        this.http,
                        content,
                        commit,
                        accessToken.token,
                        filename,
                        "public",
                    )
                    await sendNotification(this.read,this.modify,user,room,`Successfully shared your code to Gist!`);
                }
                catch (err) {
                    await sendNotification(this.read,this.modify,user,room,`Sharing to Gist failed! Here's the error message: `+err);
                }
                break;
            }
        }

        return this.context.getInteractionResponder().successResponse();
    }
}
