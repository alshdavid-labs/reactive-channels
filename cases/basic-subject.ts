import { Subject } from '../src'

const target$ = new Subject()

target$.subscribe(console.log)

target$.next(1)
target$.next(2)
target$.next(3)
target$.next(4)