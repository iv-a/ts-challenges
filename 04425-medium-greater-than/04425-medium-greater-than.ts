// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============
type Number2String<N extends number> = `${N}`;

type String2Array<
  S extends string, 
  R extends string[] = []
> =
  S extends `${infer First}${infer Rest}`
    ? String2Array<Rest, [...R, First]>
    : R;

type Number2Array<N extends number> =
  String2Array<Number2String<N>>;

type UnShift<A extends unknown[]> = 
  A extends [unknown, ...infer Rest] 
    ? Rest
    : A

type GreaterThanByDigits<
  A extends number, 
  B extends number,
  R extends unknown[] = [],
> = 
  R['length'] extends A
    ? false
    : R['length'] extends B
      ? true
      : GreaterThanByDigits<A, B, [...R, '']>;

type ParseInt<S extends string> = 
  S extends `${infer N extends number}` 
    ? N
    : 0;

type GreaterThanByArrays<
  A extends string[],
  B extends string[],
> = 
  A['length'] extends 0 
  ? false
  : A[0] extends B[0] 
    ? GreaterThanByArrays<UnShift<A>, UnShift<B>>
    : GreaterThanByDigits<ParseInt<A[0]>, ParseInt<B[0]>>;

type t1 = GreaterThanByArrays<['4', '3'], ['4', '4']>

type GreaterThan<
  A extends number, 
  B extends number,
  ArrFromA extends string[] = Number2Array<A>,
  ArrFromB extends string[] = Number2Array<B>
> = 
  A extends B 
    ? false
    : ArrFromA['length'] extends ArrFromB['length']
      ? GreaterThanByArrays<ArrFromA, ArrFromB>
      : GreaterThan<ArrFromA['length'], ArrFromB['length']>
  ;

