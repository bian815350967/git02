---
title: vuepress 打包
date: 2022-01-04
---

# vuepress 打包 en

## 打包背景 en

- build 完就直接用本地浏览器访问，结果出现黑块

## 解决

- 打开 `.vuepress/config.js` 文件，把 `base` 的值改成 `./`，为了方便调试，最好这样写

- 把 `mode: 'history'`, 注释掉就行了（让它默认为 `hash` 模式）。
- 然后打开项目下的 `node_modules\@vuepress\core\lib\client` 下的 `app.js` 文件，找到下方这个片段：

```javascript
const router = new Router({
  base: routerBase,
  mode: "history", // 注释mode
  fallback: false,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      if (Vue.$vuepress.$get("disableScrollBehavior")) {
        return false;
      }
      return {
        selector: decodeURIComponent(to.hash),
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
```
