export const sleep = (dur: number) => new Promise<void>(res => setTimeout(res, dur))
