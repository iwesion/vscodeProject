/*
 * @Author: wesion
 * @Date: 2022-07-22 17:08:03
 * @LastEditTime: 2022-07-28 15:38:57
 * @Description: 
 */

import * as vscode from 'vscode';
import createTaroSpecificFile from './command/createCustomTemplate';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "taroCreateTsx" is now active!');

	context.subscriptions.push(createTaroSpecificFile);
}


export function deactivate() {}
