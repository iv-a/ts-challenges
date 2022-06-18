// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
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


type t1 = CamelCase<'foo_bar_$'>
type t3 = CamelCase<'foo__bar_$'>
// type t1 = Capitalize<Lowercase<'HSsss'>>
type t2 = CamelCase<'HELLO_WORLD_WITH_TYPES'>