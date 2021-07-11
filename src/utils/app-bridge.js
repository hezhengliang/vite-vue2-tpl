/**
 * 跳转app登录页面
 */
export function goAppLogin () {
  console.log('login')
  if (window.YTXBridge) {
    window.YTXBridge.fireEvent('ytx:navigate', {
      'type': 320
    })
  }
}

/**
 * 返回上级页面
 */
export function goBack () {
  console.log('click go back')
  if (window.YTXBridge) {
    window.YTXBridge.fireEvent('ytx:navigate', {
      'type': 326
    })
  }
}