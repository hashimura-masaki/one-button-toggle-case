import * as vscode from 'vscode';

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
				if(text.indexOf(' ') !== -1) {
					vscode.window.showInformationMessage('Invalid text:' + text);
				}
				const toggleText = toggleCase(text);
				editBuilder.replace(selection, toggleText);
			});
		});
	});
	context.subscriptions.push(disposable);
}

function toggleCase(text: string): string {
	
	return "1";
}

// This method is called when your extension is deactivated
export function deactivate() {}
