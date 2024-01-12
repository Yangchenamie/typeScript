// 接口的返回值可能都是统一的
// code data message
// 泛型的默认值来传递泛型的值默认情况
interface APIResponse<T = any> {
    error: number,
    data: T;
    message?: string
}
interface LoginInfo {
    username: string,
    token: string;
}
// function login():APIResponse<LoginInfo>{
function login(): APIResponse {
    return {
        error: 1,
        data: {
            username: "zs",
            token: "xxx"
        },
        message: 'success'
    }
}
let user = login();


// 在平时开发中使用联合类型
type IUnion<T = boolean> = T | string | number
type t1 = IUnion
type t2 = IUnion<string[] | number[]>


// 在使用泛型的时候 都要添加约束   泛型约束
// 在使用泛型的时候 不能直接做运算的 （无法保证泛型的结果 t+t=t?）

// 约束当前这个类型 T 需要时 string | number
function getVal<T extends string | number>(val: T): T {
    return val;
}
getVal('123')
getVal(123)
// getVal(true)  // 报错 因为类型不满足 string | number

function getLen<T extends { length: number }>(val: T) {
    return val.length;
}
console.log(getLen('123'));
console.log(getLen({ length: 10 }));

// ts只是对类型做校验 对于真正的业务逻辑不关心
function getObjVal<T extends object, K extends keyof T>(target: T, key: K) {
    return target[key]
}
let person = { name: 'zs', age: 18 }
let animal = { name: 'tom', age: 3, address: 'china' }
console.log(getObjVal(person, 'age'));
console.log(getObjVal(animal, "address"));


// 类中的泛型
// 求数组中的最大值
class MyList<T extends string | number = number>{
    private arr: T[] = []
    add(val: T) {
        this.arr.push(val)
    }
    getMax() {
        let max = this.arr[0]
        for (let i = 0; i < this.arr.length; i++) {
            let cur = this.arr[i];
            cur > max ? max = cur : void 0
        }
        return max
    }
}
const list = new MyList<string>
list.add('a')
list.add('b')
list.add('c')
console.log(list.getMax());


const listNum = new MyList
listNum.add(1)
listNum.add(2)
listNum.add(3)
console.log(listNum.getMax());

// 泛型可以使用的场景  函数(参数,返回值)  对象(坑位)  类、泛型的默认值和约束


export { }
