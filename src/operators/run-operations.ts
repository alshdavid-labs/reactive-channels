import { Operation } from "./operation"

export const runOperations = (value: any, ops: any[]) => {
  let state = new Operation(value)

  for (const op of ops) {
    state = op(state)
    if (state.skip === true) {
      break
    }
    if (state.complete === true) {
      break
    }
  }
  
  return state
}