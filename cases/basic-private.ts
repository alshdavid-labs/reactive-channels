import { counter } from "../src"

const numbers = counter(100)

void async function(){
  for (const number of numbers) {
    console.log(await number)
    if (await number === 5) {
      break
    }
  }
}()

void async function(){
  for (const number of numbers) {
    console.log(await number)
    if (await number === 10) {
      break
    }
  }
}()
