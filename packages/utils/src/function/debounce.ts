type Func = (...args: any[]) => any;

export type DebounceOptions = {
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

const DEFAULT_OPTIONS =  {
  maxWait: 0,
  leading: false,
  trailing: true
}

export function debounce<T extends Func>(fn: T, wait = 0, options: DebounceOptions): (...funcArgs: Parameters<T>) => Promise<ReturnType<T>> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const maxWait = Math.max(opts.maxWait, wait);
  let timeoutHandle = -1;
  let canLead = true;
  let lastCallTime = Date.now();
  let lastInvokeTime = Date.now();

  function delayedInvoke(fn: Func, delay: number) {
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(() => {
      lastInvokeTime = Date.now();
      fn();
    }, delay);
  }

  return function(...args: Parameters<T>): Promise<ReturnType<T>> {

    if (opts.leading) {
      const dtLastCall = Date.now() - lastCallTime;
      lastCallTime = Date.now();
      canLead = dtLastCall >= wait;
      if (canLead) {
        return new Promise((resolve) => {
          canLead = false;
          lastInvokeTime = Date.now();
          resolve(fn(...args));
        });
      }
    }

    if (maxWait > 0) {
      const dtLastInvoke = Date.now() - lastInvokeTime;
      return new Promise((resolve) => {
        delayedInvoke(() => {
          resolve(fn(...args));
        }, maxWait - dtLastInvoke);
      });
    }

    if (opts.trailing) {
      return new Promise((resolve) => {
        delayedInvoke(() => {
          resolve(fn(...args));
        }, wait);
      });
    }

    return fn(...args) as never;
  }
}
