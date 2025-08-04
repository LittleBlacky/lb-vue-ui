export function useDebounce() {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  const registDebounced = function <T extends (...args: any[]) => any>(
    fn: T,
    delayTime: number,
    ...args: Parameters<T> | []
  ): Promise<ReturnType<T>> {
    cancelTimeout();
    return new Promise((resolve, reject) => {
      timerId = setTimeout(() => {
        try {
          resolve(fn(...(args || [])));
        } catch (err) {
          reject(err);
        }
      }, delayTime);
    });
  };
  const cancelTimeout = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
  return { registDebounced, cancelTimeout };
}
