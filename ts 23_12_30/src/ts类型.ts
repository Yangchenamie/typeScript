// debugger
const aa:number = 1;
console.log(aa);

/* 
    类型的分类：基础类型、高级类型、内置类型、自定义类型、类型体操
    TS的类型都是在变量后面来写：后面是类型 = 后面是值 （ts语法，不是js对象）
    ts的特点：在编写代码的时候 并不是所有遍历都要添加类型 （ts支持类型推导，根据赋的值来猜测他的类型） 如果猜想的类型是对的不用给类型，如果猜测的不对，或者类型无法正确的推导 自己写类型

    1) ts的目的是什么？从安全的角度来考虑作用（考虑在赋值结果的时候，是否会发生错误）
    2) ts是用来检测类型的，只是提示作用，不是在运行的时候发生的（运行的时候和ts无关,"代码没有被执行"）
    3) 编译ts之后，类型就消失了，不存在类型了 最终生产环境下 可以增添.d.ts 来对js文件增加类型说明


*/



/* 1) string number boolean  */
const name:string = 'string';
const age:number = 18;
const gender:boolean = false;

// 基础类型 包装类型 规范 小写的类型一般用于描述基本类型 大写的用来描述的是实例类型
let s1:string = 'abc';
/* let s2:string = new String('abc') // 这样会报错 */
let s3:String  = 'abc';  // 在赋值的时候 子集可以赋予给父级

/* 
    我们在使用基本类型的时候 需要采用的时候 小写类型来标识
    数组的概念:用于存储多个类型相同的集合
*/

// 类型[] Array<类型> 都可以用于声明数组
let arr1:number[] = [1,2,3,4]
let arr2:Array<number> = [1,2,3,4]
let arr3 :(number|string)[] = [1,'2',3,'4'];

// 数组要求的事存储的格式按照特定类型来存储 不关心位置
// 元组 tuple

// 赋予的值要求得符合这个结构和顺序，元组在新增内容得时候，不能增加额外的类型的值，只能是已有的，而且增加后无法访问
let tuple:[string,number,string,number] = ['1',2,'3',4]

// 已经约定好没有第四个，后续增加的不算，访问的时候也不能访问后增加的 安全问题
let item = tuple[3]
console.log(item);


// 枚举：自带类型的对象(自己有类型，就是一个对象)
// 约定一组格式我们会用枚举 状态码 权限 数据格式 标志位

// 维护一组常量的时候 可以采用枚举

enum STATUS{
    'OK'='ok',
    'NO'=100,
    'NOT_FOUND', // 101
}

const r= STATUS[100]
console.log(r);

// 类型可以进行反举 (值是数字的时候 可以反过来枚举)，枚举没有值会根据上面的所以来自动累加
const num = STATUS['OK']
console.log(num);

// null undefined 基本类型,正常情况下只能赋予给null和undefined
const n:null = null;
const u:undefined = undefined; 

// 非严格模式在关闭的时候 null 和 undefined 可以赋予给任何类型 （null 和 undefined是任何类型的子类型）

/* 
    void 类型代表的是空类型 undefined  void 这个void一般表示函数的返回值
    undefined 可以赋予给void 都代表空 （undefined是void的子类型）

*/

function a():void{
    return undefined
}

// never 永远不 永远到不了的地方是never

// 函数无法执行完毕
function whileTrue ():never {
    while(true){}  // 函数无法达到执行完毕的状态
} 

function throwError():never{
    throw Error() // 出错函数无法执行完毕
}

// 如果if/else 条件都走完了，没有遗漏的 后面的类型就是never (完整性保护)


/* 
111 [1,1,1]
'111' ['1','1','1']
true ['t','r','u','e']
*/
function validateCheck(v:never){}
function toArray(val:number|string|boolean){
    if(typeof val === "number"){
        return val.toString().split("").map(Number)
    }
    if(typeof val === "string"){
        return val.toString().split("")
    }
    if(typeof val === "boolean"){
        return val.toString().split("")
    }
    // never类型 只能被never类型来赋予值
    validateCheck(val) // 代码完整性保护
}
console.log(toArray('ABC'));


// any 任何类型 能不写any 就不要用any any会导致类型丧失检测

let aa1:any = 'string'
aa1 = 1;
aa1 = true

// object 引用类型
function create(val:{}){}

create({})
create(function(){})
create([])


// symbol bigInt 
const symbol:symbol =Symbol();
const bigInt:bigint = BigInt(Number.MAX_SAFE_INTEGER+1)

// string number boolean 数组 元组 枚举 null undefined void never any object symbol bigInt 


// 这样可以保证单独的模块 
export{} // 这是一个单独的模块 不会影响其他模块