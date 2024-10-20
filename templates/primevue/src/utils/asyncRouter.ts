const viewModules = import.meta.glob('../views/**/*.vue')
const layoutModules = import.meta.glob('../layout/**/*.vue')
const modules = { ...viewModules, ...layoutModules }

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach(item => {
    if (item.component) {
      item.component = dynamicImport(modules, item.component)
    } else {
      delete item['component']
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

function dynamicImport(
  dynamicViewsModules,
  component
) {

  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../', '')
    return k === component
  })
  const matchKey = matchKeys[0]
  return dynamicViewsModules[matchKey]
}
