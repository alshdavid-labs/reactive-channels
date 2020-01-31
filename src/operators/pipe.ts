import { PrivateChannel } from "../private-channel";
import { runOperations } from "./run-operations";
import { OperatorFunc } from "./operation";

export type Piper = <T0>(target: Iterable<Promise<T0>>) => {
  <T1>(op1: OperatorFunc<T0, T1>): PrivateChannel<T1>;
  <T1, T2>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>): PrivateChannel<T2>;
  <T1, T2, T3>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>): PrivateChannel<T3>;
  <T1, T2, T3, T4>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>): PrivateChannel<T4>;
  <T1, T2, T3, T4, T5>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>): PrivateChannel<T5>;
  <T1, T2, T3, T4, T5, T6>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>): PrivateChannel<T6>;
  <T1, T2, T3, T4, T5, T6, T7>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>): PrivateChannel<T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>): PrivateChannel<T8>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>): PrivateChannel<T9>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>, op10: OperatorFunc<T9, T10>): PrivateChannel<T10>;
  (...ops: OperatorFunc<any, any>[]): PrivateChannel<any>;
}

export const pipe: Piper = (target) => (...ops: any) => {
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
