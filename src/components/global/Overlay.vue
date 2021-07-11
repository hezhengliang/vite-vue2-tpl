<template>
<transition name="van-fade">
  <div class="overlay" :style="overlayStyle" @click="handleClick" v-show="show">
    <!-- <slot name="overlay-content"></slot> -->
    <slot></slot>
  </div>
</transition>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'Overlay',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bgColor:{
      type: String,
      default: 'rgba(0,0,0,0.6)'
    },
    zIndex:{
      type: Number,
      default: 1000
    }
  },
  setup(props, {emit}){
    const overlayStyle = computed( () => {
      return `background-color:${props.bgColor};z-index:${props.zIndex}`
    })
    const handleClick = () => {
      emit('onClick', false)
    }
    return {
      overlayStyle,
      handleClick
    }
  }
}
</script>
<style scoped>
.overlay{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  /* transition: all 0.3s ease; */
}
@keyframes overlay-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes overlay-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
.van-fade-enter-active {
  animation: 0.3s overlay-fade-in both ease-out;
}

.van-fade-leave-active {
  animation: 0.3s overlay-fade-out both ease-in;
}
</style>