export class PromiseSubject<T = any> extends Promise<T> {
  private resolved: boolean
  public resolve: (value?: T) => void
  public reject: (value?: T) => void

  constructor() {
    let resolve
    let reject

    super((res, rej) => {
      resolve = res
      reject = rej
    })

    this.resolve = (v) => {
      this.resolved = true
      resolve(v)
    }
    
    this.reject = (v) => {
      this.resolved = true
      reject(v)
    }
    this.resolved = false

    PromiseSubject.prototype.constructor = Promise
  }

  public isComplete() {
    return this.resolved
  }
}
