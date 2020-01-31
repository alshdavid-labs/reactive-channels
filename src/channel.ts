import { PromiseSubject } from "./promise-subject"

export class Channel<T = any> {
  private subject = new PromiseSubject<T>()
  private onComplete = new PromiseSubject<T>()
  private lastValue: T

  toPromise(): Promise<T> {
    return this.onComplete.getPromise()
  }

  emit(value: T) {
    if (this.onComplete.isComplete()) {
      throw new Error('Cannot next on complete subject')
    }
    this.lastValue = value
    this.subject.resolve(value)
    this.subject = new PromiseSubject()
  }

  complete() {
    this.onComplete.resolve(this.lastValue)
  }

  *[Symbol.iterator](): Iterator<Promise<T>> {
    while (this.onComplete.isComplete() === false) {
      yield this.subject.getPromise()
    }
  }
}



