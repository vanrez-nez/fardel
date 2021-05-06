
const offset = Date.now();
const now = () => {
  return globalThis.performance ? globalThis.performance.now() : Date.now() - offset;
}

export class Clock {
  private autoStart = false;
  private running = false;
  private startTime = 0;
  private oldTime = 0;
  private elapsedTime = 0;

  constructor(autoStart = false) {
    this.autoStart = autoStart;
  }

  /**
   * Starts the timer
   */
  start(): void {
    this.startTime = now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }

  /**
   * Stops the timer
   */
  stop(): void {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  /**
   * Calculates total time since timer started
   * @returns time in milliseconds
   */
  getElapsedTime(): number {
    this.getDelta();
    return this.elapsedTime;
  }

  /**
   * Calculates delta time since previous call
   * @returns time in milliseconds
   */
  getDelta(): number {
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    let diff = 0;
    if (this.running) {
      const newTime = now();
      diff = (newTime - this.oldTime);
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }
    return diff;
  }
}