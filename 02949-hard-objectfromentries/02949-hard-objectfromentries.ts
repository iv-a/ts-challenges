// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============
{
// Solution 1
type UnionToIntersection<T> = 
  (T extends T
      ? (arg: T) => void
      : never) extends (arg: infer T) => void
        ? T
        : never;

type GetLastFromUnion<U> = 
  UnionToIntersection<
    U extends U
      ? (arg: U) => void
      : never
  > extends (arg: infer Arg) => void
    ? Arg
    : never;

type ObjectFromEntries<
  U, 
  R extends object = {}, 
  L = GetLastFromUnion<U>
> = 
  [U] extends [never]
    ? Omit<R, never>
    : L extends [infer Key, infer Type]
      ? ObjectFromEntries<Exclude<U, L>, R & { [K in Key & string]: Type} >
      : ObjectFromEntries<Exclude<U, L>, R>
}

// Solution 2
type ObjectFromEntries<U extends [string, unknown]> ={ 
  [K in U as K[0]]: K[1]
}
type t1 = ObjectFromEntries<ModelEntries>