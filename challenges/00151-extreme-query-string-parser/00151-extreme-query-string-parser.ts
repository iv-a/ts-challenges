// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type Merge<
  Target extends object, 
  Source extends object
> = {
  [K in keyof Target | keyof Source]: 
    K extends keyof Target 
      ? K extends keyof Source
        ? Target[K] extends unknown[]
          ? Source[K] extends Target[K][number]
            ? Target[K]
            : [...Target[K], Source[K]]
          : Source[K] extends Target[K]
            ? Target[K]
            : [Target[K], Source[K]]
        : Target[K]
      : K extends keyof Source
        ? Source[K]
        : never
};

type GetValue<S extends string> = 
  S extends `${infer K}=${infer V}`
    ? Record<K, V>
    : S extends ''
      ? {}
      :Record<S, true>

type ParseQueryString<
  S extends string, 
  R extends object = {}
> =
  S extends `${infer First}&${infer Rest}`
    ? ParseQueryString<
        Rest,
        Merge<
          R,
          GetValue<First>
        >
      >
    : Merge<R, GetValue<S>>
      

type t1 = ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>;
type t2 = ParseQueryString<'k1=v1&k2'>;
type t3 = ParseQueryString<'k1=v1'>;
type t4 = ParseQueryString<'k1'>;
type t5 = ParseQueryString<''>;
