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

