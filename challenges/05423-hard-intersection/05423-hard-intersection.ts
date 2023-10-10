// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]


// ============= Your Code Here =============
// type Array2Union<T extends unknown[]> = 
type Intersection<
  T extends unknown[]
> = 
  T extends [infer First, ...infer Rest]
    ? First extends unknown[] 
      ? First[number] & Intersection<Rest>
      : First & Intersection<Rest>
    : unknown

type t1 = Intersection<[[1, 2], [2, 3], [2, 2]]>