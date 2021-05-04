import { debounce } from './debounce'
type Func = (...args: any[]) => any;

export type ThrottleOptions = {
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export function throttle<T extends Func>(fn: T, wait = 0, options: ThrottleOptions): (...funcArgs: Parameters<T>) => Promise<ReturnType<T>> {
  return debounce(fn, wait, {
    maxWait: wait,
    leading: options.leading,
    trailing: options.trailing,
  });
}