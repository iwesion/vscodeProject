
import * as vscode from 'vscode';
import createTaroSpecificFile from './command/createTaroSpecificFile';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "taroCreateTsx" is now active!');

	context.subscriptions.push(createTaroSpecificFile);
}


export function deactivate() {}
