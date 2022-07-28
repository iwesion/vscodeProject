<!--
 * @Author: wesion
 * @Date: 2022-07-22 17:08:03
 * @LastEditTime: 2022-07-28 14:49:35
 * @Description: 
-->
# taroCreateTsx README

 项目一键添加模板文件文件

## 用法
1. 安装插件
2. 在项目**根目录**创建**template**文件夹
3. 添加模板有2种
* template里只有文件，无分级
    >-template
    >-template/a.js
    >-template/b.tsx
    >-template/...
* template里有文件夹（<font color= red>当有文件夹存在，则只能通过选择对应文件夹下面的模板,template文件夹下的问价一概不会被创建</font>）
    >-template
    >-template/A
    >-template/B
    >-template/...
4.  再template添加对应模板,如想替换对应模板文件下的关键key请用 **{componentName}** 
5. 再对应想创建模板的文件下右键呼出界面

**Enjoy!**
