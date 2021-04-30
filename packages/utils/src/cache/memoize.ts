/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { isSymbol, isUndefined } from '../assert';
import { isPrimitive } from '../assert/is-primitive'

type Func = (...args: any[]) => any;
export type MemoizeCacheKey = string | symbol;

export interface Cache<V> {
  get: (key: MemoizeCacheKey) => V;
  set: (key: MemoizeCacheKey, value: V) => void;
  has: (key: MemoizeCacheKey) => boolean;
}

export interface MemoizeOptions<V> {
  cache?: Cache<V>;
  once?: boolean;
  argsReducer?: (args: any[]) => MemoizeCacheKey;
}

function getCacheInstance<T>(): Cache<T> {
  const m = new Map<MemoizeCacheKey, T>();
  return {
    get: (key: MemoizeCacheKey) => m.get(key) as T,
    has: (key: MemoizeCacheKey) => m.has(key),
    set: (key: MemoizeCacheKey, value: any) => m.set(key, value),
  };
}

const Undef = Symbol(undefined);
function defaultArgsReducer(args: any[]): MemoizeCacheKey {
  // handle primitive monadic arguments (fast)
  if (args.length === 1 && isPrimitive(args[0])) {
    if (isSymbol(args[0])) return args[0];
    if (isUndefined(args[0])) return Undef;
    return (args[0]).toString();
  }
  // otherwise handle variadic args (slow)
  return JSON.stringify(args);
}

export function memoize<T extends Func>(fn: T, options?: MemoizeOptions<ReturnType<T>>): (...funcArgs: Parameters<T>) => ReturnType<T> {
  const cache = options?.cache ?? getCacheInstance<ReturnType<T>>();
  const argsReducer = options?.argsReducer ?? defaultArgsReducer;
  let prevKey: MemoizeCacheKey;
  return function(...args: Parameters<T>): ReturnType<T> {
    // Handle calls with no arguments and calls with the <once> flag
    if (!isUndefined(prevKey) && (options?.once || args.length === 0)) {
      return cache.get(prevKey);
    }
    const key = argsReducer(args);
    prevKey = key
    if (cache.has(key)) {
      return cache.get(key);
    }
    cache.set(key, fn(...args));

    // retrieve the value via get to handle external get transforms
    return cache.get(key);
  }
}
