import { Operation } from "./operation"

export const first = (predicate?: any) => (op: Operation): Operation => {
  if (!predicate) {
    op.complete = true
  } else if (predicate(op.value) === false) {
    op.complete = true
  }
  return op
}
