// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============

type UnionReplace<
  T, 
  U extends [unknown, unknown][]
> = 
  U extends [
    infer F extends [unknown, unknown], 
    ...infer R extends [unknown, unknown][]
  ] 
    ? F[0] extends T 
      ? UnionReplace<Exclude<T, F[0]> | F[1], R>
      : UnionReplace<T, R> 
    : T;


type t1= UnionReplace<number | string, [[string, null]]>