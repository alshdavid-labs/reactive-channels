import { PromiseSubject } from "./promise-subject"
import { callback, Subscription } from "./emitter"

export class Channel<T = any> {
  private subscribers: Record<string, callback<T>> = {}
  private onComplete = new PromiseSubject<T | undefined>()
  private lastValue: T | undefined

  toPromise(): Promise<T> {
    return this.onComplete.getPromise()
  }

  subscribe(cb: callback<T>): Subscription {
    const key = (Math.random() * 1000000000000000).toFixed().toString()
    this.subscribers[key] = cb
    return {
      unsubscribe: () => delete this.subscribers[key]
    }
  }

  emit(value: T) {
    this.lastValue = value
    for (const key of Object.keys(this.subscribers)) {
      this.subscribers[key](value)
    }
  }
  
  complete(): void {
    this.onComplete.resolve(this.lastValue)
  }
}