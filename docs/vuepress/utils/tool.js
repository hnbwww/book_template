const path = require('path');
const fs = require('fs');

// 配置参数
const IGNORE_DIRS = ["image", "img", "images", "imgs", "media", "assets", ".vuepress", "node_modules"];

// 生成目录树结构（支持多级目录）
function generateDirTree(rootPath) {
  const tree = [];

  function traverse(dirPath, parent) {
    const entries = fs.readdirSync(dirPath);
    
    entries.forEach(entry => {
      const fullPath = path.join(dirPath, entry);
      const isDir = fs.statSync(fullPath).isDirectory();
      const relativePath = path.relative(rootPath, fullPath);

      // 忽略指定目录和文件
      if (isDir && IGNORE_DIRS.includes(entry)) return;
      if (!isDir && entry.startsWith('.')) return;

      tree.push({
        name: isDir ? entry : path.parse(entry).name,
        isDir,
        fullPath,
        relativePath,
        children: [],
        parent
      });

      if (isDir) {
        traverse(fullPath, tree[tree.length - 1]);
      }
    });
  }

  traverse(rootPath);
  return tree.filter(item => 
    !IGNORE_DIRS.includes(item.name) && 
    !(item.isDir && item.children.length === 0)
  );
}

// 生成侧边栏配置（支持动态标题和多级目录）
function generateSidebarConfig(dirTree, rootPath) {
  const sidebarItems = [];

  function processNode(node) {
    const title = node.isDir 
      ? node.name 
      : getDocumentTitle(node);

    // 确保路径是字符串类型
    const basePath = node.isDir 
      ? path.relative(rootPath, node.fullPath) 
      : node.fullPath;

    const item = {
      title,
      collapsable: node.isDir && node.children.length > 0,
      children: [],
      path: typeof basePath === 'string' ? basePath : ''
    };

    if (node.isDir) {
      node.children.forEach(child => processNode(child, rootPath));
      item.children = item.children.filter(n => n.title);
    }

    sidebarItems.push(item);
  }

  dirTree.forEach(node => processNode(node, rootPath));

  // 添加类型防御性检查
  const validItems = sidebarItems.filter(item => 
    typeof item.path === 'string' && item.path.trim() !== ''
  );

  // 使用 path.compare 进行排序
  const sortedItems = validItems.sort((a, b) => {
    if (typeof a.path !== 'string' || typeof b.path !== 'string') {
      console.error('路径排序失败:', a.path, b.path);
      return 0;
    }
    return path.compare(a.path, b.path);
  });

  // 构建层级关系
  return sortedItems.reduce((acc, cur) => {
    const parent = acc.find(a => 
      path.dirname(cur.path) === a.path && a.isDir
    );

    if (parent) {
      parent.children.push(cur);
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}




// 文档标题处理（增强版）
function getDocumentTitle(node) {
  if (!node.isDir) {
    const basename = path.parse(node.fullPath).name;
    if (basename.toUpperCase() === 'README.MD') return '📖 快速开始';
    if (path.extname(basename) === '.md') {
      return basename.replace('.md', '');
    }
  }
  return node.name;
}

// 导出配置（支持自定义根目录）
module.exports = {
  genSideBarGroup: (options = {}) => {
    const rootPath = options.rootPath || process.cwd();
    
    if (!fs.existsSync(rootPath)) {
      console.error(`目录不存在: ${rootPath}`);
      return [];
    }

    try {
      const dirTree = generateDirTree(rootPath);
      return generateSidebarConfig(dirTree);
    } catch (error) {
      console.error('生成侧边栏失败:', error);
      return [];
    }
  }
};