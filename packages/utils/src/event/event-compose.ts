import { eventListener, EventListenerHandler } from './event-listener'

export interface EventComposeHandler {
  readonly unbindAll: () => void;
  readonly bindAll: () => void;
}

export interface EventComposeEntry {
  type: string;
  listener: EventListenerOrEventListenerObject,
  options?: EventListenerOptions | boolean
}

export function eventCompose(target: EventTarget, events: EventComposeEntry[]): EventComposeHandler {
  const ActiveHandlers: EventListenerHandler[] = [];
  const handlers = Object.freeze({
    unbindAll() {
      ActiveHandlers.forEach(e => e.unbind())
    },
    bindAll() {
      if (ActiveHandlers.length === 0) {
        events.forEach(e => {
          ActiveHandlers.push(eventListener(target, e.type, e.listener, e.options))
        })
      }
    }
  })
  handlers.bindAll();
  return handlers;
}