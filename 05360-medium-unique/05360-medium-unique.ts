// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]


// ============= Your Code Here =============

type IsEqual<A, B> = 
  (<G>() => G extends A ? 1 : 2) extends 
    (<G>() => G extends B ? 1 : 2)
      ? true
      : false;

type Includes<
  A extends unknown[],
  V
> = 
  A extends [infer F, ...infer Rest]
    ? IsEqual<F, V> extends true 
      ? true
      : Includes<Rest, V>
    : false;

type Unique<
  T extends unknown[],
  R extends unknown[] = []
> = 
  T extends [infer First, ...infer Rest]
    ? Includes<R, First> extends true
      ? Unique<Rest, R>
      : Unique<Rest, [...R, First]>
    : R;

