import { createRouter, createWebHashHistory } from 'vue-router'
import { preProcess } from '../utils/preProcess.ts'
import { useRouteStore } from '../store/useRoute.ts'

const staticRoutes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    children: undefined,
    meta: { showInMenu: false },
  },
]
const fixedRouting = [
  {
    path: '/help',
    redirect: '/help/index',
    component: () => import('../layout/MainLayout.vue'),
    children: [{ path: '/help/index', component: () => import('../views/Help.vue') }],
    meta: { title: 'Help', icon: 'pi pi-fw pi-question-circle', showInMenu: true, collapsible: false },
  },
  {
    path: '/settings',
    redirect: '/settings/index',
    component: () => import('../layout/MainLayout.vue'),
    children: [{ path: '/settings/index', component: () => import('../views/Settings.vue') }],
    meta: { title: 'Settings', icon: 'pi pi-fw pi-cog', showInMenu: true, collapsible: false },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: preProcess([...staticRoutes, ...fixedRouting]),
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

export { initRouter, fixedRouting, staticRoutes }
export default router
