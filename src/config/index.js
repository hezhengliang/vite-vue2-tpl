// 根据环境引入不同配置 process.env.NODE_ENV
import envConf from './env-config.js'
import apiUrlConf from './api-url.js'

export function getConfig(key){
  const config = envConf[process.env.NODE_ENV];
  return config[key]
}

export function getUrl(domain, path){
  return getConfig(domain) + '/' + apiUrlConf[domain][path]
}