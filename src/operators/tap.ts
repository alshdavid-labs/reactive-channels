import { Operation } from "./operation"

export const tap = (cb: any) => (op: Operation): Operation => {
  cb(op.value)
  return op
}
