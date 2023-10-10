// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
{
// Solution 1
type ToArray<T extends string | number> = 
  `${T}` extends `${infer Head}${infer Tail}`
    ? [Head, ...ToArray<Tail>]
    : [];

type IsPalindrome<
  T extends string | number, 
  A extends string[] = ToArray<T>
> = 
  A extends [infer F, ...infer Rest extends string[], infer L]
    ? F extends L
      ? IsPalindrome<T, Rest>
      : false
    : A['length'] extends 0 | 1
      ? true
      : false;
}

// Solution 2
type IsPalindrome<
  T extends string | number, 
  S extends string = T extends string ? T : `${T}`
> = 
  S extends `${infer F}${infer R}`
    ? R extends ''
      ? true
      : S extends `${F}${infer Rest}${F}`
        ? IsPalindrome<Rest>
        : false
    : true;