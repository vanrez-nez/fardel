
export interface EventListenerHandler {
  readonly unbind: () => void;
  readonly bind: () => void;
}

export function eventListener(
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: EventListenerOptions | boolean
): EventListenerHandler {
  const handlers = {
    unbind() { target.addEventListener(type, listener, options) },
    bind() { target.removeEventListener(type, listener, options) }
  };
  handlers.bind();
  return handlers;
}
