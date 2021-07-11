// 根据环境引入不同配置 process.env.NODE_ENV
import envConf from './env-config.js'
const config = envConf[process.env.NODE_ENV]
export default config;