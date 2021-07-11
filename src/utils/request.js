import axios, {AxiosRequestConfig} from 'axios'

import { baseApi } from '@/config'
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// create an axios instance
const service = axios.create({
  // baseURL: baseApi,
  // withCredentials: true,
  timeout: 5000,
  transformRequest: [function (data) {
    return qs.stringify(data)
  }],
})

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    // switch(config.urlType){
    //   case 'multi': 
    //     config.url = multiApi + config.url;
    //     break;
    //   default: 
    //     config.url = baseApi + config.url;
    // }
    return config
  },
  error => {
    // do something with request error
    console.log('request', error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
