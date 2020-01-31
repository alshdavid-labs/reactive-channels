import { Operation } from "./operation"

export const filter = (predicate: any) => (op: Operation): Operation => {
  if (predicate(op.value) === false) {
    op.skip = true
  }
  return op
}