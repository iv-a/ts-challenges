// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type CamelCase<S extends string> = 
  S extends Lowercase<S>
    ? S extends `${infer H}_${infer FT}${infer T}`
      ? FT extends '_'
        ? `${H}${FT}${CamelCase<`_${T}`>}`
        : `${H}${FT extends Uppercase<FT> ? `_${FT}` : Uppercase<FT>}${CamelCase<T>}`
      : S
    : CamelCase<Lowercase<S>>;

type Camelize<T> = 
  T extends Record<string, unknown>
    ? {
        [K in keyof T as CamelCase<K & string>]: Camelize<T[K]>
      }
    : T extends unknown[] 
      ? {
          [K in keyof T]: Camelize<T[K]>
        }
      : T

type tt1 = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>