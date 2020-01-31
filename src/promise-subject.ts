export class PromiseSubject<T = any> {
  public resolve: (value?: T) => void
  public reject: (value?: T) => void

  private resolved = false
  private promise = new Promise<T>((res, rej) => {
    this.resolve = (v) => {
      this.resolved = true
      res(v)
    }

    this.reject = (v) => {
      this.resolved = true
      rej(v)
    }
  })

  public getPromise() {
    return this.promise
  }

  public isComplete() {
    return this.resolved
  }
}
