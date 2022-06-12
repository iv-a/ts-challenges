// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]


// ============= Your Code Here =============
// Solution 1
type RequiredKeys<
  T extends object, 
  U extends Required<T> = Required<T>
> = keyof {
  [K in keyof T as T[K] extends U[K] 
    ? K 
    : never]: T[K]
};

{
// Solution 2
type RequiredKeys<
  T extends object, 
  K extends keyof T = keyof T
> = 
  K extends K
    ? T extends Required<Pick<T, K>>
      ? K
      : never
    : never;
}