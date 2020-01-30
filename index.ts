import { Channel, PrivateChannel } from "./channel"

const sleep = (dur: number) => new Promise(res => setTimeout(res, dur))

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

// void async function(){
//   const chann = new PrivateChannel<number>(emit => {
//     let i = -1
//     const int = setInterval(() => {
//       i++
//       emit(i)
//     }, 250)
//     return () => clearInterval(int)
//   })

//   for (const value of chann) {
//     console.log(await value)
//     if (await value === 5) {
//       break
//     }
//   }

//   // starts at 0 again
//   for (const value of chann) {
//     console.log(await value)
//     if (await value === 5) {
//       break
//     }
//   }
// }()
