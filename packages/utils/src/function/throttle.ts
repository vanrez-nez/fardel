import { debounce } from './debounce'

type Func = (...args: any[]) => any;

export type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
  context?: unknown;
}

export interface ThrottleHandle<T extends Func> {
  (...funcArgs: Parameters<T>): Promise<ReturnType<T>>
  cancel?: () => void;
  flush?: () => void;
  pending?: () => boolean;
}

export function throttle<T extends Func>(fn: T, wait = 0, options?: ThrottleOptions): ThrottleHandle<T> {
  return debounce(fn, wait, { ...options, maxWait: wait });
}