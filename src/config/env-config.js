const PROTOCOL = window.location.protocol
export default {
  development: {
    baseApi: `${PROTOCOL}//xxx.com`,
  },
  production: {
    baseApi: `${PROTOCOL}//xxx.com`,
  }
}
