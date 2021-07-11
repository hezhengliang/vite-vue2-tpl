<template>
  <div>
    <h1 class="fw_700 fs_24" >Home</h1>
  </div>
</template>
<script>
import { onMounted, getCurrentInstance } from 'vue'
import { saBuryPageView } from '@/utils/sa-bury.js'
// const comFunc = require('@/utils/comonjs-test.js')
// console.log(comFunc)
export default {
  setup(){
    const {proxy} = getCurrentInstance()
    // console.log(comFunc)
    // onMounted( () => {
    //   proxy.$mtoast('测试toast', 100200)
    // })
  }
}
</script>
<style lang="scss" scoped>

</style>