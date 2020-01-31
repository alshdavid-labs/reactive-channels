import { PrivateChannel } from "../src"

void async function(){
  const chann = new PrivateChannel<number>(emit => {
    let i = -1
    const int = setInterval(() => {
      i++
      emit(i)
    }, 250)
    return () => clearInterval(int)
  })

  for (const value of chann) {
    console.log(await value)
    if (await value === 5) {
      break
    }
  }

  // starts at 0 again
  for (const value of chann) {
    console.log(await value)
    if (await value === 5) {
      break
    }
  }
}()
