<!--
 * @Author: wesion
 * @Date: 2022-07-22 17:08:03
 * @LastEditTime: 2022-07-28 16:52:33
 * @Description: 
-->
# README
你是不是也有在开发项目中，有时候不得不频繁创建项目的模板文件，多次的右键新建文件或者快捷键一个个添加而烦恼？
项目一键添加模板文件为你排忧解难

## 用法
1. 安装插件
2. 在项目**根目录**创建**template**文件夹
3. 添加模板有2种
* template里只有文件，无分级
    >-template
    -template/a.js
    -template/b.tsx
    -template/...
* template里有文件夹（<font color= red>当有文件夹存在，则只能通过选择对应文件夹下面的模板,template文件夹下的文件一概不会被创建</font>）
    >-template
    -template/A
    -template/B
    -template/...
4.  再template添加对应模板,如想替换对应模板文件下的关键key请用 **{componentName}** 
5. 再对应想创建模板的文件下右键呼出界面

**Enjoy!**
