// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type Number2String<
  N extends number
> = 
  `${N}`;

type String2Array<
  S extends string
> =
  S extends `${infer F}${infer R}`
    ? [F, ...String2Array<R>]
    : [];

type Number2Array<
  N extends number
> = 
  String2Array<Number2String<N>>;

type ParseInt<
  S extends string
> = 
  S extends `${infer N extends number}`
    ? N
    : 0;

type Unshift<
  T extends unknown[]
> = 
  T extends [unknown, ...infer R]
    ? R
    : T;

type GreaterThanByDigit<
  A extends string,
  B extends string,
  C extends unknown[] = [],
  NA extends number = ParseInt<A>,
  NB extends number = ParseInt<B>,
> = 
  C['length'] extends NA
    ? false
    : C['length'] extends NB
      ? true
      : GreaterThanByDigit<A, B, [...C, ''], NA, NB>;

type GreaterThanByArrays<
  A extends string[],
  B extends string[],
> = 
  A['length'] extends 0
    ? false
    : A[0] extends B[0]
      ? GreaterThanByArrays<Unshift<A>, Unshift<B>>
      : GreaterThanByDigit<A[0], B[0]>;

type GreaterThan<
  A extends number,
  B extends number,
  ArrA extends string[] = Number2Array<A>,
  ArrB extends string[] = Number2Array<B>,
> = 
  A extends B
    ? false
    : ArrA['length'] extends ArrB['length']
      ? GreaterThanByArrays<ArrA, ArrB>
      : GreaterThan<ArrA['length'], ArrB['length']>

type Maximum<
  T extends number[],
  M extends number =  T extends [] ? never : T[0]
> = 
  T extends [infer F extends number, ...infer R extends number[]]
    ? GreaterThan<F, M> extends true 
      ? Maximum<R, F>
      : Maximum<R, M>
    : M
