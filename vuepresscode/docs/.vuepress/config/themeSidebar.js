const sidebarEn = {
  "/en/guide/": [
    {
      text: "guide",
      title: "guide",
      collapsable: false,
      sidebarDepth: 1,
      children: ["", "/en/guide/add", "/en/guide/function"],
    },
  ],
  "/en/emoji/": [
    {
      text: "emoji",
      title: "emoji",
      collapsable: false,
      sidebarDepth: 1,
      children: ["", "/en/emoji/em"],
    },
  ],
};

const sidebarCN = {
  "/guide/": [
    {
      text: "配置",
      title: "配置",
      collapsable: false,
      sidebarDepth: 1,
      children: ["", "/guide/add", "/guide/function"],
    },
  ],
  "/emoji/": [
    {
      text: "emoji表情",
      title: "emoji表情",
      collapsable: false,
      sidebarDepth: 1,
      children: ["", "/emoji/em"],
    },
  ],
};

module.exports = { sidebarEn, sidebarCN };
