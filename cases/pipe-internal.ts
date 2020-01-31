import { filter, map, first } from "../src/operators"
import { runOperations } from "../src/operators/run-operations"

void async function(){
  const ops = [
    map(v => v + 1),
    filter(v => v === 4),
    first(),
  ]
  
  // runOperations(1, ops)
  runOperations(2, ops)
  // runOperations(3, ops)
}()
