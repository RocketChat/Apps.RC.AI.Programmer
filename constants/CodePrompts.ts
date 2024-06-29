const CODE_PROMPT = `You are a system assistant that helps users generate short code modules 
in {language} language based on the specification supplied by the user: {dialogue}. 
Please generate the code with proper format.`;
export function generateCodePrompt(dialogue: string, language: string): string {
	return CODE_PROMPT.replace('{dialogue}', dialogue).replace('{language}', language);
}
