// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = 
  T extends object
    ? T extends unknown[]
      ? {
          [K in keyof T]: 
            CapitalizeNestObjectKeys<T[K]>
        }
      : {
          [K in keyof T as Capitalize<K & string>]:
            CapitalizeNestObjectKeys<T[K]>
        }
    : T

type t1 = CapitalizeNestObjectKeys<foo>
type t2 = CapitalizeNestObjectKeys<[ 'a', 'b', { a: string}]>