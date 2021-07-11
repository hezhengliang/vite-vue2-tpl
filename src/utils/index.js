/** 获取url参数 */
export const getUrlParameterValue = (parameter) => {
  const _search = window.location.search
  let r = null
  if(_search){
    const regs = new RegExp('(^|&)' + parameter + '=([^&]*)(&|$)', 'i')
    r = _search.substr(1).match(regs)
    if (r !== null) return unescape(r[2])
    return null
  } else {
    const regh = new RegExp('[?|&]' + parameter + '=' + '([^&;]+?)(&|#|;|$)')
    r = regh.exec(window.location.href)[1] || null
    if(r !== null) return decodeURIComponent(r.replace(/\+/g, '%20'))
    return null
  }
}

export const isIOS = () => {
  return /iPhone|iPad/i.test(navigator.userAgent)
}
export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent)
}
export const isWx = () => {
  return /micromessenger/i.test(navigator.userAgent)
}
export const isWorkWx = () => {//-- 是否是企业微信号
  return /WxWork/i.test(navigator.userAgent); 
}

export const isApp = () => {
  return /YTX/i.test(navigator.userAgent)
}
