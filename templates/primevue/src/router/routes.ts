interface route {
  path: string
  redirect?: string
  component: any
  meta?: {
    title: string
    showInMenu: boolean
    icon?: string
    collapsible?: boolean
  }
  children?: route[]
}

export const routes: route[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('../layout/MainLayout.vue'),
    children: [{ path: '/dashboard', component: () => import('../views/Dashboard.vue') }],
    meta: { title: 'Dashboard', icon: 'pi pi-fw pi-home', showInMenu: true, collapsible: false },
  },
  {
    path: '/analytics',
    redirect: '/analytics/overview',
    component: () => import('../layout/MainLayout.vue'),
    meta: {
      title: 'Analytics',
      icon: 'pi pi-fw pi-chart-line',
      showInMenu: true,
      collapsible: true,
    },
    children: [
      {
        path: '/analytics/overview',
        component: () => import('../views/analytics/Overview.vue'),
        meta: { title: 'Overview', showInMenu: true },
      },
      {
        path: '/analytics/reports',
        component: () => import('../views/analytics/Reports.vue'),
        meta: { title: 'Reports', showInMenu: true },
      },
    ],
  },
  {
    path: '/data',
    redirect: '/data/datatable',
    component: () => import('../layout/MainLayout.vue'),
    meta: {
      title: 'Data',
      icon: 'pi pi-fw pi-table',
      showInMenu: true,
      collapsible: true,
    },
    children: [
      {
        path: '/data/datatable',
        component: () => import('../views/data/Table.vue'),
        meta: { title: 'Table', showInMenu: true },
      },
    ],
  },
]
