// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type NumberToString<
  N extends number
> = 
  `${N}`;

type StringToArray<
  S extends string
> = 
  S extends `${infer H}${infer T}`
    ? [H, ...StringToArray<T>]
    : [];

type NumberToArray<
  N extends number
> = 
  StringToArray<NumberToString<N>>;

type ParseInt<
  S extends string
> = 
  S extends `${infer N extends number}`
    ? N
    : 0

type Unshift<
  T extends unknown[]
> = 
  T extends [unknown, ...infer Rest]
    ? Rest
    : [];

type GreaterThanByDigits<
  A extends number, 
  B extends number,
  C extends unknown[] = []
> = 
  A extends C['length']
    ? false
    : B extends C['length']
      ? true
      : GreaterThanByDigits<A, B, [...C, '']>;

type GreaterThanByArrays<
  A extends string[],
  B extends string[],
> = 
  A extends []
    ? false
    : A[0] extends B[0]
      ? GreaterThanByArrays<Unshift<A>, Unshift<B>>
      : GreaterThanByDigits<ParseInt<A[0]>, ParseInt<B[0]>>;

type IsNegative<
  N extends number
> = 
  `${N}` extends `-${number}`
    ? true
    : false;

type RemoveSign<
  N extends number
> = 
  `${N}` extends `-${infer R extends number}`
    ? R
    : N;

type Compare<
  A extends number,
  B extends number,
  ArrA extends string[] = NumberToArray<A>,
  ArrB extends string[] = NumberToArray<B>,
> = 
  A extends B
    ? Comparison.Equal
    : ArrA['length'] extends ArrB['length']
      ? GreaterThanByArrays<ArrA, ArrB> extends true
        ? Comparison.Greater
        : Comparison.Lower
      : Compare<ArrA['length'], ArrB['length']>; 

type Comparator<
  A extends number, 
  B extends number
> = 
  A extends B 
    ? Comparison.Equal
    : IsNegative<A> extends true
      ? IsNegative<B> extends true
        ? Compare<RemoveSign<B>, RemoveSign<A>>
        : Comparison.Lower
      : IsNegative<B> extends true
        ? Comparison.Greater
        : Compare<A, B>;