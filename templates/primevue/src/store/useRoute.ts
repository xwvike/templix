import { defineStore } from 'pinia'
import { ref } from 'vue'
import { preAdd_id, menu2Route, findMenu } from '../utils/menuTools.ts'
import { menus as localMenus } from '../router/menu.ts'
import router, { staticRoutes } from '../router'
import {asyncRouterHandle} from '../utils/asyncRouter.ts'

export const useRouteStore = defineStore('route', () => {
  const routes = ref<any>([])
  const active = ref<any>({})
  const history = ref<any>([])
  const menus = ref<any>([])
  const historyIgnore = ref<any>([])
  async function initRoutes() {
    //获取动态路由
    const dynamicRoutes = [{
      path: '/',
      redirect: '/index',
      component: 'layout/MainLayout.vue',
      name: 'root',
      children: [...menu2Route(preAdd_id(localMenus))],
    }]
    asyncRouterHandle(dynamicRoutes)
    menus.value = localMenus
    routes.value = dynamicRoutes
    historyIgnore.value = [...staticRoutes]
  }
  function toggleActive(data:any,type:string) {
    let _id;
    if (type === 'menu') {
      _id = data._id
    }else if (type === 'route') {
      _id = data.meta._id
    }
    const menu = findMenu(_id, menus.value)
    active.value = menu
    _historyProcess(menu)
    const _menus = menus.value
    for (let i = 0; i < _menus.length; i++) {
      if (_menus[i]._id === _id) {
        _menus[i]['active'] = true
      } else {
        if (_menus[i].children) {
          let expanded = false
          for (let j = 0; j < _menus[i].children.length; j++) {
            if (_menus[i].children[j]._id === _id) {
              _menus[i].children[j]['active'] = true
              expanded = true
            } else {
              _menus[i].children[j]['active'] = false
            }
          }
          _menus[i]['active'] = expanded
        } else {
          _menus[i]['active'] = false
        }
      }
    }
    menus.value = _menus
  }
  function _historyProcess(menu: any) {
    if (!menu)return
    if (menu?.type==='index') return
    let list = [...history.value]
    let found = false
    if(historyIgnore.value.findIndex(item=>item.name===menu.name)>=0) return
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === menu._id) {
        found = true
        break
      }
    }
    if (!found) list.push(menu)
    history.value = list
  }
  async function deleteHistory(menu: any) {
    let list = [...history.value]
    let index = list.findIndex((item) => item._id === menu._id)
    if (menu._id === active.value._id) {
      if (list.length > 1) {
        if (index === list.length - 1) {
          await router.push({name:list[index - 1].name})
        } else {
          await router.push({name:list[index + 1].name})
        }
      } else {
        await router.push('/')
      }
    }
    history.value = list.filter((item) => item._id !== menu._id)
  }

  return { routes, menus, active, history, initRoutes, toggleActive, deleteHistory }
})
