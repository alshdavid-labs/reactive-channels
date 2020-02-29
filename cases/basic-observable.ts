import { Observable } from '../src'

const target$ = new Observable((next, complete) => {
  let i = 0
  const interval = setInterval(() => {
    if (i === 10) {
      complete()
      return
    }
    i++
    next(i)
  },100)
  return () => clearInterval(interval)
})

target$.subscribe(console.log)

target$.toPromise().then(console.log)