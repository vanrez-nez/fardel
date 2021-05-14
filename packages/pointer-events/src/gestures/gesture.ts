import { EventEmitter } from "@fardel/utils";

export type PointerEventGestureType = 'tap' | 'drag' | 'swipe' | 'rotate' | 'expand' | 'pinch';
export type PointerEventType = 'pointerover' | 'pointerenter' | 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel' | 'pointerout' | 'pointerleave';

export interface PointerEventsGestureOptions {
  type: PointerEventGestureType;
  inputs: PointerEventType[];
  outputs: PointerEventGestureType[];
}

type GenericEvents = {
  [key: string]: (...args: any[]) => void;
}

type TypedEvents<K> = {
  [Property in keyof K]: (...args: any[]) => void;
}

export abstract class PointerEventsGesture<T extends TypedEvents<T> = GenericEvents> extends EventEmitter<T> {
  // Gesture id
  public readonly type: PointerEventGestureType;

  // An array of browser event types required by the gesture.
  public readonly inputs: PointerEventType[];

  public readonly outputs: PointerEventGestureType[];

  constructor(options: PointerEventsGestureOptions) {
    super();
    this.type = options.type;
    this.inputs = options.inputs;
    this.outputs = options.outputs;
  }

  abstract onInputEvent(event: PointerEvent): void;
}