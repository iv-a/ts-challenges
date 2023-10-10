// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============
{
// Solution 1
type Split<
  S extends string, 
  R extends string[] = [],
  W extends string = '',
  > = 
  S extends `${infer F}${infer Rest}`
    ? Capitalize<F> extends Uncapitalize<F> 
      ? Split<Rest, [...R, W, F]>
      : Split<Rest, R, `${W}${F}`>
    : [...R, W]

type Array2String<
  T extends string[],
> = 
  T extends [infer F extends string, ...infer R extends string[]]
    ? `${Capitalize<F>}${Array2String<R>}`
    : '';

type CapitalizeWords<S extends string> = 
  Array2String<Split<S>>
}

{
// Solution 2
type CapitalizeWords<
  S extends string, 
  P extends string = ''
> = 
  S extends `${infer F}${infer R}`
    ? F extends Capitalize<F>
      ? F extends Uncapitalize<F>
        ? `${Capitalize<P>}${F}${CapitalizeWords<R>}`
        : CapitalizeWords<R, `${P}${F}`>
      : CapitalizeWords<R, `${P}${F}`>
    : Capitalize<P>
}

// {
// Solution 3
type CapitalizeWords<
  S extends string, 
  P extends string = ''
> = 
  S extends `${infer F}${infer R}`
    ? Capitalize<F> extends Uncapitalize<F>
      ? `${Capitalize<P>}${F}${CapitalizeWords<R>}`
      : CapitalizeWords<R, `${P}${F}`>
    : Capitalize<P>
// }

type t1 = CapitalizeWords<'hello world, my friends'>
type t2 = CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>
