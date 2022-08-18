// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============
// type BEM<
//   B extends string, 
//   E extends string[], 
//   M extends string[]
// > = 
//   E['length'] extends 0 
//     ? M['length'] extends 0 
//       ? B
//       : `${B}--${M[number]}`
//     : M['length'] extends 0
//       ? `${B}__${E[number]}`
//       : `${B}__${E[number]}--${M[number]}`

type BEM<
  B extends string, 
  E extends string[], 
  M extends string[]
> = 
  `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`