// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]


// ============= Your Code Here =============
type IsNegativeNumber<T extends number, U extends number = T> = 
  number extends T 
    ? never
    : U extends U
      ? [T] extends [U]
        ? `${U}` extends `-${infer N}`
          ? true
          : false
        : never
      : never;