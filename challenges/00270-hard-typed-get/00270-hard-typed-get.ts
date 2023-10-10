// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}


// ============= Your Code Here =============
type Get<
  T extends object, 
  K extends string
> = 
  K extends keyof T
    ? T[K]
    : K extends `${infer First}.${infer Rest}`
      ? First extends keyof T
        ? T[First] extends object 
          ? Get<T[First], Rest>
          : T[First]
        : never
      : never
      
type Data1 = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
      baz: 'b'
    },
    included: true,
    // 'bar.baz': 'c'
  },
  'foo.baz': false,

  hello: 'world'
}

type t1 = Get<Data1, 'foo.bar.ba'>