// 类型推断  inference infer  推断
// infer 关键字 只能用在条件类型中  用来提取类型的某一个部分类型 放在不同的位置 就可以帮我们取不同位置的类型

function getUser(name: string, age: number) {
    return { name, age };
  }
  
  type ReturnType<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : any;
  type T1 = ReturnType<typeof getUser>;
  
  type Parameters<T extends (...args: any[]) => any> = T extends (
    ...args: infer P
  ) => any
    ? P
    : never;
  type T2 = Parameters<typeof getUser>;
  
  class Person {
    constructor(public name: string, public age: number) {}
  }
  let person = new Person("zs", 18);
  /* type InstanceType<T extends new (...args: any[]) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R
    : any; */
  type InstanceType<T extends new (...args: any[]) => any> = T extends {
    new (...args: any[]): infer I;
  }
    ? I
    : any;
  type T3 = InstanceType<typeof Person>;
  
  type ConstructorParameters<T extends new (...args: any[]) => any> =
    T extends new (...args: infer P) => any ? P : any;
  type T4 = ConstructorParameters<typeof Person>;
  
  //
  
  type x = ["0", 1, 2, 3, "5"]; //字面量类型
  
  // 实现尾部最后一个放在头部
  type TailToHead<T extends any[]> = T extends [...infer A, infer B]
    ? [B, ...A]
    : any;
  type y = TailToHead<["头", 1, 2, 3, "尾"]>; // ["尾", "头", 1, 2, 3]
  
  /* 将元组转换为联合类型 */
  type ElementOf<T> = T extends Array<infer R> ? R : any; // (string | number | boolean)[]
  type tuple = ElementOf<[string, number, boolean]>;  // string | number | boolean
  export {};
  