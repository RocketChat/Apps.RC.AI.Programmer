import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function helperMessage({
    room,
    read,
    persistence,
    modify,
    http,
    user
}: {
    room: IRoom;
    read: IRead;
    persistence: IPersistence;
    modify: IModify;
    http: IHttp;
    user?: IUser;
}) {
    let helperMessageString = `### AI Programmer App
    *The app can be accessed with the slash commands \`/ai-programmer\`. You can also use the following slash commands to use features:*
    1. Generate code pieces with specific description (please set language and llm correctly first!) -> \`/ai-programmer gen code_content\`
    2. Set the language you want to use to generate code -> \`/ai-programmer set C++\`
    3. Switch to the LLM you want to use to generate code -> \`/ai-programmer llm llama3-70b\`
    4. List the available LLM options -> \`/ai-programmer list \`
    5. Use the interactive user interface to handle your operations -> \`/ai-programmer ui \`
    6. Login to Github (You should set OAuth2 settings first!) -> \`/ai-programmer login \`.
    7. Logout to Github -> \`/ai-programmer logout \`.
    `;

    const textSender = await modify
        .getCreator()
        .startMessage()
        .setText(`${helperMessageString}`);

    if (room) {
        textSender.setRoom(room);
    }

    await modify.getNotifier().notifyUser(user as IUser, textSender.getMessage());
}
