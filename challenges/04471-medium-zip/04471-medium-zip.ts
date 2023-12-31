// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]


// ============= Your Code Here =============
type UnShift<Arr extends unknown[]> = 
  Arr extends [unknown, ...infer Rest] 
    ? Rest
    : [];

// type Zip<
//   T extends readonly unknown[], 
//   U extends readonly unknown[],
//   R extends unknown[] = []
// > = 
//   R['length'] extends T['length'] 
//     ? R
//     : R['length'] extends U['length']
//       ? R
//       : Zip<T, U, [...R, [T[R['length']], U[R['length']]]]>

type Zip<
  T extends readonly unknown[], 
  U extends readonly unknown[],
  R extends unknown[] = []
> = 
  R['length'] extends T['length'] | U['length']
    ? R
    : Zip<T, U, [...R, [T[R['length']], U[R['length']]]]>;