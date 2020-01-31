export class Operation {
  public complete: boolean = false
  public skip: boolean = false
  
  constructor(
    public value: any
  ) {}
}