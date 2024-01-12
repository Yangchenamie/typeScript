

// 联合类型(并集) | 按位或    交叉类型(交集)  & 按位与

interface Person1 {
    handsome: string,
    gender: boolean,
    meta: {
        n: string
    }
}
interface Person2 {
    hight: string,
    gender: boolean,
    meta: {
        n: string
    }
}
/* 有其一就可以 */
type Person3 = Person1 | Person2;
/* 都要有 */
type Person4 = Person1 & Person2;

/* let person1:Person3 = {
    hight:'高',
    gender:true
} */

let person4:Person4 = {
    handsome:"帅",
    hight:'高',
    gender:false,
    meta: {
        n: 'q'
    }
}

// type IGender = Person4['gender'];   
type IGender = Person4['meta']['n']  //如果两个类型不同没有交集 &后的结果是never


/* 子类型可以赋予给父类型 (子类型的结构要包含父类型) */
let person5 :Person1 = person4;
let person6 :Person2 = person4;

// 快速扩展属性
let obj = { name: 'zs', age: 18 }
let person: { name: string, age: number, address: string } = obj as typeof obj & { address: string }


function merge<T extends object, K extends object>(obj1: T, obj2: K) {
    return {...obj1, ...obj2}
}
let result = merge(obj, { age: 20, address: "china" })
console.log(result.age);


export { }