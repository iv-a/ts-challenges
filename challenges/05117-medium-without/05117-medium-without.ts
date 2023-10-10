// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============

type Unionize<T> = 
  T extends object 
    ? T[keyof T] 
    : T;

type Without<
  T extends unknown[], 
  K extends unknown | unknown[], 
  U extends unknown = Unionize<K>
> = 
  T extends [infer First, ...infer Rest]
    ? First extends U
      ? Without<Rest, K, U>
      : [First, ...Without<Rest, K, U>]
    : T;