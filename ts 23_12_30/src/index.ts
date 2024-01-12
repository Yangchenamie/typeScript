// 类型兼容性

// ts兼容性分成两种  子extends父  结构来考虑

let str: string = "abc";
let obj: { toString(): string };

obj = str; // 结构来考虑 extends object extends {}
type obj1 = typeof obj;
type str1 = typeof str;
type a = str1 extends obj1 ? true : false; // true

// 安全性 ts 主要考虑的就是安全  安全就可以赋值
// obj.toString

// 函数兼容性 （参数和返回值的兼容性）
// 对于函数的兼容性  少的可以赋予给多的  参数少的是子类型
// 返回值要求安全 返回值要求的是子类型

let sum1 = (a: number, b: number) => a + b;
let sum2 = (a: number) => a;

sum1 = sum2;
// sum2 = sum1  // 报错

type Sum1 = typeof sum1;
type Sum2 = typeof sum2;
type x = Sum2 extends Sum1 ? true : false; // true

const forEach = <T>(
  arr: T[],
  callback: (val: T, key: number) => string | number
) => {
  for (let i = 0; i < arr.length; i++) {
    let r = callback(arr[i], i);
  }
};
forEach([1, 2, 3, {}], () => {
  return 100;
});

// 类的兼容性  比较的是实例
class A {
  // private a=1
}
class B {
  // private a=1;
}

const b: B = new A(); // 如果类种的属性 有private 或者 protected 则这两个值不能互相赋值

// 结构化结构  标称结构
/* type BTC = number;
type USDT = number;

const c1:BTC =100;
const c2:USDT = 100;

function money(val:BTC){}
money(c2)  // 这样ts识别不出来错误  因为底层都是number */

/* 优化 */
type withType<T, K> = T & [K];
type BTC = withType<number, "BTC">;
type USDT = withType<number, "USDT">;

const c1 = 100 as BTC;
const c2 = 100 as USDT;

function money(val: BTC) {}
money(c1);
// money(c2)//报错

// 逆变 (在函数参数可以标记儿子传给父亲) 和协变 (可以标记父亲返回儿子)
class Parent {
  car() {}
}
class Child extends Parent {
  house() {}
}
class GrandSon extends Child {
  sleep() {}
}
/* 
    从安全性考虑
    1) 内部调用函数的时候 可以传递 Child 和 GrandSon,但是在使用属性是,只能认为最多的是 Child
    2) 函数的返回值,需要返回子类,因为内部代码在访问属性的时候要保证可以访问到
*/
function fn(callback: (ctr: Child) => Child) {
  let r = callback(new GrandSon());
}
fn((child: Parent): GrandSon => {
  return;
});

type Arg<T> = (arg: T) => void;
type ArgReturn = Arg<Parent> extends Arg<Child> ? true : false; // true  基于函数参数的逆变

type Return<T> = (arg: any) => T;
type ReturnReturn = Return<Child> extends Return<Parent> ? true : false; // true 返回值是协变的

/* 逆变带来的问题 */
interface MyArray<T> {
  //   concat: (...arg: T[]) => T[];
  concat(...args: T[]): T[]; // 这种写法不进行逆变检测,所有在描述对象种的方法时全部采用这种方式
}
/* 子传父 父返子 */
type ParentArr = MyArray<Parent>;
type ChildArr = MyArray<Child>;

let parentArr: ParentArr;
let childArr: ChildArr;

parentArr = childArr;
// childArr = parentArr   // childArr不能赋予给parentArr

// 枚举兼容性
enum E1 {
  a = 1,
}
enum E2 {
  a = 1,
}
let e1: E1.a;
let e2: E2.a;
// e2 = e1; // 两个枚举之间 不能兼容

// 泛型兼容性  如果生成的结果一致 类型就是兼容
type II<T> = { name: T };
type X1 = II<string> extends II<string> ? true : false; // 生成的结果一致即可

// 对象的兼容性,多的属性可以赋予给少的
// 类型层级兼容性: never => 字面量=>基础类型=> 包装类型=>any /unknown

// 子 extends 父  满足即可赋值

// 类型推导的概念
// 1) 赋值推断,根据赋予的值来推断类型
let name = "zs";

// 2) 函数通过左边来推导右边,基于上下文类型来进行自动地推导
// 3) 函数返回值为void 赋予一个函数的时候 意味着不关心返回值
const sum: (a: string) => void = (a) => {
  return a;
};
let result = sum("1");

function fn1(arr: number[], callback: () => void) {
  //这里的void不关心返回值
  callback();
}
fn1([1, 2, 3], () => {
  return [];
});

export {};
