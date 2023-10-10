// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ets-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]


// ============= Your Code Here =============
// type ConstructTuple<
//   L extends number, 
//   R extends unknown[] = []
// > = 
//   R['length'] extends L 
//     ? R
//     : ConstructTuple<L, [...R, unknown]>;

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