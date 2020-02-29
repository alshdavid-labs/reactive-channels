import { Observable } from "../observable";
import { runOperations } from "./run-operations";
import { OperatorFunc } from "./operation";
import { Subscribable } from "../subscribable";

export type Piper = <T0>(target: Subscribable<T0>) => {
  <T1>(op1: OperatorFunc<T0, T1>): Observable<T1>;
  <T1, T2>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>): Observable<T2>;
  <T1, T2, T3>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>): Observable<T3>;
  <T1, T2, T3, T4>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>): Observable<T4>;
  <T1, T2, T3, T4, T5>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>): Observable<T5>;
  <T1, T2, T3, T4, T5, T6>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>): Observable<T6>;
  <T1, T2, T3, T4, T5, T6, T7>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>): Observable<T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>): Observable<T8>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>): Observable<T9>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<T1, T2>, op3: OperatorFunc<T2, T3>, op4: OperatorFunc<T3, T4>, op5: OperatorFunc<T4, T5>, op6: OperatorFunc<T5, T6>, op7:OperatorFunc<T6, T7>, op8: OperatorFunc<T7, T8>, op9: OperatorFunc<T8, T9>, op10: OperatorFunc<T9, T10>): Observable<T10>;
  (...ops: OperatorFunc<any, any>[]): Observable<any>;
}

export const pipe: Piper = target$ => (...ops: any) => {
  return new Observable<any>((emit, complete) => {
    const sub = target$.subscribe(value => {
      const state = runOperations(value, ...ops)
      if (state.skip) {
        return
      }
      emit(state.value)
      if (state.complete === true) {
        complete()
        return
      }
    })
    return () => sub.unsubscribe()
  })
}
