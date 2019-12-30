/**
 *数组排序
 * @param arr
 * @param property
 * @param rev [true：升序， false: 降序]
 */
export function sortArrByProperty (arr, property, rev) {
  !rev ? rev = -1 : rev = 1
  return arr.sort((a, b) => {
    let value1 = a[property]
    let value2 = b[property]
    return rev * (value1 - value2)
  })
}

export function getYMD (date, tag) {
  return date.split('tag')[0]
}

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 获取地址对应查询参数值
 * @param {String} key - Query key
 * @return {String} Value
 */
export const getUrlQueryValue = function (key) {
  let after = window.location.search
  if (location.href.indexOf('?') === -1) return null // 如果url中没有传参直接返回空

  // key存在先通过search取值如果取不到就通过hash来取
  after = after.substr(1) || window.location.hash.split('?')[1]
  if (after) {
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let r = after.match(reg)
    if (r) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
}

export const resetDocumentTitle = function (title) {
  document.title = title
}

let loader = {}
export const showIndicator = function () {
  if (loader.container) {
    return
  }
  // hideIndicator()
  const container = document.createElement('div')
  const el = document.createElement('div')
  const _i = []
  for (let i = 0; i < 4; i++) {
    _i.push(document.createElement('i'))
  }

  container.className = 'app-indicator-container'
  el.className = 'app-indicator-box'
  container.style.position = 'fixed'
  container.style.top = 0
  container.style.left = 0
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.zIndex = '99998'
  container.style.background = 'rgba(255, 255, 255, 0)'
  document.body.appendChild(container)
  _i.forEach(item => {
    el.appendChild(item)
  })
  container.appendChild(el)
  loader.container = container
}

export const hideIndicator = function () {
  // loader && loader.close();
  if (loader.container) {
    document.body.removeChild(loader.container)
    loader = {}
  }
}

// 解析url参数
export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = decodeURI(location.search.substr(1)).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}
