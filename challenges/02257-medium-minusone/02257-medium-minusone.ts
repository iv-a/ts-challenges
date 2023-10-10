// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
type ReverseString<S extends string> = 
  S extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : S;
type InternalMinusOne<S extends string> = 
  S extends `${infer First extends number}${infer Rest}` 
    ? First extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][First]}${Rest}`
    : never;
type RemoveLeadingZeros<S extends string> = 
  S extends '0'
    ? S
    : S extends `0${infer Rest}`
      ? `${RemoveLeadingZeros<Rest>}`
      : S;
type ParseInt<S extends string> = 
  S extends `${infer Number extends number}` 
    ? Number
    : never
type MinusOne<T extends number> = 
  T extends 0
    ? -1
    : ParseInt<RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>>;
  

type t1 = ReverseString<'1000'>;
type t2 = InternalMinusOne<ReverseString<'1000'>>;
type t3 = ReverseString<InternalMinusOne<ReverseString<'1000'>>>;
type t4 = RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<'1000'>>>>;
type t5 = ParseInt<RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<'1000'>>>>>;