import { PromiseSubject } from "./promise-subject"

export class PrivateChannel<T = any> {
  private subject = new PromiseSubject<T>()
  private hasComplete = false
  private listeners = 0
  private teardown: any | undefined

  constructor(
    private fn: (
      emit: (value: T) => void,
      complete: () => void,
    ) => () => void
  ) {}

  private setup() {
    this.teardown = this.fn(
      this.emit.bind(this),
      this.complete.bind(this),
    )
  }

  private emit(value: T) {
    if (this.hasComplete) {
      throw new Error('Cannot next on complete subject')
    }
    this.subject.complete(value)
    this.subject = new PromiseSubject<T>()
  }

  private complete() {
    this.hasComplete = true
  }

  *[Symbol.iterator](): Iterator<Promise<T>> {
    if (this.listeners === 0) {
      this.setup()
    }
    this.listeners++
    let resolved = false
    while (this.hasComplete === false) {
      try {
        yield this.subject.onDone
        resolved = true
      } finally {
        if (resolved === true) {
          resolved = false
          continue
        }
        this.listeners--
        if (this.listeners === 0) {
          this.teardown()
        }
      }
    }
  }
}



