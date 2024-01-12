(function () {
    'use strict';

    // 联合类型(并集) | 按位或    交叉类型(交集)  & 按位与
    /* let person1:Person3 = {
        hight:'高',
        gender:true
    } */
    // 快速扩展属性
    let obj = { name: 'zs', age: 18 };
    function merge(obj1, obj2) {
        return { ...obj1, ...obj2 };
    }
    let result = merge(obj, { age: 20, address: "china" });
    console.log(result.age);

})();
//# sourceMappingURL=bundle.js.map
