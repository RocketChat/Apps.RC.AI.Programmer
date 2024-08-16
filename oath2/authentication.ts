import {
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { AiProgrammerApp } from "../AiProgrammerApp";
import { sendNotification } from "../helpers/message";
import { authenComponent } from "../definition/ui-kit/Modals/authenComponent"


export async function authorize(
    app: AiProgrammerApp,
    read: IRead,
    modify: IModify,
    user: IUser,
    room: IRoom,
    persistence: IPersistence
): Promise<void> {
    const url = await app
        .getOauth2ClientInstance()
        .getUserAuthorizationUrl(user, ["gist"]);

    const authen_block = await authenComponent(
        app,
        user,
        read,
        persistence,
        modify,
        room,
        url.toString());
        
    await sendNotification(read, modify, user, room, undefined, authen_block);
}
