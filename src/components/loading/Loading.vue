<template>
  <transition ref="rootLoading" :name="transition">
    <div
      class="loading-overlay"
      :style="`background-color:${bgColor}`"
      v-show="isActive"
    >
      <div class="load-icon">
        <svg
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          :width="width"
          :height="height"
          :stroke="color"
        >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="3">
            <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  onMounted,
  ref,
  watch,
  computed,
  reactive,
} from "vue";

export default {
  name: "Loading",
  props: {
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, HTMLElement],
    transition: {
      type: String,
      default: "fade",
    },
    color: {
      type: String,
      default: '#06c'
    },
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 40
    },
    bgColor: {
      type: String,
      default: 'rgba(0,0,0,0.6)'
    }
  },
  setup(props, context) {
    const isActive = ref(props.active);
    const hide = () => {
      if (props.programmatic) {
        isActive.value = false;
        setTimeout(() => {
          return;
        }, 150);
      }
    };
    const cancel = () => {
      if (!props.canCancel || !isActive.value) return;
      hide();
      props.onCancel();
    };
    onMounted(() => {
      if (props.programmatic) {
        isActive.value = true;
      }
    });
    watch(
      () => props.active,
      () => {
        isActive.value = props.active;
      }
    );
    return {
      isActive,
      hide,
    };
  },
};
</script>
<style lang="scss" scoped>
.loading-overlay{
  width:100%;
  height:100vh;
  position: fixed;
  z-index:2021;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color:rgba(255,255,255,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>