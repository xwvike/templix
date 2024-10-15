import { createRouter, createWebHashHistory } from 'vue-router'
import {preProcess} from '../utils/preProcess.ts'
import {useRouteStore} from '../store/useRoute.ts'

const staticRoutes  = [
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    children: undefined,
    meta: { showInMenu: false },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes:preProcess(staticRoutes ),
})
const loadDynamicRoutes = () => {
  const routeStore = useRouteStore()
  console.log(routeStore)

  routeStore.routes.forEach((route) => {
    router.addRoute(route)
  })
}

const initRouter = async () => {
  const routeStore = useRouteStore()
  routeStore.initRoutes()
  loadDynamicRoutes()
}

router.beforeEach(async (to, from) => {
  const { useAuthStore } = await import('../store/useAuth')
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return '/login'
  }
})

export { initRouter }
export default router
