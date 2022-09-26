// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
namespace RLE {
  type FormatRunLength<T extends unknown[]> =
    T['length'] extends 0 | 1
      ? ""
      : T['length'];

  export type Encode<
    S extends string,
    C extends string[] = [],
    R extends string = ''
  > = 
    S extends `${infer H}${infer T}`
      ? C[0] extends H | undefined
        ? Encode<T, [...C, H], R>
        : Encode<S, [], `${R}${FormatRunLength<C>}${C[0]}`>
      : `${R}${FormatRunLength<C>}${C[0]}`;

  type RepeatNTimes<
    N extends number,
    S extends string,
    C extends unknown[] = [],
    R extends string = ''
  > = 
    C['length'] extends N 
      ? R
      : RepeatNTimes<N, S, [...C, ''], `${R}${S}`>

  export type Decode<
    S extends string,
    R extends string = ''
  > = 
    S extends `${infer Num extends number}${infer Sym}${infer Rest}`
      ? Decode<Rest, `${R}${RepeatNTimes<Num, Sym>}`>
      : S extends `${infer Sym}${infer Rest}`
        ? Decode<Rest, `${R}${Sym}`>
        : R;
}
