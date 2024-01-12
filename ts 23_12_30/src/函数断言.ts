
// 通过表达式来声明的函数  必须赋予的值要满足定义的类型（要求有一个兼容性在里面）

/* function sum(a,b){
    return a+b;
} */

// 1) 函数类型的定义  (a: any, b: any) => any  |  sum(a: any,b: any):any
// 如果标明函数的类型，在使用函数的时候以标明的为准
/* function sum(a: any,b: any):any{
    return a+b
} */

/* const sum: (a: any, b: any) => any = function (a: number, b: number): number {
    return a + b;
} */

/* // type ISum = (a: any, b: any) =>any;
type ISum = {(a: any, b: any) :any};
const sum: ISum = (a: number, b: number):number=>{
    return a + b;
} */


/* 
    2) 参数 可选参数 ? 可选参数   意味着可以不传 
        string | undefined 必须得传 可选参数只能在参数列表中得后面
*/

type ISum = (a: any, b?: any) => any;
// 这样写 就必须要传才可以  但是加上ISum就可以不用传 不过用到会给undefined
// const sum:ISum = function (a: string, b: string|undefined) {
// 这里不传 但用到会给undefined
// const sum = function (a: string, b?: string) {
const sum: ISum = function (a: string, b: string = 'abc') {  // 后面的类型要是前面定义类型的子类型才可以
    return a + b;
}
// 这里如果是兼容处理 采用得是自己标识得 不是你赋值得类型
console.log(sum('1'));


/* 
    3) 参数this问题
        尽量不采用this作为函数的上下文,this的缺陷就是类型推导问题
        如果想限制this类型 那么需要手动指定this类型
*/
function getValue(this: IPerson, key: IKey) {  // this不是形参 是标明this的类型
    console.log(this[key]);

    return this[key];
}
//  根据值来获得类型 typeof  配合type来声明新的类型
// keyof 可以获取对象中的类型 作为联合类型
const person = { name: 'zs', age: 18 }

type IPerson = typeof person;  // 提取对象的类型为IPerson type类型会提升到顶部
type IKey = keyof IPerson;

// 可以将子类型赋予给父类型
getValue.call(person, 'name')


// 函数中的arguments 不建议使用
/* function add(){
    // arguments是类数组 不能用到数组的方法
    console.log(arguments);
} */
function add(...args: number[]): number {  // (函数式编程 入参和返回值 组合式api)  函数  (不考虑使用this 和 arguments)
    // 手动获得传来的参数 这样args就是一个数组 可以使用数组的方法
    return args.reduce((memo, current) => (memo += current, memo), 0)
}


// 参数的类型直接参数后面: 标识  函数的返回值在{}前面来标识
const up: (...args: any[]) => any = (...args: number[]): number => {
    return;
}



// 重载(类型的重载) 对于强类型语言 可以把一个函数写多遍(参数不同) JS实现重载靠的是arguments
// 入参是一个字符串 或者 是数字  => ['字符串']  ['数字']

function toArray(val: string): string[]
function toArray(val: number): number[]
// 上面声明仅仅是类型上的重载
function toArray(val: number | string): string[] | number[] {
    return []
}
let arr1 = toArray('abc')
let arr2 = toArray(123)


export { }