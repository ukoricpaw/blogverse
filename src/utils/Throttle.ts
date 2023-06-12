export function throttle(cb: () => void, ms: number) {
  let isThrottled: boolean = false;
  function wrapper() {
    if (isThrottled) {
      return;
    }
    console.log("lol")
    cb.apply(throttle);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, ms)
  }

  return wrapper;
}