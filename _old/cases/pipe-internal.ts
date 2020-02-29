import { filter, map, first } from "../src/operators"
import { runOperations } from "../src/operators/run-operations"

void async function(){
  const v = runOperations(
    1, 
    map(v => v.toString()), 
    map(v => parseInt(v)), 
    map(v => v.toString()), 
    map(v => parseInt(v)), 
    map(v => v.toString()), 
    map(v => parseInt(v)), 
    map(v => v.toString()), 
    map(v => parseInt(v)), 
    map(v => v.toString()), 
  )
}()
