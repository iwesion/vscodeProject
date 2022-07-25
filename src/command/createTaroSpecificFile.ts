/*
 * @Author: wesion
 * @Date: 2022-07-25 10:21:38
 * @LastEditTime: 2022-07-25 16:44:03
 * @Description: 
 */
import * as vscode from 'vscode';
const fse = require('fs-extra');

const path = require('path');

let createTaroSpecificFile = vscode.commands.registerCommand('extension.createTaroSpecificFile', (uri) => {
    if (!uri) {
        return vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
    }
    vscode.window.showInputBox().then(e => {
        let createUri: vscode.Uri = vscode.Uri.file(uri + '/1111.tsx');
        console.log(uri + `${e}.tsx`);

        let tsxfile = uri.path + `/${e}.tsx`;
        let lessfile = uri.path + `/${e}.module.less`;

        let templatesDir = path.join(__dirname);
       

        fse.ensureFile(tsxfile)
            .then(() => {
                let templateFileName = templatesDir + '/functional.template';
                //替换方法名->文件名
                let componentContent = fse
                .readFileSync(templateFileName)
                .toString()
                .replace(/{componentName}/g, e);
                fse.outputFile(tsxfile, componentContent);

                console.log('success!');
            })
            .catch((err: any) => {
                console.error(err);
            });
        fse.ensureFile(lessfile)
            .then(() => {

                let componentContent = fse
                .readFileSync( templatesDir + '/styles.template')
                .toString();
                fse.outputFile(lessfile, componentContent);
                console.log('success!');
            })
            .catch((err: any) => {
                console.error(err);
            });

    });



});

// this method is called when your extension is deactivated
export default createTaroSpecificFile;