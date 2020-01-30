export class PromiseSubject<T = any> {
  public onDone = new Promise<T>(res => this.complete = res)
  public complete: (value?: any) => void
}
