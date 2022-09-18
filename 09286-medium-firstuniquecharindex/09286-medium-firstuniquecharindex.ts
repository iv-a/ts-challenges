// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  R extends string[] = []
> = 
  T extends `${infer First}${infer Rest}`
    ? First extends R[number]
      ? FirstUniqueCharIndex<Rest, [...R, First]>
      : Rest extends `${string}${First}${string}`
        ? FirstUniqueCharIndex<Rest, [...R, First]>
        : R['length']
    : -1;
