import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-2f7343e2","/emoji/em.html",{"title":"em"},["/emoji/em","/emoji/em.md"]],
  ["v-7c2a9ce2","/emoji/",{"title":"emoji表情"},["/emoji/index.html","/emoji/README.md"]],
  ["v-8e00dc78","/guide/add.html",{"title":"vuepress 打包"},["/guide/add","/guide/add.md"]],
  ["v-477f1a95","/guide/function.html",{"title":"方法"},["/guide/function","/guide/function.md"]],
  ["v-fffb8e28","/guide/",{"title":"首页"},["/guide/index.html","/guide/README.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
