// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
  Enum<typeof OperatingSystem>,
  {
    readonly MacOS: 'macOS'
    readonly Windows: 'Windows'
    readonly Linux: 'Linux'
  }
  >>,
  Expect<Equal<
  Enum<typeof OperatingSystem, true>,
  {
    readonly MacOS: 0
    readonly Windows: 1
    readonly Linux: 2
  }
  >>,
  Expect<Equal<
  Enum<typeof Command>,
  {
    readonly Echo: 'echo'
    readonly Grep: 'grep'
    readonly Sed: 'sed'
    readonly Awk: 'awk'
    readonly Cut: 'cut'
    readonly Uniq: 'uniq'
    readonly Head: 'head'
    readonly Tail: 'tail'
    readonly Xargs: 'xargs'
    readonly Shift: 'shift'
  }
  >>,
  Expect<Equal<
  Enum<typeof Command, true>,
  {
    readonly Echo: 0
    readonly Grep: 1
    readonly Sed: 2
    readonly Awk: 3
    readonly Cut: 4
    readonly Uniq: 5
    readonly Head: 6
    readonly Tail: 7
    readonly Xargs: 8
    readonly Shift: 9
  }
  >>,
]


// ============= Your Code Here =============

type ParseInt<S extends string | number> = 
  S extends `${infer N extends number}`
    ? N
    : never;

type Enum<
  T extends readonly string[], 
  N extends boolean = false,
> = {
    readonly [
      K in keyof T as T[K] extends string 
        ? Capitalize<T[K]> 
        : never
    ]: 
        N extends true 
          ? ParseInt<K> 
          : T[ParseInt<K>]
  }
  

type t1 = keyof typeof OperatingSystem
type t2 = Enum<typeof OperatingSystem, true>
type t3 = Enum<typeof OperatingSystem>