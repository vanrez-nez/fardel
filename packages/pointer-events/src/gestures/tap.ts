import { PointerEventsGesture } from "./gesture";
import * as POINTER from '../const';

export interface TapGestureOptions {
  maxDelay?: number;
  inputs: number;
}

const DefaultOptions = {
  maxDelay: 300,
  inputs: 1
}

interface TapEvents {
  tap: (event: PointerEvent) => void;
}

export class Tap extends PointerEventsGesture<TapEvents> {
  private options: TapGestureOptions;
  private isDown = false;

  constructor(options?: TapGestureOptions) {
    super({
      type: 'tap',
      inputs: [POINTER.DOWN, POINTER.UP],
      outputs: ['tap']
    });
    this.options = { ...DefaultOptions, ...options };
  }

  onInputEvent(event: Event): void {
    switch(event.type) {
      case POINTER.DOWN:
        this.onDown(event);
        break;
      case POINTER.UP:
        this.onUp(event);
        break;
    }
  }

  onDown(event: Event): void {
    this.isDown = true;
  }

  onUp(event: Event): void {
    if (!this.isDown) return;
    this.emit('tap', new PointerEvent('tap', {
      bubbles: false,
    }));
  }
}