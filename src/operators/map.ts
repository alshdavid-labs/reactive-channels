import { Operation } from "./operation"

export const map = (cb: any) => (op: Operation): Operation => {
  op.value = cb(op.value)
  return op
}
