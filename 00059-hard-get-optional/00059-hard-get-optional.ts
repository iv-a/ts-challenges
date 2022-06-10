// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]


// ============= Your Code Here =============
type GetOptional<
  T extends object,
  U extends Required<T> = Required<T>
> = {
  [K in keyof T as T[K] extends U[K] ? never : K]: U[K]
};