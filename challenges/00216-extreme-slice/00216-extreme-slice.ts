// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]


// ============= Your Code Here =============


// type ArrayFromNegative<
//   T extends unknown[], 
//   N extends number,
//   Include extends boolean = false,
//   C extends unknown[] = Include extends true ? [] : [unknown],
// > = 
//   C['length'] extends N
//     ? T extends [...C, infer R]
//       ? R
//       : T
//     : ArrayFromNegative<T, N, Include, [...C, unknown]>

// type t1 = ArrayFromNegative<[1, 2, 3, 4, 5, 6], 4>


// type t1<
//   A extends unknown[], 
//   B extends unknown[]
// > = 
//   A extends [...B, ...infer Rest] 
//     ? Rest
//     : B
  
// type t11 = t1<[1, 2, 3, 4, 5], [unknown, unknown]>


{
// Solution 1

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

type IsNegative<
  N extends number
> =
  `${N}` extends `-${infer R extends number}`
    ? [R, true]
    : [N, false];

type ArrayFromNegative<
  A extends unknown[],
  Target extends number,
> = 
  IsNegative<Target> extends [infer N extends number, infer isNegative]
    ? isNegative extends true
      ? A extends [...ConstructTuple<N>, ...infer R]
        ? R
        : []
      : ConstructTuple<N>
    : [];

type Slice<
  Arr extends unknown[], 
  Start extends number = 0, 
  End extends number = Arr['length'],
  R extends unknown[] = [],
  C extends unknown[] = [],
  Range = Exclude<keyof ArrayFromNegative<Arr, End>, keyof ArrayFromNegative<Arr, Start>>,
> = 
  Arr['length'] extends C['length']
    ? R
    : `${C['length']}` extends Range
      ? Slice<Arr, Start, End, [...R, Arr[C['length']]], [...C, unknown], Range>
      : Slice<Arr, Start, End, R, [...C, unknown], Range>
}

// Solution 2

type ToPositive<
  Arr extends unknown[],
  N extends number,
> = 
  `${N}` extends `-${infer P extends number}` 
    ? Slice<Arr, P>['length']
    : N;

type GetFirstNElementsOfArray<
  Arr extends unknown[],
  N extends number,
  _Acc extends unknown[] = []
> = 
  _Acc['length'] extends Arr['length'] | N
    ? _Acc
    : GetFirstNElementsOfArray<Arr, N, [..._Acc, Arr[_Acc['length']]]>;

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length']
> = 
  GetFirstNElementsOfArray<Arr, ToPositive<Arr, End>> extends [...GetFirstNElementsOfArray<Arr, ToPositive<Arr, Start>>, ...infer Rest]
    ? Rest
    : [];