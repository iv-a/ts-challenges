// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]


// ============= Your Code Here =============
type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}
{
// Solution 1
type RemoveDuplicates<S extends string> = 
  S extends `${infer H}%%${infer T}` 
    ? RemoveDuplicates<`${H}${T}`>
    : S;

type ParsePrintFormat<
  S extends string,
  R extends string[] = []
> = 
  RemoveDuplicates<S> extends `${string}%${infer T}`
    ? T extends `${infer F extends keyof ControlsMap}${infer Res}`
      ? ParsePrintFormat<Res, [...R, ControlsMap[F]]>
      : ParsePrintFormat<T, R>
    : R;
}

// Solution 2
type ParsePrintFormat<
  S extends string
> = 
  S extends `${string}%${infer K extends keyof ControlsMap}${infer T}`
    ? [ControlsMap[K], ...ParsePrintFormat<T>] 
    : S extends `${string}%${string}${infer T}`
      ? ParsePrintFormat<T>
      : []

