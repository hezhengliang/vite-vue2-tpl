export default function useComponent(app){
  const modules = import.meta.globEager('./*.vue')
  for (const path in modules){
    const componentName = changeStr(
      path.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
    const config = modules[path].default || config
    app.component(componentName, config)
  }
  //-- 懒加载模式
  // const modules = import.meta.glob('./*.vue')
  // for (const path in modules) {
  //   const componentName = changeStr(
  //     path.replace(/^\.\//, '').replace(/\.\w+$/, '')
  //   )
  //   modules[path]().then((config) => {
  //     app.component(componentName, config.default || config) //
  //   })
  // }
}
function changeStr(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}