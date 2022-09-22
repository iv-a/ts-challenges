// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============
// type FindEles<
//   T extends any[],
//   U extends unknown[] = [],
//   R extends unknown[] = [],
// > = 
//   T extends [infer First, ...infer Rest]
//     ? First extends U[number] 
//       ? FindEles<Rest, U, R>
//       : First extends Rest[number] 
//         ? FindEles<Rest, [...U, First], R>
//         : FindEles<Rest, [...U, First], [...R, First]>
//     : R;

type FindEles<
  T extends any[],
  U extends unknown = never,
> = 
  T extends [infer First, ...infer Rest]
    ? First extends U
      ? FindEles<Rest, U>
      : First extends Rest[number]
        ? FindEles<Rest, U | First>
        : [First, ...FindEles<Rest, U | First>]
    : [];
