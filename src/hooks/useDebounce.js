import { ref } from "vue";

export default function useDebounce(handler, time = 500) {
  const timer = ref();
  let flag = true;
  return (...args) => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    // if(flag){
    //   handler.bind(null, ...args);
    //   flag = false
    //   // return
    // }
    timer.value = setTimeout(function(){
      handler.bind(null, ...args)
      flag = true
    }, time);
  };
}