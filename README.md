# Reactive Channels

Use `async` and `await` to handle streams!

```javascript
import { Channel } from 'reactive-channels'
import { sleep } from "./lib/sleep"

const chan = new Channel<number>()

void async function(){
  for (const value of chan) {
    console.log(await value)
  }
}()

await sleep(100)
chan.emit(1)

await sleep(100)
chan.emit(2)

await sleep(100)
chan.emit(3)
```

### Installation

Easy as pie 3.14

```bash
npm install --save reactive-channels

# Or
# yarn add reactive-channels
```

Easily convert to a promise

```javascript
import { Channel } from 'reactive-channels'
import { sleep } from "./lib/sleep"

const chan = new Channel<number>()

void async function(){
  const value = await chan.toPromise()
  console.log(value)
}()

chan.emit(1)
chan.complete()
```

Includes a few operators to implement reactive style functional programming

```javascript
import { Channel } from 'reactive-channels'
import { pipe, first, filter, map, tap } from "reactive-channels/operators"
import { sleep } from "./lib/sleep"

const a$ = new Channel<number>()

const b$ = pipe(a$)(
  map(v => v + 1),
  filter(v => v === 4),
  tap(console.log),
  first()
)

void async function(){
  for (const value of b$) {
    console.log(await value)
  }
}()

await sleep(100)
a$.emit(1)

await sleep(100)
a$.emit(2)

await sleep(100)
a$.emit(3)
```