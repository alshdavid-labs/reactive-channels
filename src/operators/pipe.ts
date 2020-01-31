import { Channel } from "../channel";
import { PrivateChannel } from "../private-channel";
import { runOperations } from "./run-operations";

export const pipe = (target: Channel) => (...ops: any[]): PrivateChannel<any> => {
  return new PrivateChannel<any>((emit, complete) => {
    let done: any = false

    void async function() {
      for (const ev of target) {
        if (done === true) {
          break
        }
        const value = await ev
        const state = runOperations(value, ops)
        if (state.skip) {
          continue
        }
        emit(state.value)
        if (state.complete === true) {
          complete()
          break
        }
      }
    }()
    return () => done = true
  })
}
