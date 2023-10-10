// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
type BinaryToDecimal<
  S extends string,
  R extends unknown[] = [],
> = 
  S extends `${infer H extends '1' | '0'}${infer T}`
    ? BinaryToDecimal<
        T,
        [ 
          ...R, 
          ...R,
          ...(H extends '1' 
            ? [''] 
            : [])
        ] 
      >
    : R['length'];
