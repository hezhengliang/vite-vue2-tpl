<template>
  <overlay :show="show" :zIndex="zOIndex" @onClick="onOverlayClick" />
  <div class="popup-container" :class="{ 'popup-show': show, 'safe-area-inset-bottom': safeAreaInsetBottom, 'safe-area-inset-bottom__andorid':  isAndroidSafeArea}" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted, onBeforeMount, onActivated, onDeactivated } from 'vue'
import Overlay from './Overlay.vue'
import useLockScroll from '@/hooks/useLockScroll.js'
import { judgeAndroidBigScreen, isAndroid } from '@/utils/index.js'
const context = {
  zIndex: 100
}
//-- 部分代码参照vant源码：https://github.com/youzan/vant/tree/dev/src/popup

export default {
  name: 'PopUp',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 99
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnPopstate: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {// whether to close popup when overlay is clicked
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {// iphone全面屏底部适配
      type: Boolean,
      default: false
    }
  },
  components: { Overlay },
  emits: [
    'open',
    'close',
    'update:show'
  ],
  setup(props, {emit}){
    let opened, shouldOpen;

    const zOIndex = ref()
    const isAndroidSafeArea = ref(false)
    const [lockScroll, unlockScroll] = useLockScroll(() => props.lockScroll);

    const style = computed(() => {
      const _style = {
        'z-index': props.zIndex,
      };
      return _style;
    });
    watch(
      () => props.show,
      (value) => {
        if (value) {
          open();
        } else {
          close();
        }
      }
    );
    const open = () => {
      if (!opened) {
        if (props.zIndex !== undefined) {
          context.zIndex = props.zIndex;
        }
        opened = true;
        lockScroll();
        zOIndex.value = --context.zIndex;
      }
    };

    const close = () => {
      if (opened) {
        opened = false;
        unlockScroll()
        emit('update:show', false);
      }
    };
  
    const onOverlayClick = () => {
      if (props.closeOnClickOverlay) {
        close();
      }
    };

    onMounted(() => {
      if (props.show) {
        //-- Android 全面屏增加底部适配
        if(isAndroid() && judgeAndroidBigScreen() && props.safeAreaInsetBottom){
          isAndroidSafeArea.value = true
        }
        open();
      }
      window.addEventListener('popstate', popstateFunc)
    });

    onBeforeMount( () => {
      window.removeEventListener('popstate', popstateFunc)
    })
    //-- keep-alive情况下处理
    onActivated(() => {
      if (shouldReopen) {
        emit('update:show', true);
        shouldReopen = false;
      }
    });

    onDeactivated(() => {
      if (props.show) {
        close();
        shouldReopen = true;
      }
    });
    function popstateFunc(){
      if (props.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    }
    return {
      onOverlayClick,
      zOIndex,
      style,
      isAndroidSafeArea
    }
  }
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 99;
  background-color:#fff;
}
.popup-show {
  transform: translateY(0);
}
.popup-container.safe-area-inset-bottom{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.popup-container.safe-area-inset-bottom__andorid{
  padding-bottom:24px;
}
</style>
