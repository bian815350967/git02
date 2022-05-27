const themeOther = require("./config/theme");
const plugins = require("./config/plugin");
const head = require("./config/headConfig");

const navEN = require("./config/navConfig").navEN;
const navCN = require("./config/navConfig").navCN;

const sidebarEn = require("./config/themeSidebar").sidebarEn;
const sidebarCN = require("./config/themeSidebar").sidebarCN;

// 设置输出目录，打包显示，dev注释
let base = "";
if (process.env.NODE_ENV === "production") {
  base = "./";
}
module.exports = {
  title: "VuePress demo",
  description: "哈哈哈哈",
  plugins,
  base: base, // 设置输出目录，打包显示，dev注释

  // dest: "./dist", // 设置输出目录
  watch: {
    $page(newPage, oldPage) {
      if (newPage.key !== oldPage.key) {
        requestAnimationFrame(() => {
          if (this.$route.hash) {
            const element = document.getElementById(this.$route.hash.slice(1));

            if (element && element.scrollIntoView) {
              element.scrollIntoView();
            }
          }
        });
      }
    },
  },
  locales: {
    "/en/": {
      lang: "en-US",
      title: "VuePress",
      description: "Vue-powered Static Site Generator",
    },
    "/": {
      lang: "zh-CN",
      title: "VuePress",
      description: "Vue 驱动的静态网站生成器",
    },
  },
  head, // 注入到当前页面的 HTML <head> 中的标签
  // serviceWorker: true, // 是否开启 PWA
  themeConfig: {
    // nav,
    repoLabel: "GitHub", // 导航栏上的文本
    editLinks: true,
    locales: {
      "/en/": {
        label: "English",
        selectText: "Languages",
        ariaLabel: "Select language",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: navEN,
        sidebar: sidebarEn,
      },
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        ariaLabel: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: navCN,
        sidebar: sidebarCN,
      },
    },
  },
};
