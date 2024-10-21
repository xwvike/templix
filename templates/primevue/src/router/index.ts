import { createRouter, createWebHashHistory } from 'vue-router'
import { useRouteStore } from '../store/useRoute.ts'

const staticRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
})
const loadDynamicRoutes = () => {
  const routeStore = useRouteStore()

  routeStore.routes.forEach((route) => {
    router.addRoute(route)
  })
}

const initRouter = async () => {
  const routeStore = useRouteStore()
  await routeStore.initRoutes()
  loadDynamicRoutes()
}

router.beforeEach(async (to, from) => {
  const { useAuthStore } = await import('../store/useAuth')
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return '/login'
  }
})

export { initRouter, staticRoutes }
export default router
