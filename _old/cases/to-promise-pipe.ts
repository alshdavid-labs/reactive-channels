import { Channel } from "../src"
import { pipe, first, map } from "../src/operators"
import { sleep } from "./lib/sleep"

void async function () {
  const a$ = new Channel<number>()

  const b$ = pipe(a$)(
    map(v => v + 1),
    first()
  )

  void async function(){
    for (const value of b$) {
      console.log(await value)
    }
  }()

  void async function () {
    const value = await b$.toPromise()
    console.log('complete', value)
  }()

  await sleep(100)
  a$.emit(1)

  await sleep(100)
  a$.emit(2)

  await sleep(100)
  a$.emit(3)
}()
