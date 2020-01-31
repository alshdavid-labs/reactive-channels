import { PrivateChannel } from './private-channel'

export interface EventAdderRemover<T = any> {
  addEventListener(event: string, cb: (event: T) => void): void
  removeEventListener(event: string, cb: (event: T) => void): void
}

export const fromEvent = (
  target: EventAdderRemover, 
  event: string
) => new PrivateChannel(emit => {
  target.addEventListener(event, emit)
  return () => target.removeEventListener(event, emit)
})
