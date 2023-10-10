// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]


// ============= Your Code Here =============

type SignParser<S extends string> = 
  S extends `${infer Sign extends '+' | '-'}${infer Rest}` 
    ? [Sign, Rest]
    : ['', S];

type PercentParser<S extends string> = 
  S extends `${infer Rest}%`
    ? [Rest, '%']
    : [S, ''];

type PercentageParser<S extends string> = 
  SignParser<S> extends [infer Sign, infer Rest] 
    ? [Sign, ...PercentParser<Rest extends string 
      ? Rest 
      : never>]
    : never 
  


