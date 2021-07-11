const PROTOCOL = window.location.protocol
export default {
  development: {
    baseApi: `${PROTOCOL}//test-gateway.hz5800.com`,
  },
  production: {
    baseApi: `${PROTOCOL}//saas.hz5800.com`,
  }
}