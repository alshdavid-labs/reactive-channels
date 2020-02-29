export type callback<T = any> = (value: T) => void

export interface Unsubscribable {
  unsubscribe: () => void
}

export interface Subscribable<T> {
  subscribe: (cb: callback<T>) => Unsubscribable
}