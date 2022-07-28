/*
 * @Author: wesion
 * @Date: 2022-07-25 10:21:38
 * @LastEditTime: 2022-07-28 14:54:46
 * @Description: 
 */
import * as vscode from 'vscode';
import * as fse from 'fs-extra';
const fs = require('fs');
const rpath = require('path');

function showErrToast() {
    vscode.window.showErrorMessage("添加失败");
}

/**
 * 获取当前文件夹下的文件
 * @param templateDirPath 模板路径(先去/template找，没有的话用tsx、less模板)
 * @param targetDirPath 目标文件夹路径
 */
function getDirectoryContain(templateDirPath: string, targetDirPath: string) {
    //判断当前是否有模板文件夹
    vscode.workspace.fs.readDirectory(vscode.Uri.file(templateDirPath)).then(files => {
        //template模板文件下对应的dir数和file数
        var dirArr: string[] = [], fileArr: string[] = [];
        files.map(e => {
            if (e[1] === 2) {
                dirArr.push(e[0]);
            } else if (e[1] === 1) {
                fileArr.push(e[0]);
            }
        });
        //默认当template文件夹下有dir则弹出选择，2.当没有dir则去看对应file数，3.都没有的情况则去取默认文件夹
        if (dirArr.length > 0) {
            vscode.window.showQuickPick(dirArr,{placeHolder:"选择template文件创建的模板"}).then(e => {
                let chgDirPath = templateDirPath + "/" + e;
                getDirectoryContain(chgDirPath, targetDirPath);
            });
        } else if (fileArr.length > 0) {
            vscode.window.showInputBox({ placeHolder: "输入文件名" }).then(name => {
                if (!name) {
                    return;
                }
                fileArr.map(templateFileName => {
                    createComponentFile(templateDirPath, templateFileName, targetDirPath, name);
                });
            });

        } else {
            vscode.window.showErrorMessage("template文件目录下为空,请添加模板");
        }





    }, err => {
        vscode.window.showInputBox({ placeHolder: "输入文件名" }).then(name => {
            if (!name) {
                return;
            }
            createDefaultComponentFile(targetDirPath, name);
        });

    });
}
//创建组件文件
/**
 * 
* @param templateDirPath 模板文件夹路径
 * @param templateFileName 模板文件名(全名带后缀)
 * @param targetFilePath 目标文件路径
 * @param targetFileName 目标文件名
 */
function createComponentFile(templateDirPath: string, templateFileName: string, targetFilePath: string, targetFileName: string) {

    //拆分templateFileName，通过"."拆分
    let templateFileNameArr = templateFileName.split('.');
    //不带后缀的模板文件名
    var templateFileNameWithoutSuffix = templateFileNameArr[0];
    //模板文件名的后缀
    var templateFileNameSuffix = "";
    if (templateFileNameArr.length > 1) {
        templateFileNameSuffix = templateFileName.substring(templateFileNameWithoutSuffix.length - 1);
    }
    //拼接好完整的目标路径
    let targetPath = targetFilePath + '/' + targetFileName + templateFileNameSuffix;

    fse.ensureFile(targetPath)
        .then(() => {
            //替换方法名->文件名
            let componentContent = fse
                .readFileSync(templateDirPath + "/" + templateFileName)
                .toString()
                .replace(/{componentName}/g, targetFileName);
            fse.outputFile(targetPath, componentContent);

            console.log('success!');
        })
        .catch((err: any) => {
            console.error(err);
        });
}
//
/**
 * 创建默认组件文件（tsx+less）
 * @param targetPath 目标路径
 * @param fileName 用户自主想创建的文件名
 */
function createDefaultComponentFile(targetDirPath: string, targetFileName: string) {
    let tsxfile = targetDirPath + `/${targetFileName}.tsx`;
    let lessfile = targetDirPath + `/${targetFileName}.module.less`;
    //插件项目里的template路径
    let templatesDir = rpath.join(__dirname);
    fse.ensureFile(tsxfile)
        .then(() => {

            let componentContent = fse
                .readFileSync(templatesDir + '/functional.template')
                .toString().replace(/{componentName}/g, targetFileName);;
            fse.outputFile(tsxfile, componentContent);
            console.log('success!');
        })
        .catch((err: any) => {
            showErrToast();
        });
    fse.ensureFile(lessfile)
        .then(() => {

            let componentContent = fse
                .readFileSync(templatesDir + '/styles.template')
                .toString();
            fse.outputFile(lessfile, componentContent);
            console.log('success!');
        })
        .catch((err: any) => {
            showErrToast();
        });
}


let createTaroSpecificFile = vscode.commands.registerCommand('extension.createTaroSpecificFile', (uri) => {


    if (!uri) {
        return vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
    }
    var contextMenuSourcePath = uri.path;
    //点击文件的时候获取当前文件的文件夹路径
    if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
        contextMenuSourcePath = uri.fsPath;
    } else {
        contextMenuSourcePath = rpath.dirname(uri.fsPath);
    }

    // 获取当前项目的根目录
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        //获取项目根目录
        let rootPath = vscode.workspace.workspaceFolders[0].uri;
        // //获取当前文件夹下的文件
        getDirectoryContain(rootPath.path + '/template', contextMenuSourcePath);
    }





});

// this method is called when your extension is deactivated
export default createTaroSpecificFile;