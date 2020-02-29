import { Subject } from "../src"
import { pipe, first } from "../src/operators"
import { sleep } from "./lib/sleep"

void async function(){
  const a$ = new Subject<number>()
  a$.subscribe(v => console.log('a$ | stream  |', v))

  const b$ = pipe(a$)(first())
  
  b$.subscribe(v => console.log('b$ | stream  |', v))
  b$.toPromise().then(v => console.log('b$ | promise |', v))
  
  await sleep(100)
  a$.next(1)
  
  await sleep(100)
  a$.next(2)
  
  await sleep(100)
  a$.next(3)
}()
