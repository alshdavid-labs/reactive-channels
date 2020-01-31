import { PrivateChannel } from './private-channel'

export const interval = (
  duration: number
) => new PrivateChannel<void>(emit => {
  const int = setInterval(() => emit(), duration)

  return () => {
    console.log('cleared')
    clearInterval(int)
  }
})

export const counter = (
  duration: number,
  starting = -1
) => new PrivateChannel<number>(emit => {
  let i = starting
  const int = setInterval(() => {
    i++
    emit(i)
  }, duration)
  return () => clearInterval(int)
})