export const preProcess = (list: any[]) => {
  list.forEach((item) => {
    item['meta'] = item.meta || {}
    item['meta']['_id'] = Math.random().toString(32).slice(2) + new Date().getTime()
    if (item.children) {
      preProcess(item.children)
    }
  })
  return list
}