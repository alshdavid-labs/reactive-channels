import { Channel } from "../src"
import { sleep } from "./lib/sleep"

void async function(){
  const chann = new Channel<number>()

  void async function(){
    for (const value of chann) {
      console.log(await value)
      if (await value === 2) {
        break
      }
    }
  }()

  await sleep(100)
  chann.emit(1)

  await sleep(100)
  chann.emit(2)

  await sleep(100)
  chann.emit(3)
}()
