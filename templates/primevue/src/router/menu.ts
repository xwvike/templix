export interface menu {
  name: string
  icon: string
  label: string
  sort: number
  showInMenu: boolean
  type: string
  children?: menu[]
}

export const menus:menu[] = [
  {
    label: '首页',
    name: 'index',
    icon: 'pi pi-fw pi-home',
    showInMenu: true,
    type: 'menu',
    sort: 0
  },
  {
    label: '分析',
    name: 'analytics',
    icon: 'pi pi-fw pi-chart-line',
    showInMenu: true,
    type: 'index',
    sort: 1,
    children:[
      {
        label: '概览',
        name: 'overview',
        showInMenu: true,
        type: 'menu'
      },
      {
        label: '报告',
        name: 'reports',
        showInMenu: true,
        type: 'menu',
      }
    ]
  },
  {
    label: '模版',
    name: 'template',
    icon: 'pi pi-fw pi-table',
    showInMenu: true,
    type: 'index',
    sort: 2,
    children:[
      {
        label: '表格',
        name: 'table',
        showInMenu: true,
        type: 'menu',
      },
      {
        label: 'crud',
        name: 'crud',
        showInMenu: true,
        type: 'menu',
      }
    ]
  },
  {
    label: '单个菜单',
    name: 'singleMenu',
    sort: 0,
    icon: 'pi pi-fw pi-table',
    showInMenu: true,
    type: 'menu'
  }
]