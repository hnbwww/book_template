# Book_template_VuePress

这是VuePress生成书籍的模板



---
home: true
title: Hello XXX VuePress
description: 这是VuePress书籍生成模板
heroImage: https://vuejs.press/images/hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /投资大师/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
- title: 书籍生成模板
  details: 这是书籍生成模板，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。  
footer: MIT Licensed | Copyright © 2025 一亿拼图
---




# 安装vuepress

## 快速上手

::: tip 前提条件
VuePress 需要 Node.js (opens new window)>= 8.6
:::


本文会帮助你从头搭建一个简单的 VuePress 文档。如果你想在一个现有项目中使用 VuePress 管理文档，从步骤 3 开始。

## 创建并进入一个新目录

``` js
mkdir vuepress-starter && cd vuepress-starter
```


使用你喜欢的包管理器进行初始化

> `yarn init # npm init`

将 VuePress 安装为本地依赖

我们已经不再推荐全局安装 VuePress

``` js
yarn add -D vuepress # npm install -D vuepress
```

::: warning
注意

如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn (opens new window)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

## 创建你的第一篇文档

``` js
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

在 package.json 中添加一些 scripts(opens new window)

这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。
``` js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

## 运行

在本地启动服务器

``` js
yarn docs:dev # npm run docs:dev
```

VuePress 会在 http://localhost:8080 (opens new window)启动一个热重载的开发服务器。


## 生成静态文件

``` js
yarn docs:build # npm run docs:build
```



在 VuePress 中正确显示静态文件（如图片）需遵循以下步骤，确保开发预览时路径正确：

## ​1. 放置静态文件
将图片等静态资源存放在`.vuepress/public` 文件夹内（VuePress 默认识别该目录）：
也就是和config一个目录。

```
your-project/
├── docs/
│   ├── .vuepress/
│   │   └── config.js
│   │   └── public/
│   │     └── images/
          └── example.png  # 图片路径：/images/example.png
│   └── index.md
│   └── test.md


```
 
## ​2. 在 Markdown 或 Vue 组件中引用
​Markdown 文件​（如 docs/index.md）：

```
markdown
![示例图片](/images/example.png)  <!-- 直接引用 public/images 下的文件 -->
```

​路径规则：假设图片在 public/images/，则引用路径为 /images/文件名。

![示例图片](/images/example.png)  <!-- 直接引用 public/images 下的文件 -->


## 3. 配置 publicPath（可选）​
如果项目部署在子路径（如 /docs/），需在 vuepress/config.js 中设置 publicPath：

```
javascript
// .vuepress/config.js
module.exports = {
  publicPath: '/', // 默认值，无需修改
  // publicPath: '/docs/' // 如果public 部署在子路径则设置为 '/子路径/'
}
```


vuepress更多请查看：

https://v1.vuepress.vuejs.org/zh/guide/getting-started.html





# 配置 .vuepress 里的config.js



自动获取侧边栏插件已经写入 config.js

功能是 自动获取文件夹下 所有文件夹 以及子文件夹下的文件， 显示在侧边栏 就像书籍的目录一样


后面的侧边栏插件 无需安装



::: tip 注意

自动获取侧边栏插件已经写入 config.js

配置文件 config.js 放置于 docs/.vuepress 文件夹下 

```

const path = require('path')

const rootPath =path.dirname(__dirname)


//导入生成侧边栏的工具类
const { sideBarTool } = require(path.join(__dirname, './utils/index.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets','media', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']

//使用方法生生成侧边栏
// 侧边栏1
let sidebar = sideBarTool.genSideBarGroup(rootPath, unDirIncludes, SuffixIncludes, {})


let sidebar0 = sideBarTool.genSideBar(rootPath, unDirIncludes, SuffixIncludes, {})




//侧边栏tool

//const sidebarPlugin = require(path.join(__dirname, './utils/tool.js'))



//let sidebar_TOOL = sidebarPlugin.genSideBarGroup(rootPath)






// 侧边栏2



const shelljs = require('shelljs'); 
const fs = require('fs');

//忽略的文件夹
const IGNORE_DIR = ["image",'img',"images","imgs","media",'static',"assets",".vuepress"]
//遍历文件夹
function readDirToObjTreeTool(){
    //let foldPath = shelljs.pwd().stdout // 当前目录的绝对路径
	
	let foldPath = path.dirname(rootPath)
	
	console.log(foldPath)
	
	
    let objTree = []

    function recursion(foldPath, data) {
        let files = fs.readdirSync(foldPath)

        // 1.目录循环
        files.forEach(item => {
        	//是否是目录
            let isDir = fs.statSync(`${foldPath}/${item}`).isDirectory()

            // 判断逻辑：是文件，并且不是以 .开头的隐藏文件，并且不是 node_modules && build
            if (isDir && IGNORE_DIR.indexOf(item)===-1) {
                data.push({
                    name: item,
                    children: [],
                    path: `${foldPath}/${item}`,
                    isDir
                })
            } else if (!isDir && item !== '.DS_Store') {
                data.push({
                    name: item,
                    isDir
                });
            }

        })
        data.forEach(item => {
            if (item.isDir) {
                recursion(item.path, item.children)
            }
        })
    }
    recursion(path.join(foldPath,'docs'), objTree)
    return objTree
}
//创建侧边导航栏
function createSideBar(){
    const dirData = readDirToObjTreeTool();
    const sidebar = {};
    const recursion = (path, _dirData) => {
        const _data = [];
        _dirData.forEach(data => {
            const _path = `${path}/${data.name}`;
            if (data.isDir) {
                _data.push({
                    title: data.name,
                    collapsable: true,
                    children: recursion(_path, data.children)
                })
                return;
            } 
            const names = data.name.split(".");
            //不是MD文件不生成对应侧边栏
            if(names[names.length-1].toUpperCase() !== "MD"){
                return;
            }
            //README.MD文件侧边栏名称为【快速开始】
            if(data.name.toUpperCase() === "README.MD"){
                _data.unshift(["","快速开始"]);
                return;
            }
            _data.push([_path,data.name.slice(0, data.name.lastIndexOf("."))]);
        })
        return _data;
    }
    dirData.forEach(_dir => {
        const path = `/${_dir.name}`;
        if (_dir.isDir) {
            sidebar[`${path}/`] = [{
                title: _dir.name,
                collapsable: false,
                children:recursion(path, _dir.children)
            }]
        } else {
            sidebar[path.slice(0, path.lastIndexOf("."))] = [path]
        }
    });
    return sidebar;
}




console.log(sidebar);



let sidebar2 = createSideBar()


console.log(sidebar2);







module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',

  

  themeConfig: {
    logo: 'https://vuejs.press/images/hero.png',

	//侧边栏
	
	sidebar:sidebar2,
	displayAllHeaders: true,
	sidebarDepth:2,
	smoothScroll: true,	
	//顶部导航
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },

      // 支持嵌套,形成下拉式的导航菜单
      {
        text: '语言',
        ariaLabel: 'Language Menu',
        items: [
          { text: '中文', link: '/docs' },
          { text: '英文', link: '/docs2' }
        ]
	  }
 
    ],





    //sidebar: 'auto', // 自动根据目录生成侧边栏 系统自带 只能显示本文件的导航

    collapseSidebar: true, // 允许折叠侧边栏（桌面端）
	lastUpdated: '更新时间',


	
  }
  
  
  
}




```

后面的侧边栏插件 无需安装

:::



## Layouts and customization

Here are common configuration controlling layout of `@vuepress/theme-default`:

- [navbar][]
- [sidebar][]
- [列表][https://vuejs.press/reference/default-theme/]



Check [default theme docs][default-theme] for full reference.

You can [add extra style][style] with `.vuepress/styles/index.scss` file.


## Markdow语法大全


Markdown语法大全(超级版) <https://www.jianshu.com/p/ebe52d2d468f>

- 插入图像

```


![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif "图片Title")

格式: ![图片Alt](图片地址 "图片Title")

```


![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif "图片Title")



- 多级引用

```
> 请问 Markdwon 怎么用？ - 小白
>> 自己看教程！ - 愤青
>>> 教程在哪？ - 小白
```


> 请问 Markdwon 怎么用？ - 小白
>> 自己看教程！ - 愤青
>>> 教程在哪？ - 小白

- 字体 字号 颜色

转义字符、字体、字号、颜色



字体、字号、颜色

代码：

```
<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=12 face="黑体">黑体</font>
<font color=gray size=5>gray</font>
<font color=#00ffff size=3>null</font>
```


<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=12 face="黑体">黑体</font>
<font color=gray size=5>gray</font>
<font color=#00ffff size=3>null</font>



- 任务列表

- [ ] 任务一 未做任务 `- + 空格 + [ ]`
- [x] 任务二 已做任务 `- + 空格 + [x]`


- 斜体、粗体、删除线、下划线、背景高亮

```

*斜体*或_斜体_
**粗体**
***加粗斜体***
~~删除线~~
++下划线++
==背景高亮==


```

*斜体*或_斜体_
**粗体**
***加粗斜体***
~~删除线~~
++下划线++
==背景高亮==

- 注脚 


```
使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2]。

[^1]:Markdown是一种纯文本标记语言

[^2]:HyperText Markup Language 超文本标记语言
```


使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2]。

[^1]:Markdown是一种纯文本标记语言

[^2]:HyperText Markup Language 超文本标记语言




- 自动连接  <http://example.com/> 

```
自动连接  <http://example.com/> 
```


- 无序列表、有序列表、定义型列表


```
* 无序列表项 一
+ 无序列表项 二
- 无序列表项 三


1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三


```

* 无序列表项 一
+ 无序列表项 二
- 无序列表项 三


1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三




# GitHub 风格的表格


输入 


``` js
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

输出

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



# Emoji 表情


``` js
:tada: :100:
```


:tada: :100:





# 徽标 Badge <Badge text="beta" type="warning"/> <Badge text="默认主题"/>



``` js
export default {
  name: 'MyComponent',
  // ...
}
```




``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```


# 提示区块 警告


::: tip
这是一个提示
配置  .vuepress 文件夹下的 config.js文件。 设置了代码 可以自动读取文件夹  以及 子文件夹的文件 作为侧边栏。
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::





# 牛市逃顶/熊市抄底计划

- # 牛市逃顶/熊市抄底计划：

![img](/static/wps1.png) 




[default-theme]: https://vuejs.press/reference/default-theme/
[style]: https://vuejs.press/reference/default-theme/styles.html#style-file






• 大家都没有信心时，你应该相信希望，

• 大家都信心满满时，你应该怀疑风险
