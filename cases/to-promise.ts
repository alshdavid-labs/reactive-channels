import { Channel } from "../src"
import { sleep } from "./lib/sleep"

void async function(){
  const a$ = new Channel<number>()

  void async function(){
    const value = await a$.toPromise()
    console.log('complete', value)
  }()

  await sleep(100)
  a$.emit(1)

  await sleep(100)
  a$.emit(2)

  await sleep(100)
  a$.complete()
}()
