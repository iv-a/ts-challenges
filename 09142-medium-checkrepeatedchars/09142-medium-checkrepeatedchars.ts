// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]


// ============= Your Code Here =============
type CheckRepeatedChars<
  T extends string,
  U extends string = never
> = 
  T extends `${infer First}${infer Rest}`
    ? First extends U 
      ? true
      : CheckRepeatedChars<Rest, U | First>
    : false

// type CheckRepeatedChars<
//   T extends string,
// > = 
//   T extends `${infer First}${infer Rest}`
//     ? Rest extends `${string}${First}${string}`
//       ? true
//       : CheckRepeatedChars<Rest>
//     : false;