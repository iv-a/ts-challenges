// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]


// ============= Your Code Here =============
type Exp10<T extends unknown[]> = 
  [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

type Tuple<T extends unknown[] = []> = {
  '0': [...Exp10<T>],
  '1': [...Exp10<T>, unknown],
  '2': [...Exp10<T>, unknown, unknown],
  '3': [...Exp10<T>, unknown, unknown, unknown],
  '4': [...Exp10<T>, unknown, unknown, unknown, unknown],
  '5': [...Exp10<T>, unknown, unknown, unknown, unknown, unknown],
  '6': [...Exp10<T>, unknown, unknown, unknown, unknown, unknown, unknown],
  '7': [...Exp10<T>, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
  '8': [...Exp10<T>, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
  '9': [...Exp10<T>, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
}
type ConstructTuple<
  L extends number | string, 
  R extends unknown[] = []
> = 
  `${L}` extends `${infer First}${infer Rest}`
    ? ConstructTuple<Rest, Tuple<R>[keyof Tuple & First]>
    : R;

type TwoSum<
  T extends number[], 
  N extends number,
  U extends number = never,
  A extends unknown[] = ConstructTuple<N>
> = 
  T extends [infer First extends number, ...infer Rest extends number[]]
    ? First extends U
      ? true
      : A extends [...ConstructTuple<First>, ...infer R]
        ? TwoSum<Rest, N, U | R['length']>
        : TwoSum<Rest, N, U, A>
    : false;