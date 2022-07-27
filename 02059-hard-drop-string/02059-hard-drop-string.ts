// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]


// ============= Your Code Here =============
{
// Solution 1
type String2Union<
  S extends string
> = 
  S extends `${infer H}${infer T}`
    ? H | String2Union<T>
    : never;

type DropString<
  S extends string, 
  R extends string,
  U extends string = String2Union<R>
> = 
  S extends `${infer H}${infer T}`
    ? H extends U 
      ? DropString<T, R, U>
      : `${H}${DropString<T, R, U>}`
    : S;
}

// Solution 2
type DropString<
  S extends string, 
  R extends string
> = 
  S extends `${infer H}${infer T}`
    ? R extends `${string}${H}${string}`
      ? DropString<T, R>
      : `${H}${DropString<T, R>}`
    : S;
