import { PromiseSubject } from "./promise-subject"

export class PrivateChannel<T = any> {
  private onValue = new PromiseSubject<T>()
  private onComplete = new PromiseSubject<T>()
  private listeners = 0
  private lastValue: T
  private teardown: any | undefined

  constructor(
    private fn: (
      emit: (value: T) => void,
      complete: () => void,
    ) => () => void
  ) {}

  private setup(): void {
    this.listeners++

    if (this.listeners > 1) {
      return
    }
    
    const teardown = this.fn(
      this.emit.bind(this),
      this.complete.bind(this),
    )

    this.teardown = () => {
      this.listeners--
      if (this.listeners > 0) {
        return
      }
      teardown()
    }
  }

  public async toPromise(): Promise<T> {
    this.setup()
    const result = await this.onComplete.getPromise()
    this.teardown()
    return result
  }

  private emit(value: T): void {
    if (this.onComplete.isComplete()) {
      throw new Error('Cannot next on complete subject')
    }
    this.lastValue = value
    this.onValue.resolve(value)
    this.onValue = new PromiseSubject<T>()
  }

  private complete(): void {
    this.onComplete.resolve(this.lastValue)
  }

  *[Symbol.iterator](): Iterator<Promise<T>> {
    this.setup()
    let resolved = false
    while (this.onComplete.isComplete() === false) {
      try {
        yield this.onValue.getPromise()
        resolved = true
      } finally {
        if (resolved === true) {
          resolved = false
          continue
        }
        this.teardown()
      }
    }
  }
}



