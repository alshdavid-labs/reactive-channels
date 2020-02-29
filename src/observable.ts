import { Subject } from "./subject"
import { callback } from "./subscribable"
import { Subscription } from "./subscription"

export class Observable<T = any> {
  private subject = new Subject<T>()
  private teardownFn: void | (() => void )

  constructor(
    private setupFn: (
      next: (value: T) => void,
      complete: () => void,
    ) => (() => void) | void
  ) {}

  public toPromise() {
    return this.subject.toPromise()
  }

  public subscribe(cb: callback<T>): Subscription {
    this.setup()
    const sub = this.subject.subscribe(cb)
    return new Subscription(() => {
      sub.unsubscribe()
      if (this.subject.getSubscribersLength() === 0) {
        this.teardownFn && this.teardownFn()
      }
    })
  }

  private setup() {
    if (this.subject.getSubscribersLength() === 0) {
      this.teardownFn = this.setupFn(
        this.subject.next.bind(this.subject),
        () => {
          this.subject.complete()
          this.teardownFn && this.teardownFn()
        },
      )
    }
  }
}



