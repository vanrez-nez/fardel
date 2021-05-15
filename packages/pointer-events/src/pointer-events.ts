// @ts-nocheck
import { uniqArray, eventCompose, EventComposeHandler, EventComposeEntry, EventEmitter } from '@fardel/utils'
import type { PointerEventsGesture, PointerEventType } from './gestures/gesture';
import * as POINTER from './const';

export interface ListenerTypes {
  // Native Events
  'over': EventListener;
  'enter': EventListener;
  'down': EventListener;
  'move': EventListener;
  'up': EventListener;
  'cancel': EventListener;
  'out': EventListener;
  'leave': EventListener;
  // Gesture Events
  'tap': EventListener;
  'drag': EventListener;
  'swipe': EventListener;
  'rotate': EventListener;
  'expand': EventListener;
  'pinch': EventListener;
}

const EventsRemap: Record<PointerEventType, keyof ListenerTypes> = {
  [POINTER.OVER]: 'over',
  [POINTER.ENTER]: 'enter',
  [POINTER.DOWN]: 'down',
  [POINTER.MOVE]: 'move',
  [POINTER.UP]: 'up',
  [POINTER.CANCEL]: 'cancel',
  [POINTER.OUT]: 'out',
  [POINTER.LEAVE]: 'leave',
};

export interface PointerEventConstructorOptions {
  gestures?: PointerEventsGesture[];
  listeners?: ListenerTypes[]
}

export class PointerEvents extends EventEmitter<ListenerTypes> {
  private target: EventTarget;
  private gestures: PointerEventsGesture[] = [];
  private events!: EventComposeHandler;

  constructor(target: EventTarget, options: PointerEventConstructorOptions) {
    super();
    this.target = target;
    this.bind();
  }

  private extractGestureInputs() {
    const inputs = this.gestures.reduce(
      (acc: PointerEventType[], gesture) => {
        acc.push(...gesture.inputs);
        return acc;
      }, []);
    return uniqArray(inputs.flat());
  }

  private bindGesturesInputs() {
    const inputs = this.extractGestureInputs();
    const entries = inputs.reduce((acc, entry) => {
      acc.push({ type: entry, listener: this.onPointerEvent });
      return acc;
    }, [] as EventComposeEntry[]);
    this.events = eventCompose(this.target, entries);
  }

  private bindGestureOutputs() {
    this.gestures.forEach(gesture => {
      gesture.outputs.forEach(output => {
        gesture.on(output, (event) => this.emit(output, event));
      })
    })
  }

  private unbindGestureOutputs() {
    this.gestures.forEach(gesture => gesture.off());
  }

  public registerGesture(gesture: PointerEventsGesture): void {
    const exists = this.gestures.find(g => g.type === gesture.type);
    if (!exists) {
      this.gestures.push(gesture);
    }
  }

  public bind(): void {
    this.bindGesturesInputs();
    this.bindGestureOutputs();
    this.events.bindAll();
  }

  public unbind(): void {
    this.unbindGestureOutputs();
    this.events.unbindAll();
    this.off();
  }

  private onPointerEvent = (event: Event) => {
    this.emitNativeOutputs(event as PointerEvent);
    // forward events into gestures (inputs)
    this.gestures.forEach(gesture => {
      if (event.type in gesture.inputs) {
        gesture.onInputEvent(event as PointerEvent);
      }
    })
  }

  private emitNativeOutputs(event: PointerEvent) {
    const type = event.type as PointerEventType;
    if (type in EventsRemap) {
      this.emit(EventsRemap[type], event);
    }
  }
}