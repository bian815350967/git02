const plugin = [
  ["vuepress-plugin-code-copy", true],
  "@vuepress/plugin-back-to-top",
  "vuepress-plugin-smooth-scroll",
  [
    "vuepress-plugin-medium-zoom",
    {
      selector: "img",
      options: {
        background: "var(--bodyBgColor)",
      },
    },
  ],
];

module.exports = plugin;
