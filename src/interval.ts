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