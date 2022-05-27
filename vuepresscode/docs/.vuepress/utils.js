const fs = require("fs");
const path = require("path");

/**
 * 读取根目录下的子目录以及md文件组装成侧边栏
 *
 * @param rootPath 根路径
 * @return Object 返回获取到当前文件夹下的目录结构对象
 */
function getSidebars(rootPath) {
  let sidebar = {};
  // 遍历获取到的文件夹内容
  getDirFiles(rootPath).forEach(function (file, index, array) {
    // 获取相对路径
    let realpath = `${rootPath}/${file}`;
    // 判断是否为文件夹
    if (fs.lstatSync(realpath).isDirectory()) {
      // test2(realpath, value, []);
      let filesList = [];
      getSidebar(realpath, filesList);
      sidebar[`/${file}/`] = filesList;
    }
  });
  sidebar["/"] = [];
  return sidebar;
}

/**
 * 过滤不在数组中的值
 *
 * @param arr 元数据数组
 * @param retentionArr 需要保留的值数组
 * @return Array 去掉值后的新数组
 */
function notInArrayKV(arr, retentionArr) {
  let newArr = [];
  arr.forEach(function (value, index, array) {
    // 判断文件名以什么开头、是否在指定数组中存在
    if (!value.startsWith(".") && !retentionArr.includes(value)) {
      newArr.push(value);
    }
  });
  return newArr;
}

/**
 * 查找文件夹下的文件并忽略指定文件
 *
 * @param dirname 文件夹路径
 * @return Array 返回过滤后的数组
 */
function getDirFiles(dirname) {
  // 读取文件夹
  // let fileNames = fs.readdirSync(path.resolve(__dirname, dirname)).map(filename => filename);
  let files = fs.readdirSync(dirname).sort();
  let ignores = [
    ".git",
    ".gitignore",
    "docs",
    "node_modules",
    "yarn.lock",
    "package.json",
    "package-lock.json",
  ];

  return notInArrayKV(files, ignores);
}

/**
 * 根据系统文件分割符自动切割目录获取最后一个目录
 *
 * @return
 */
String.prototype.cuttingPathWith = function () {
  let strArray = this.split(path.sep);
  return strArray[strArray.length - 1];
};

/**
 * 组装侧边栏
 *
 * @param dirPath 路径
 * @param filesList 存放所有文件夹的数组
 * @param targetObj 存放子文件夹的对象
 * @return
 */
function getSidebar(dirPath, filesList, targetObj = {}) {
  //需要用到同步读取
  getDirFiles(dirPath).forEach(function (file) {
    let childrenPath = path.join(dirPath, file);
    console.log(childrenPath);
    if (fs.statSync(childrenPath).isDirectory()) {
      let item;
      if (targetObj["children"]) {
        item = { title: file, children: [], parent: dirPath.cuttingPathWith() };
        // 把更深层的子文件夹装入上级子文件夹数组中
        targetObj["children"].push(item);
      } else {
        item = { title: file, children: [] };
        // 装入构造同级文件夹下的子文件夹对象
        filesList.push(item);
      }
      getSidebar(childrenPath, filesList, item);
    } else if (file.endsWith(".md")) {
      // 必须是md文件
      let fileName = file.slice(0, -3);
      if ("README" == fileName) {
        fileName = "";
      }
      if (targetObj["children"]) {
        fileName = `${targetObj["title"]}/${fileName}`;
        if (isEmpty(targetObj["parent"])) {
          fileName = `${targetObj["parent"]}/${fileName}`;
          delete targetObj["parent"];
        }
        // 把文件装入更深层子文件夹的数组中
        targetObj["children"].push(fileName);
      } else {
        // 装入同级文件夹下的文件
        filesList.push(fileName);
      }
    }
  });
}

module.exports = {
  getSidebars,
};
