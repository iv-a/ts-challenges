// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]


// ============= Your Code Here =============
type GetArray<
  Length extends number, 
  Arr extends unknown[] = []
> = 
  Arr['length'] extends Length
    ? Arr
    : GetArray<Length, [...Arr, '']>;



type GetToFillIndexes<
  S extends number, 
  E extends number,
  F extends unknown[] = GetArray<S>,
  L extends unknown[] = GetArray<E>
> = Exclude<keyof L, keyof F>

type Fill<
  T extends unknown[],
  N extends unknown,
  Start extends number = 0,
  End extends number = T['length']
> = {
  [K in keyof T]: K extends GetToFillIndexes<Start, End>
    ? N
    : T[K]
};
