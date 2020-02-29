import { Subject } from "../src"
import { pipe, first, filter, map } from "../src/operators"
import { sleep } from "./lib/sleep"

console.log('ok')

void async function(){
  const a$ = new Subject<number>()
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
  a$.next(1)
  
  await sleep(100)
  a$.next(2)
  
  await sleep(100)
  a$.next(3)
}()
