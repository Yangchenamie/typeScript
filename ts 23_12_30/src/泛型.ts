// 泛型可以用于 函数、接口、类、type
// 如果在使用的时候 无法确定当时的类型 可以采用反省来定义
const createArr = <T>(items: number, val: T): T[] => {
    /* const arr =[]
    for(let i=0;i<items;i++){
        arr.push(val)
    }
    return arr */
    return Array.from({ length: items }).fill(val) as T[];
}
console.log(createArr(3, 'abc'));
console.log(createArr(3, 123));


// 写辅助函数的函数的时候可以写 多个泛型用于保存值
// 值的交换
function swap<T, K>(tuple: [T, K]): [K, T] {
    return [tuple[1], tuple[0]]
}
const r = swap(['1', 2])
console.log(r);


// IForEach<T> 表示使用接口的时候确定类型
// <T>():void 在使用这个函数的函数传入类型
/* interface IForEach {
    <T>(arr: T[], callback: (val: T) => void): void
}
 */


type ICallback<T> = (val: T) => void  // 在这个定义中，泛型 T 是直接应用于整个类型别名 ICallback 的。这表示在使用 ICallback 类型时，你必须提供具体的类型参数，如 ICallback<number> 或 ICallback<string>。
type IForEach = <T>(arr: T[], callback: ICallback<T>) => void
const forEach: IForEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i])
    }
}

/* 错误写法 泛型的使用需要能正常推导，但是内部的callback没有真正的指向 所以还认为arr:[]  这样不能保证泛型类型一致*/
/* type ICallback = <T> (val: T) => void  //在这个定义中，泛型 <T> 是仅在函数类型内部起作用的，而不是应用于整个类型别名 ICallback。这意味着在使用 ICallback 类型时，你不必提供具体的类型参数，而是在使用函数时提供。
type IForEach = <T>(arr: T[], callback: ICallback) => void
const forEach: IForEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i])
    }
}
 */

// 使用函数才传递的类型 而不是定义接口的时候传递类型
forEach(['1', 2, 3], item => {
    console.log(item);

})


export { }