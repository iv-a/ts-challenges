// ============= Test Cases =============
import type { ExpectExtends, ExpectFalse, ExpectTrue } from './test-utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c'] >>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']>, ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']>>,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>,
]


// ============= Your Code Here =============
type Path<
  T extends object,
  K extends keyof T = keyof T,
  U extends K = K
> = 
  U extends U
    ? T[U] extends object 
      ? [U] | [U, ...Path<T[U]>]
      : [U]
    : never

// type Path<
//   T extends object,
//   K extends keyof T = keyof T,
//   U extends K = K
// > = 
//   U extends U
//     ? [U] | (
//       T[U] extends object 
//         ? [U, ...Path<T[U]>]
//         : never
//         )
//     : never

type t1 = Path<typeof example>