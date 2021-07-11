//--source:https://github.com/youzan/vant/blob/dev/src/composables
let count = 0;
const CLASSNAME = 'el-overflow-hidden';
export default function useLockScroll(shouldLock) {
  const lock = () => {
    if (shouldLock()) {
      if (!count) {
        document.body.classList.add(CLASSNAME);
      }
      count++;
    }
  };

  const unlock = () => {
    if (shouldLock() && count) {
      count--;
      if (!count) {
        document.body.classList.remove(CLASSNAME);
      }
    }
  };

  return [lock, unlock];
}
