// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]


// ============= Your Code Here =============
type _0_9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type _1_9 = Exclude<_0_9, 0>
type _0_8 = Exclude<_0_9, 9>
type D28 = `0${_1_9}` | `1${_0_9}` | `2${_0_8}`;
type D30 = `0${_1_9}` | `1${_0_9}` | `2${_0_9}` | `30`;
type D31 = D30 | '31';
type M30 = `${'04' | '06' | '09' | '11'}${D30}`;
type M31 = `${'01' | '03' | '05' | '07' | '08' | '10' | '12'}${D31}`;
type M28  =`02${D28}`;

type ValidDate<T extends string> = 
  T extends M28 | M30 | M31
    ? true
    : false;
