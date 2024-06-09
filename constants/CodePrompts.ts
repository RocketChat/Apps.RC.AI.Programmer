const CODE_PROMPT = `You are a system assistant that helps users write short code modules 
in C/C++, Java, Javascript, Typescript or Python based on the specification supplied by the user, the specifications are separated by double slashes as (//): {dialogue}. 
Please generate the code and in the first row of your response describe the main funtionality of this code pieces in less than 20 words. Remember to wrap your code piece part with single quote pairs.`;

export function createSummaryPrompt(dialogue: string): string {
	return CODE_PROMPT.replace('{dialogue}', dialogue);
}
