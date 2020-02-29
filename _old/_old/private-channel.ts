import { callback, Subscription, Subject } from "./emitter"

export class Observable<T = any> {
  private subject = new Subject<T>()
  private teardownFn: void | (() => void )

  constructor(
    private setupFn: (
      emit: (value: T) => void,
      complete: () => void,
    ) => (() => void) | void
  ) {}

  public subscribe(cb: callback<T>): Subscription {
    this.setup()
    const sub = this.subject.subscribe(cb)
    return new Subscription(() => {
      sub.unsubscribe()
      this.teardown()
    })
  }

  private setup() {
    if (this.subject.getSubscribersLength() === 0) {
      this.teardownFn = this.setupFn(
        this.subject.emit.bind(this.subject),
        this.subject.complete.bind(this.subject),
      )
    }
  }

  private teardown() {
    if (
      this.subject.getSubscribersLength() === 0 && 
      this.teardownFn
    ) {
      this.teardownFn()
    }
  }
}



