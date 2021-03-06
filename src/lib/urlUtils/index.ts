/**
 * url的操作，浏览器相关
 */

/**
 * 获取url地址的参数信转化成键值对的对象格式
 * @param { string } url 解析的url地址
 * @example
 * UrlUtils.parseUrl('https://www.baidu.com/baidu?isource=infinity&iname=baidu&itype=web&tn=02003390_42_hao_pg&ie=utf-8&wd=hello')
 */
export function parseUrl (url: string = window.location.search): any {
  const newUrl: string = url.slice(url.indexOf('?'))
  const sp: any = new URLSearchParams(newUrl)
  const obj = {}
  for (let [k, v] of sp.entries()) {
    obj[k] = v
  }
  return obj
}

/**
 * @description object对象转化成get请求的字符串形式
 * @param { Object } obj  需要操作的对象
 * @return { String } 返回一个字符串 a=1&b=2
 * @example
 * // 'a=1&b=2'
 * UrlUtils.stringifyUrl({a: 1, b: 2})
 */
export function stringifyUrl (obj: object): string {
  const arr = Object.entries(obj)
  return arr.map(item => {
    let [k, v] = [...item]
    return `${k}=${encodeURIComponent(v)}`
  }).join('&')
}

/**
 * @description 移除url的某一个参数
 * @since 3.0.1
 * @param { Array } paramNames 参数名称的数组
 * @param { URL } url url地址
 * @return { String } 返回一个新地址
 * @example
 * UrlUtils.deleteUrlParam(['code', 'name'], 'http://localhost:2008/#a?a=22&b=2&code=3')
 * // 'http://localhost:2008/#a?a=22&b=2'
 */
export function deleteUrlParam (paramNames: string[], url: string = location.href) {
  const newSearch: string = url.split('?')[1]
  if (!newSearch) return url

  const hostAndPath: string = url.split('?')[0]
  const urlSearch = new URLSearchParams(newSearch)
  paramNames.forEach((param: string) => {
    urlSearch.delete(param)
  })
  return urlSearch.toString() ?  `${hostAndPath}?${urlSearch.toString()}` : hostAndPath
}
