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



vuepress更多请查看：

https://v1.vuepress.vuejs.org/zh/guide/getting-started.html





# 配置 .vuepress 里的config.js



自动获取侧边栏插件已经写入 config.js



后面的侧边栏插件 无需安装



::: tip 注意

自动获取侧边栏插件已经写入 config.js



后面的侧边栏插件 无需安装

:::



# 安装则边栏插件1


``` js
npm i vuepress-plugin-auto-sidebar -D
```



这是为 vuepress 自动生成侧边栏的插件。

如果你只是写一个简单介绍页，那没必要使用它，但如果你希望用 vuepress 记录很多的东西，例如：飞跃高山与大洋的鱼的笔记 (opens new window)，那你可以试一试这个插件。

# 安装

``` js
npm i vuepress-plugin-auto-sidebar -D
```

# 使用
注意，请勿将 plugins 放在 themeConfig 中，如何使用插件 (opens new window)。

``` js
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {
      // options
    }]
  ]
}
```
更多的插件选项。

## 1. 简单的导航栏
我们扩展了 vuepress cli 来帮助你快速生成简单的导航栏，如何使用它：

``` js
vuepress nav docs
```



## 侧边栏插件选项



## 概览

该插件提供了以下可选项，并列出了默认值：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        mode: "asc",
        readmeFirst: true,
        readmeFirstForce: false
      },
      title: {
        mode: "titlecase",
        map: {}
      },
      sidebarDepth: 1,
      collapse: {
        open: false,
        collapseList: [],
        uncollapseList: []
      },
      ignore: [],
      removeEmptyGroup: false,
      git: {
        trackStatus: 'all'
      }
    }
  }
}
```

## [#](#sort-排序)sort（排序）

### [#](#_1-内置的规则)1. 内置的规则

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        // 更多选项: 
        // `asc`、`desc`、`created_time_asc`、`created_time_desc`
        mode: "asc"
      }
    }
  }
}
```

在使用 `created_time_asc` 和 `created_time_desc` 必须使用 [git (opens new window)](https://git-scm.com/)跟踪文件。

### [#](#_2-自定义规则)2. 自定义规则

当内置的规则不满足你的需求时，你可以自定义排序规则：

```js
// 示例：根据文件名的最后一个字符进行排序
// 假设文件有 `filez-1`、`filed-3` 和 `filea-1`

const sortFn = (a, b) => {
  const lastA = a.filename.split("-")[1]
  const lastB = b.filename.split("-")[1]
  
  return lastA > lastB ? 1 : -1
}

module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      sort: {
        mode: 'custom',
        fn: sortFn
      },
    }
  },
}
```

如果想要根据文件的更多属性进行排序，你可以查看 [vuepress-types (opens new window)](https://github.com/vuepress/vuepress-community/blob/main/packages/vuepress-types/types/page.d.ts#L14)。

### [#](#_3-更精准的排序)3. 更精准的排序

在以上的规则下，你还想指定其他文件在当前文件之前可以在 markdown 文件中添加 [autoPrev 或 autoNext](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/markdown-file-config.html#autoprev-autonext)。

### [#](#_4-数值排序-v2-3-0)4. 数值排序（v2.3.0）

比**规则排序**更友好，比**精准排序**更简单，在 markdown 文件中添加 [autoSort](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/markdown-file-config.html#autosort)。

## [#](#title-标题)title（标题）

我们经常会使用短横线命名文件，而作为标题它就显得有些糟糕了。

### [#](#_1-模式)1. 模式

使用方式：

```js
module.exports = {
 plugins: {
    "vuepress-plugin-auto-sidebar": {
      title: {
        // 更多选项: 
        // `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
        mode: "titlecase"
      }
    }
  }
}
```

假设 docs 目录如下：

```bash
docs
├── exampleMenu1
│   ├── exampleSubMenu1-a
│   │   └── file1.md
│   ├── exampleSubMenu1-b
│   │   └── file1.md
│   └── exampleSubMenu1-c
│       ├── file1.md
│       ├── file2.md
│       └── file3.md
├── exampleMenu2
│   ├── file1.md
│   └── README.md
```

And you choose the `titlecase`,you will get:

```text
exampleSubMenu1-a => Example Sub Menu1 A
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => Example Sub Menu1 C
exampleMenu2 => Example Menu2
```

### [#](#_2-映射)2. 映射

指定文件夹映射优先级更高，即会覆盖 `mode`。

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      title: {
        mode: "titlecase",
        map: {
          "/exampleMenu1/exampleSubMenu1-a/": "🎉 Hello Vuepress 🎉",
          "/exampleMenu1/exampleSubMenu1-c/": "🎉 Auto Sidebar 🎉"
        }
      }
    }
  ],
}
```

结果：

```text
exampleSubMenu1-a => 🎉 Hello Vuepress 🎉
exampleSubMenu1-b => Example Sub Menu1 B
exampleSubMenu1-c => 🎉 Auto Sidebar 🎉
exampleMenu2 => Example Menu2
```

## [#](#sidebardepth-标题深度)sidebarDepth（标题深度）

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      sidebarDepth: 1,
    }
  ]
}
```

如果你想要修改指定文件的标题显示，可以修改文件内 [sidebarDepth](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/markdown-file-config.html#sidebardepth)。

## [#](#collapse-折叠)collapse（折叠）

当有大量的 markdown 文件时，侧边栏也会随之臃肿，将它们折叠起来不失为一个好的选择：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: true
      }
    }
  },
}
```

但更多的场景是仅仅某一个分类下笔记众多，可针对这一部分进行折叠：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        collapseList: [
          "/demo/large-files/"
        ]
      }
    }
  }
}
```

而 `uncollapseList` 的使用场景则与之相反：

```js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      collapse: {
        open: true,
        uncollapseList: [
          "/demo/few-files/"
        ]
      }
    }
  },
}
```

## [#](#ignore-忽略)ignore（忽略）

如果你有部分文件想要从侧边栏中隐藏，删掉文件又不肯能：

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      ignore: [
        // 例子：
        // 忽略 `/menu3/menu3-3/` 目录下以 `ignore-` 开头的文件
        {
          menu: "/menu3/menu3-3/",
          regex: "ignore-*"
        }
      ]
    }
  ]
}
```

如果你想隐藏单个文件，那么可在文件中添加 [autoIgnore](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/markdown-file-config.html#autoignore)。

## [#](#removeemptygroup-隐藏空分组)removeEmptyGroup（隐藏空分组）

当你将文件夹中所有文件都配置了 [autoGroup](https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/markdown-file-config.html#多个分组) 时，会导致默认分组为空，想隐藏它时可使用：

```js
module.exports = {
  plugins: [
    "vuepress-plugin-auto-sidebar": {
      removeEmptyGroup: true
    }
  ]
}
```

## [#](#nav-导航栏)nav（导航栏）

为了简化你第一次搬迁博客、笔记的成本，它仅仅提供了一个简单的生成导航栏的方式。

1. 添加脚本到 `package.json` 中

   ```json
   {
     "scripts": {
       "docs:nav": "vuepress nav docs"
     }
   }
   ```

2. 执行命令

   ```bash
   npm run docs:nav
   ```

   它将会在 `.vuepress` 文件夹下生成 `nav.js` 文件。

3. 引入生成的 nav 文件

   ```js
   const nav = require("./nav.js");
   
   module.exports = {
     plugins: {
       "vuepress-plugin-auto-sidebar": {}
     },
     themeConfig: {
       nav
     }
   }
   ```

## 

#%E6%A6%82%E8%A7%88



侧边栏插件更多请查看

https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/





# 侧边栏插件2





npm i vuepress-bar





https://juejin.cn/post/6844903935027707918



