// 条件类型  if/else  三元表达式  (extends 左边和右边的关系)

// 子类型 extends 父类型  =true

type StatusCode<T> = T extends 200 | 201 | 204 | 304 ? "success" : "error";
type StatusMessage = StatusCode<200>;

type IObj<T> = T extends { name: "zs" } ? "ok" : "no_ok";
type IPerson = IObj<{}>; // 'no_ok'
type IPerson1 = IObj<{ name: "zs" }>;

/* 
    类型级别
    1) 根据结构的角度来分析
    2) 从类型角度来分析
*/

/* 
    never  是任何类型的子类型
    字面量类型
    基础类型
    包装的类型
    any unknown
*/

type T1 = never extends {} ? true : false;
type T2 = "str" extends string ? true : false;
type T3 = string extends String ? true : false;

// {} object  Object   {}和object 可以看成字面量类型

// {} object 可以堪称结构和类型两部分
type Temp1 = {} extends object ? true : false;
type Temp2 = object extends {} ? true : false;
type Temp3 = {} extends Object ? true : false;
type Temp4 = object extends Object ? true : false;
type Temp5 = Object extends {} ? true : false;
type Temp6 = Object extends object ? true : false; // 因为从结构角度出发

type T4 = string extends object ? true : false; // false

type T5 = string extends any ? true : false;
type T6 = string extends unknown ? true : false;

type T7 = any extends unknown ? true : false;
type T8 = unknown extends any ? true : false;

type T9 = any extends any ? true : false;

/* any 自带分发机制 */
type T10 = any extends 1 ? true : false; // boolean    // (条件类型  是有分发机制的) 1 + 除了1的部分  true | false

/* never如果通过泛型传入，此时只会返回never */
type T11<T> = T extends string ? true : false;
type Temp7 = T11<never>; // never

/* 联合类型的子类型  是联合类型中的某个类型 */
type T12 = 1 extends 1 | 2 ? true : false;
type T13 = 1 | 2 extends 1 | 2 | 3 ? true : false;

/* 通过条件类型 来进行类型的区别 条件语句也可以实现约束的效果 */

interface Fish {
  name: "鱼";
}

interface Bird {
  name: "鸟";
}

interface Water {
  name: "水";
}

interface Sky {
  name: "天";
}

/* 
    分发导致的原因: 
    1、联合类型通过泛型传递
    2、而且比较(extends)的时候会产生分发
    3、类型需要是裸类型(裸类型就是泛型 就自己 没有和别人搭配)

*/

/* T & {} 可以解决分发问题 */
type GetType<T extends Fish | Bird> = T & {} extends Fish ? Water : Sky;
type A1 = GetType<Fish | Bird>;

// type UnionAssets<T, K> = T  extends K ? true : false;
/* 优化 */
type NoDistribute<T> = T & {};
type UnionAssets<T, K> = NoDistribute<T> extends K ? true : false;
type U1 = UnionAssets<1 | 2, 1 | 2 | 3>;
/* 
    1 extends 1|2
    2 extends 1|2
    3 extends 1|2
*/
type U2 = UnionAssets<1 | 2 | 3, 1 | 2>;

/* 判断两个类型是否完全一致 */
// type isEqual<T,K,S,F> = T extends K ? K extends T ? S : F :F;
/* 优化 */
type isEqual<T, K, S, F> = NoDistribute<T> extends K
  ? NoDistribute<K> extends T
    ? S
    : F
  : F;
/* 
    1 extends 1|2    1|2 extends 1
    2 extends 1|2    1|2 extends 2
*/
type A2 = isEqual<1 | 2, 1 | 2, true, false>;

type FormatVal<T> = T extends string
  ? string
  : T extends number
  ? number
  : never;

function sum<T extends string | number>(a: T, b: T): FormatVal<T> {
  return a + (b as any); // 由于不能判断 T + T =T 所以要加上 as any
}
let result = sum(1, 2);

/* 
    内置类型
    内置类型中有很多类型是基于条件类型的
    Extract  Exclude  NonNullable....
*/
type Extract<T, U> = T extends U ? T : never;
type ExtractRes = Extract<1 | 2 | 3 | 4, 1 | 3>;

type Exclude<T, U> = T extends U ? never : T;
type ExcludeRes = Exclude<1 | 2 | 3 | 4, 1 | 3>;

const ele = document.getElementById("app");
// type NonNullable<T> = T extends null | undefined ? never: T;
type NonNullable<T> = T & {};
type Ele = NonNullable<typeof ele>;

export {};
