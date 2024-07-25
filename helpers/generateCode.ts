import { IRead, IPersistence, IHttp, IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { notifyMessage } from './notifyMessage';
import { sendNotification } from "./message";
import { App } from '@rocket.chat/apps-engine/definition/App';

export async function generateCode(
	app: App,
	room: IRoom,
	read: IRead,
	user: IUser,
	http: IHttp,
    persistence: IPersistence,
    modify: IModify,
    language: string,
    LLM: string,
	prompt: string
): Promise<string> {
	const model = await app
		.getAccessors()
		.environmentReader.getSettings()
		.getValueById('model');
	const url = `http://${LLM}/v1`;

	const body = {
		model,
		messages: [
			{
				role: 'system',
				content: prompt,
			},
		],
		temperature: 0,
	};

	const response = await http.post(url + '/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
		},
		content: JSON.stringify(body),
	});

	if (!response.content) {
		await sendNotification(
			read,
			modify,
			user,
			room,
			"Something is wrong with AI. Please try again later! "
        );
		throw new Error('Something is wrong with AI. Please try again later');
	}

	return JSON.parse(response.content).choices[0].message.content;
}
