const header = [
  // 注入到当前页面的 HTML <head> 中的标签
  ["link", { rel: "manifest", href: "/manifest.json" }],
  ["link", { rel: "icon", href: `/logo.png` }],
  ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
];

module.exports = header;
