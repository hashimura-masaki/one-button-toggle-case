import * as vscode from 'vscode';

type CaseStyle = "lowerCamelCase" | "UpperCamelCase" | "snake_case" | "SCREAMING_SNAKE_CASE" | "kebab-case" | "SCREAMING-KEBAB-CASE";

const CasePatterns: Record<CaseStyle, RegExp> = {
	"lowerCamelCase": /^[a-z][a-zA-Z0-9]*$/,
	"UpperCamelCase": /^[A-Z][a-zA-Z0-9]*$/,
	"snake_case": /^[a-z][a-z0-9_]*$/,
	"SCREAMING_SNAKE_CASE": /^[A-Z][A-Z0-9_]*$/,
	"kebab-case": /^[a-z][a-z0-9-]*$/,
	"SCREAMING-KEBAB-CASE": /^[A-Z][A-Z0-9-]*$/,
};

const CaseTransformMap: Partial<Record<CaseStyle, CaseStyle>> = {
	"lowerCamelCase": "UpperCamelCase",
	"UpperCamelCase": "snake_case",
	"snake_case": "SCREAMING_SNAKE_CASE",
	"SCREAMING_SNAKE_CASE": "kebab-case",
	"kebab-case": "SCREAMING-KEBAB-CASE",
	"SCREAMING-KEBAB-CASE": "lowerCamelCase",
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('one-button-toggle-case.toggleCase', async() => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor');
			return;
		}
		const document = editor.document;
		const selections = editor.selections;

		await editor.edit((editBuilder) => {
			selections.forEach((selection) => {
				const text = document.getText(selection);
				// Check if the text contains invalid characters
				if(containsInvalidCharacters(text)) {
					vscode.window.showInformationMessage('Invalid text:' + text);
					return;
				}
				const caseStyle:CaseStyle|null = detectCaseStyle(text);
				if (!caseStyle) {
					vscode.window.showInformationMessage('Cannot detect case style for: ' + text);
					return;
				}
				const newText = convertCase(text, CaseTransformMap[caseStyle] as CaseStyle);
				editBuilder.replace(selection, newText);
			});
		});
	});
	context.subscriptions.push(disposable);
}


function containsInvalidCharacters(text: string): boolean {
	const invalidChars = /[^a-zA-Z0-9_-]/;
	return invalidChars.test(text);
}

function detectCaseStyle(text: string): CaseStyle | null {
	for (const [style, pattern] of Object.entries(CasePatterns) as [CaseStyle, RegExp][]) {
		if (pattern.test(text)) {
			return style;
		}
	}
	return null;
}

function convertCase(text: string, targetStyle: CaseStyle): string {
	const words = text.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_\-]/g, " ").toLowerCase().split(" ");

	switch (targetStyle) {
		case "lowerCamelCase":
			return words[0] + words.slice(1).map(capitalize).join("");
		case "UpperCamelCase":
			return words.map(capitalize).join("");
		case "snake_case":
			return words.join("_");
		case "SCREAMING_SNAKE_CASE":
			return words.join("_").toUpperCase();
		case "kebab-case":
			return words.join("-");
		case "SCREAMING-KEBAB-CASE":
			return words.join("-").toUpperCase();
	}
}

function capitalize(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function deactivate() {}