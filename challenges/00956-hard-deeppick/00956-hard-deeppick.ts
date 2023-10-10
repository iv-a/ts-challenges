// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============
type Get<
  O extends object,
  K extends string,
> = 
  K extends `${infer H}.${infer T}`
    ? H extends keyof O
      ? {
          [Key in H]: O[Key] extends object 
            ? Get<O[Key], T>
            : never 
        }
      : never
    : K extends keyof O
      ? {
          [Key in K]: O[K]
        }
      : never

type Union2Intersection<U> =
  (
    U extends U
      ? (arg: U) => void 
      : never
  ) extends (arg: infer R) => void
    ? R
    : never;

type DeepPick<
  O extends object,
  K extends string,
> = 
  Union2Intersection<Get<O, K>>

