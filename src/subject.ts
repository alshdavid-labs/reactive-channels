import { callback } from "./subscribable"
import { Subscription } from "./subscription"

export class Subject<T = any> {
  private subscribers: Record<string, callback<T>> = {}
  private hasComplete = false
  private onComplete: (v: T) => void
  private onCompletePromise = new Promise<T>(res => this.onComplete = res)
  private lastValue: T | undefined

  toPromise(): Promise<T> {
    return this.onCompletePromise
  }

  getSubscribersLength(): number {
    return Object.keys(this.subscribers).length
  }

  subscribe(cb: callback<T>, error: callback, complete: callback): Subscription {
    const key = (Math.random() * 1000000000000000).toFixed().toString()
    this.subscribers[key] = cb
    return new Subscription(() => delete this.subscribers[key])
  }

  next(value: T): void {
    if (this.hasComplete) {
      throw new Error('Cannot emit on completed emitter')
    }
    this.lastValue = value
    for (const key of Object.keys(this.subscribers)) {
      this.subscribers[key](value)
    }
  }

  complete(): void {
    this.hasComplete = true
    this.onComplete(this.lastValue)
  }
}
