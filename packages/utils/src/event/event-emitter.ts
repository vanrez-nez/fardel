/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isUndefined, isFunction } from '../assert';

type Func = (...args: any[]) => void;

type GenericEvents = {
  [key: string]: any;
}

type TypedEvents<T> = {
  [Property in keyof T]: Func;
}

type ListenerMap<T> = Map<keyof T, Set<Func>>;

export class EventEmitter<Events extends TypedEvents<Events> = GenericEvents> {
  private alwaysMap: ListenerMap<Events> | undefined;
  private onceMap: ListenerMap<Events> | undefined;

  // Utility function to do lazy create on listener maps
  private allocMap(name: keyof Events, map: ListenerMap<Events> | undefined) {
    const result = map || new Map() as ListenerMap<Events>;
    if (!result.has(name)) {
      result.set(name, new Set());
    }
    return result;
  }

  private getAlwaysSet(name: keyof Events) {
    this.alwaysMap = this.allocMap(name, this.alwaysMap);
    return this.alwaysMap.get(name)!;
  }

  private getOnceSet(name: keyof Events) {
    this.onceMap = this.allocMap(name, this.onceMap);
    return this.onceMap.get(name)!;
  }

  private isOnce<K extends keyof Events>(name: K, handler: Events[K]): boolean {
    const { onceMap: m } = this;
    return !isUndefined(m) && m.has(name) && m.get(name)!.has(handler);
  }

  on<K extends keyof Events>(name: K, handler: Events[K]): void {
    if (!isFunction(handler)) return;
    this.getAlwaysSet(name).add(handler);
  }

  once<K extends keyof Events>(name: K, handler: Events[K]): void {
    if (!isFunction(handler)) return;
    this.on(name, handler);
    this.getOnceSet(name).add(handler);
  }

  off<K extends keyof Events>(name: K, handler?: Events[K]): void{
    if (isUndefined(this.alwaysMap) || !this.alwaysMap.has(name)) return;
    const alwaysSet = this.getAlwaysSet(name);
    if (!isFunction(handler)) {
      alwaysSet.clear();
    } else {
      alwaysSet.delete(handler);
      if (this.isOnce(name, handler)) {
        this.onceMap!.get(name)!.delete(handler);
      }
    }
  }

  emit<K extends keyof Events>(name: K, ...args: Parameters<Events[K]>): void {
    if (isUndefined(this.alwaysMap)) return;
    const alwaysListeners = this.alwaysMap;
    if (alwaysListeners.has(name)) {
      alwaysListeners.get(name)!.forEach(h => {
        h(...args);
        if (this.isOnce(name, h as Events[K])) {
          this.off(name, h as Events[K]);
        }
      });
    }
  }
}