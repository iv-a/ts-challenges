// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
// type Merge<F extends object, S extends object> = 
// {
//   [Key in keyof F | keyof S]: 
//     Key extends keyof F 
//     ? Key extends keyof S 
//       ? S[Key]
//       : F[Key]
//     : Key extends keyof S
//       ? S[Key]
//       : never
// }

// type Merge<F extends object, S extends object> = 
//   Omit<Omit<F, keyof S> & S, never>


type DistributiveOmit<
  T extends object,
  K extends keyof any
> =
  T extends T 
    ? Omit<T, K>
    : never;

type A = { a: string, b: number, c: boolean };
type B = { b: string, c: number };
type C = { f: string, m: number };

type Merge<
  A extends object,
  B extends object
> =
  Omit<Omit<A, keyof B> & B, never>;

type DistributiveMerge<
  A extends object,
  B extends object
> =
  A extends A
    ? Merge<A, B>
    : never;

type t1 = DistributiveMerge<A | B, C>

const t1: t1 = { a: '', b: 3, c: false, f: '', m: 2 };
const t2: t1 = { b: '3', c: 3, f: '', m: 2 };
type t2 = Omit<A | B, never>

type MA1 = {
  as: 'button' | 'a',
  size: 's' | 'm' | 'l',
  theme: 'light' | 'dark',
};

type M<T extends object> = 
  T extends { as?: infer As | undefined } 
   ? As
   : never

type tm1 = M<MA1>