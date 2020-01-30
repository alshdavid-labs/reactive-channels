import { PromiseSubject } from "./promise-subject"

export class Channel<T = any> {
  private subject = new PromiseSubject<T>()
  private hasComplete = false

  emit(value: T) {
    if (this.hasComplete) {
      throw new Error('Cannot next on complete subject')
    }
    this.subject.complete(value)
    this.subject = new PromiseSubject()
  }

  complete() {
    this.hasComplete = true
  }

  *[Symbol.iterator](): Iterator<Promise<T>> {
    while (this.hasComplete === false) {
      yield this.subject.onDone
    }
  }
}



