import { h, render } from "vue";
import Loading from './Loading.vue'

function createComponent(component, props, parentContainer) {
  const vnode = h(component, props)
  const container = document.createElement('div')
  parentContainer.appendChild(container);
  render(vnode, container);

  return vnode.component
}

function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode?.removeChild(el)
  }
};


// export default Loading;

export function useLoading(globalProps= {}) {
  let instance = null;

  const loading = {
    show(props=globalProps) {
      const forceProps = {
        programmatic: true,
      };
      const propsData = Object.assign({}, globalProps, props, forceProps);
      let container = propsData.container;

      if (!propsData.container) {
        container = document.body;
      }
      if(document.getElementsByClassName('loading-overlay')[0]){
        console.warn('Loading已开启，请先关闭……')
        return
      }
      instance = createComponent(Loading, propsData, container);
    },
    hide() {
      if (instance != null) {
        instance.ctx.hide();
        let root = instance.vnode.el;
        removeElement(root.parentElement);
      }
    }
  }
  return loading
}
