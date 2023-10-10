// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
// type FlattenDepth<
//   A extends unknown[], 
//   T extends number = 1,
//   C extends unknown[] = []
// > = 
//   C['length'] extends T 
//     ? A
//     : A extends [infer First, ...infer Rest]
//       ? First extends any[]
//         ? [...FlattenDepth<First, T, [...C, unknown]>, ...FlattenDepth<Rest, T, C>]
//         : [First, ...FlattenDepth<Rest, T, C>]
//       : A

type FlattenDepth<
  A extends unknown[], 
  T extends number = 1,
  C extends unknown[] = []
> = 
  A extends [infer First, ...infer Rest] 
    ? First extends any[]
      ? C['length'] extends T
        ? [First, ...FlattenDepth<Rest, T, C>]
        : [...FlattenDepth<First, T, [...C, unknown]>, ...FlattenDepth<Rest, T, C>]
      : [First, ...FlattenDepth<Rest, T, C>]
    : A
       

   
type tt = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>
