import { Channel } from "../src"
import { pipe, first, filter, map } from "../src/operators"
import { sleep } from "./lib/sleep"

void async function(){
  const a$ = new Channel<number>()

  const b$ = pipe(a$)(
    map(v => v + 1),
    filter(v => v === 4),
    first()
  )
  
  void async function(){
    for (const value of b$) {
      console.log(await value)
    }
  }()
  
  await sleep(100)
  a$.emit(1)
  
  await sleep(100)
  a$.emit(2)
  
  await sleep(100)
  a$.emit(3)
}()