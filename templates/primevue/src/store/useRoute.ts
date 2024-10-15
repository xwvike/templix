import { defineStore } from 'pinia'
import { ref } from 'vue'
import { preProcess } from '../utils/preProcess.ts'
import { routes as staticRoutes } from '../router/routes.ts'

export const useRouteStore = defineStore('route', () => {
  const routes = ref<any>([])
  const active = ref('')
  function initRoutes() {
    routes.value = preProcess(staticRoutes)
  }
  function toggleActive(id: string) {
    active.value = id
    const _routes = routes.value
    for (let i = 0; i < _routes.length; i++) {
      if (_routes[i].meta._id === id) {
        _routes[i].meta['active'] = true
      } else {
        if (_routes[i].children) {
          for (let j = 0; j < _routes[i].children.length; j++) {
            if (_routes[i].children[j].meta._id === id) {
              _routes[i].children[j].meta['active'] = true
              _routes[i].meta['active'] = true
            } else {
              _routes[i].children[j].meta['active'] = false
              _routes[i].meta['active'] = false
            }
          }
        }else {
          _routes[i].meta['active'] = false
        }
      }
    }
  }

  return { routes, active, initRoutes, toggleActive }
})
