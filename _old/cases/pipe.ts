import { Channel } from "../src"
import { pipe, first, filter, map } from "../src/operators"
import { sleep } from "./lib/sleep"

console.log('ok')

void async function(){
  const a$ = new Channel<number>()
  a$.subscribe(console.log)

  const b$ = pipe(a$)(
    map(v => v.toString()),
    map(v => parseInt(v)),
    map(v => v.toString()),
    map(v => parseInt(v)),
    map(v => v.toString()),
    map(v => parseInt(v)),
    map(v => v.toString()),
    map(v => parseInt(v)),
    map(v => v.toString()),
    // map(v => parseInt(v)),
    // map(v => v.toString()),
  )
  
  b$.subscribe(console.log)
  
  await sleep(100)
  a$.emit(1)
  
  await sleep(100)
  a$.emit(2)
  
  await sleep(100)
  a$.emit(3)
}()
