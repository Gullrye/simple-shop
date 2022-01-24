export function getRealImg(url: string) {
  const regexp = new RegExp('/goods-img.*', 'g')
  if (regexp.test(url)) {
    const newUrl = url.match(regexp)![0]
    return `http://backend-api-01.newbee.ltd${newUrl}`
  } else {
    return url
  }
}

export function getQueryString(name: any) {
  // ^|&：开头或 &
  // [^&]*：非 &，* 表示 0 次或多次
  // &|$：& 或结尾
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  } else {
    return null
  }
}
