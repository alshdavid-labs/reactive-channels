import { Operation, OperatorFunc } from "./operation"

export type OperationRunner = {
  <T0>(value: T0): Operation<T0>;
  <T0, T1>(value: T0, op1: OperatorFunc<T0, T1>): Operation<T1>;
  <T0, T1, T2>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>): Operation<T2>;
  <T0, T1, T2, T3>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>): Operation<T3>;
  <T0, T1, T2, T3, T4>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>): Operation<T4>;
  <T0, T1, T2, T3, T4, T5>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>): Operation<T5>;
  <T0, T1, T2, T3, T4, T5, T6>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>): Operation<T6>;
  <T0, T1, T2, T3, T4, T5, T6, T7>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>): Operation<T7>;
  <T0, T1, T2, T3, T4, T5, T6, T7, T8>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>): Operation<T8>;
  <T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>): Operation<T9>;
  <T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(value: T0, op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>, op10: OperatorFunc<T9, T10>): Operation<T10>;
  (value: any, ...ops: OperatorFunc<any, any>[]): Operation<any>;
}

export const runOperations: OperationRunner = (value: any, ...ops: any[]) => {
  let state: Operation<any> = new Operation(value)

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
