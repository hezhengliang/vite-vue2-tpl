import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// 生产环境，测试和正式
const IS_PROD = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/assets/styles/base.scss";`,
  //     }
  //   }
  // },
  build: {
    outDir: IS_PROD ? 'dist' : 'dist-dev', //  生产环境构建文件的目录
    assetsDir: 'static',
  }
})
