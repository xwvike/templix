import type { menu } from '../router/menu.ts'
import { defineAsyncComponent } from 'vue'

export const preAdd_id = (list: any[]) => {
  list.forEach((item) => {
    item['_id'] = Math.random().toString(32).slice(2) + new Date().getTime()
    if (item.children) {
      preAdd_id(item.children)
    }
  })
  return list
}
export function capitalizeFirstLetter(str) {
  if (!str || typeof str !== 'string') {
    console.error('capitalizeFirstLetter: 参数不是字符串');
    return str;
  }
  if (!/[a-zA-Z]/.test(str[0])) {
    console.error('capitalizeFirstLetter: 第一个字符不是字母');
    return str;
  }
  return str.slice(0, 0) + str[0].toUpperCase() + str.slice(0 + 1);
}
export const findMenu = (_id:string, menus:menu[]) => {
  let result = null
  const _ = (menus) => {
    menus.forEach((item) => {
      if (item._id === _id) {
        result = item
      } else if (item.children) {
        _(item.children)
      }
    })
  }
  _(menus)
  return result
}
export const menu2Route = (menus: menu[]) => {
  const routes: any[] = []
  const _ = (menus, preName = '') => {
    menus.forEach((item) => {
      if (item.type === 'menu') {
        let path = `/${item.name}`
        let componentPath = `views/${capitalizeFirstLetter(item.name)}.vue`
        if (preName) {
          path = `/${preName}${path}`
          componentPath = `views/${preName}/${capitalizeFirstLetter(item.name)}.vue`
        }
        const route = {
          path: path,
          name: item.name,
          component: `${componentPath}`,
          meta: {
            ...item,
            _id: item._id
          },
        }
        routes.push(route)
      } else if (item.type === 'index') {
        const children = item.children || []
        _(children, item.name)
      }
    })
  }
  _(menus)
  return routes
}
