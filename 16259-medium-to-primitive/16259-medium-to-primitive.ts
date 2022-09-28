// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
// Solution 1
{
  type ToPrimitive<T> = 
  T extends number
    ? number
    : T extends string
      ? string
      : T extends boolean
        ? boolean
        : T extends symbol
          ? symbol
          : T extends bigint
            ? bigint
            : T extends null
              ? null
              : T extends undefined
                ? undefined
                : T extends Function
                  ? Function
                  : T extends object
                    ? { [K in keyof T]: ToPrimitive<T[K]>}
                    : never;
}

// Solution 2
// {
  type ToPrimitive<T> = 
    T extends object 
      ? T extends (...args: never[]) => unknown 
        ? Function
        : { [K in keyof T]: ToPrimitive<T[K]> }
      : T extends { valueOf: () => infer P }
        ? P
        : T;
// }

type tt1 = ToPrimitive<PersonInfo>
type tt2 = 12['valueOf']