// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


// ============= Your Code Here =============
// type Diff<O, O1> = Omit<Omit<O, keyof O1> & Omit <O1, keyof O>, never>

type Diff<A, B> = {
  [K in keyof (A & B) as K extends keyof (A | B) ? never : K]: (A & B)[K];
}