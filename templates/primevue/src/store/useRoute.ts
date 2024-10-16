import { defineStore } from 'pinia'
import { ref } from 'vue'
import { preProcess } from '../utils/preProcess.ts'
import { routes as routesList } from '../router/routes.ts'
import router, { staticRoutes, fixedRouting } from '../router'

export const useRouteStore = defineStore('route', () => {
  const routes = ref<any>([])
  const active = ref<any>({})
  const history = ref<any>([])
  const historyIgnore = ref<any>([])
  function initRoutes() {
    routes.value = preProcess(routesList)
    historyIgnore.value = [...staticRoutes, ...fixedRouting]
  }
  function toggleActive(route: any) {
    console.log(route.path)
    active.value = route
    _historyProcess(route)
    const id = route.meta._id
    const _routes = routes.value
    for (let i = 0; i < _routes.length; i++) {
      if (_routes[i].meta._id === id) {
        _routes[i].meta['active'] = true
      } else {
        if (_routes[i].children) {
          let expanded = false
          for (let j = 0; j < _routes[i].children.length; j++) {
            if (_routes[i].children[j].meta._id === id) {
              _routes[i].children[j].meta['active'] = true
              expanded = true
            } else {
              _routes[i].children[j].meta['active'] = false
            }
          }
          _routes[i].meta['active'] = expanded
        } else {
          _routes[i].meta['active'] = false
        }
      }
    }
    routes.value = _routes
  }
  function _historyProcess(route: any) {
    let list = [...history.value]
    const raw = { ...route }
    let found = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].meta._id === raw.meta._id) {
        found = true
        break
      }
    }
    if (!found && historyIgnore.value.findIndex((item) => item.path === raw.path) < 0) list.push(raw)
    history.value = list
  }
  async function deleteHistory(route: any) {
    let list = [...history.value]
    let index = list.findIndex((item) => item.meta._id === route.meta._id)
    if (route.meta._id === active.value.meta._id) {
      if (list.length > 1) {
        if (index === list.length - 1) {
          await router.push(list[index - 1].path)
        } else {
          await router.push(list[index + 1].path)
        }
      } else {
        await router.push('/')
      }
    }
    history.value = list.filter((item) => item.meta._id !== route.meta._id)
  }

  return { routes, active, history, initRoutes, toggleActive, deleteHistory }
})
