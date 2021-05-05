import { isFunction } from '../assert'

type Func = (...args: any[]) => any;

export type DebounceOptions = {
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
  context?: unknown;
}

export interface DebounceHandle<T extends Func> {
  (...funcArgs: Parameters<T>): Promise<ReturnType<T>>
  cancel?: () => void;
  flush?: () => void;
  pending?: () => boolean;
}

const DEFAULT_OPTIONS =  {
  maxWait: 0,
  leading: false,
  trailing: true,
}

const now = () => Date.now();

export function debounce<T extends Func>(fn: T, wait = 0, options?: DebounceOptions): DebounceHandle<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const maxWait = Math.max(opts.maxWait, wait);
  let timeoutHandle = -1;
  let canLead = true;
  let lastCallTime = now();
  let lastInvokeTime = now();
  let pendingCall: Func | undefined;

  const debounceFn = function(this: ThisParameterType<T>, ...args: Parameters<T>): Promise<ReturnType<T>> {

    const context = opts.context || this;

    function delayedInvoke(fn: Func, delay: number) {
      clearTimeout(timeoutHandle);
      pendingCall = () => {
        pendingCall = undefined;
        lastInvokeTime = now();
        fn();
      }
      timeoutHandle = setTimeout(pendingCall, delay);
    }

    if (opts.leading) {
      const dtLastCall = now() - lastCallTime;
      lastCallTime = now();
      canLead = dtLastCall >= wait;
      if (canLead) {
        return new Promise((resolve) => {
          canLead = false;
          lastInvokeTime = now();
          resolve(fn.apply(context, args));
        });
      }
    }

    if (maxWait > 0) {
      const dtLastInvoke = now() - lastInvokeTime;
      return new Promise((resolve) => {
        delayedInvoke(() => {
          resolve(fn.apply(context, args));
        }, maxWait - dtLastInvoke);
      });
    }

    if (opts.trailing) {
      return new Promise((resolve) => {
        delayedInvoke(() => {
          resolve(fn.apply(context, args));
        }, wait);
      });
    }

    return fn.apply(context, args) as never;
  }

  debounceFn.cancel = () => {
    clearTimeout(timeoutHandle);
    pendingCall = undefined;
  };

  debounceFn.flush = () => {
    clearTimeout(timeoutHandle);
    if (isFunction(pendingCall)) {
      pendingCall();
    }
  };

  debounceFn.pending = () => pendingCall !== undefined;

  return debounceFn;
}
