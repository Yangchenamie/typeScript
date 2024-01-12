
/*
    类: 
    类的组成: 构造函数、属性（实例属性、原型属性、静态属性）、方法（实例的方法、原型方法、静态方法） 访问器、静态相关配置
*/

class Circle {
    // 给类声明属性
    /* public name:string;
    public age:number;
    public fn:()=>void
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
        this.fn = ()=>{}
    } */
    public fn: () => void
    constructor(public name: string, public age: number = 18) {
        this.name = name;
        this.age = age;
        this.fn = () => { }
    }
}
let circle = new Circle('zs', 20)

/* 
    类的修饰符
    public 公开属性 类的实例在外部、类的内部、类的子类都可以访问这个属性
    protected 受保护的属性 自己、儿子都可以访问 外部不能访问
    private 私有属性 只能自己访问
*/

// readonly 标识仅读属性 意味着如果初始化后 不能被修改

class Animal {
    constructor(protected name: string) {
        this.name = name;
    }
    // 原型方法 就是每一个实例共享的方法 父类提供的方法 子类是可以进行方法的重写
    // void 意味着是不关心函数的返回值 并不是空的意思
    changeName(name: string, age: number): void {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    // 原型属性 需要通过访问器来实现   挂在protype
    get aliasName() {
        return '$' + this.name;
    }
    set setName(name: string) {
        this.name = name
    }
    static a = 1;
    static getA() {
        return this.a;
    }
}
// super 在构造函数 指向的是父类   在原型的方法中调用的时候指向的事父类的原型
class Cat extends Animal {
    constructor(name: string, public readonly age: number) {
        super(name)  // Animalcall(this)
        this.age = age
    }
    /* 子类重写父类的方法要兼容 赋予的函数可以兼容父类 */
    changeName(name: string) {
        super.changeName(name, 100)
        this.name = name
        return 'abc'
    }
    /* changeAge(age: number){
        this.age = age;  // 这里会报错 因为age是readonly
    } */
}

let cat = new Cat('cdj', 18)
cat.changeName('yy')
console.log(cat.getName());
console.log(cat.aliasName);
cat.setName = 'll'
console.log(cat.aliasName);
console.log(Animal.a);
console.log(Animal.getA());


/* 以上语法同ES6 */

class Single {
    static instance = new Single();
    protected constructor() { }
    static getInstance() {
        return this.instance
    }
}

// 类在什么时候 不用外面new

// new不了
/* let single = new Single();// 报错 类“Single”的构造函数是受保护的，仅可在类声明中访问。 */
/* let instance = Single.getInstance();
console.log(instance);  // Single {}
instance = 1;  // 这样可以直接修改了 不安全
console.log(instance);  // 1 */


// ts中有抽象概念 abstract 不存在的
// 抽象类 可以含有非抽象方法和属性 
abstract class A {
    public abstract a: string;
    drink() {  // 已经实现了 非抽象方法
        console.log('喝水');
    }
    abstract eat(): void  //抽象方法 父类没有实现 那么子类必须实现
}
class B extends A {
    public a: string = 'a';
    eat(): void {
        console.log('吃饭');
    }
}

export { }