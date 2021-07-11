<template>
  <div class="wrap" :class="showContent ? 'fadein' : 'fadeout'">
    <div class="wrap-inner" v-show="showWrap">
      <p>{{ text }}</p>
    </div>
  </div>
</template>
<script>
import {ref, onMounted, getCurrentInstance } from "vue";
export default {
  name: 'Toast',
  props: {
    text: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1200
    },
  },
  setup(props){
    const showContent = ref(true)
    const showWrap = ref(true)
    const { proxy } = getCurrentInstance()
    const handleClose = () => {
      setTimeout( () => {
        showContent.value = false
        showWrap.value = false
        document.body.removeChild(proxy.$el.parentNode)
      }, props.duration)
    }
    onMounted( () => {
      handleClose()
    })
    return {
      showContent,
      showWrap
    }
  }
}
</script>
<style lang="css" scoped>
.wrap {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  padding: 0 29px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.wrap-inner {
  text-align: center;
  display: inline-flex;
  align-items: center;
  margin: 20px 0;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  margin: 0 auto;
}
.wrap-inner p{
  text-align: center;
  margin: 0 auto;
  padding:16px;
  word-break: break-word;
  transform: none;
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
