// Extract  Exclude  NonNullable....
// 除了基于条件类型之外 还有基于对象类型

interface Person1 {
    handSome: string;
  }
  interface Person2 {
    hight: string;
  }
  
  type IKeys1 = keyof any; // string | number | symbol
  type IKeys2 = keyof unknown; // never
  
  // for(let key in Object.keys(T))
  
  type Compute<T extends object> = {
    [key in keyof T]: T[key];
  };
  
  type Person3 = Compute<Person1 & Person2>;
  
  //  Partial  Required
  
  interface ICompany {
    name: string;
    age: number;
    address: string;
    person: {
      name: string;
      age: number;
    };
  }
  type Partial<T> = {
    [key in keyof T]?: T[key];
  };
  type DeepPartial<T> = {
    [key in keyof T]?: T[key] extends object ? DeepPartial<T[key]> : T[key];
  };
  
  type PartialRes1 = Partial<ICompany>;
  let person1: PartialRes1 = {
    /* 这里只要写了person 就必须要填name和age */
    person: {
      name: "zs",
      age: 18,
    },
  };
  
  type PartialRes2 = DeepPartial<ICompany>;
  let person2: PartialRes2 = {
    person: {},
  };
  
  type Required<T> = {
    [key in keyof T]-?: T[key];
  };
  type DeepRequired<T> = {
    [key in keyof T]-?: T[key] extends object ? Required<T[key]> : T[key];
  };
  // type RequiredRes = Required<ICompany>;
  // type RequiredRes = Required<PartialRes2>; // 加了深度可读 person 里的name和age就可以不填了
  type RequiredRes = DeepRequired<PartialRes2>; 
  let person3: RequiredRes = {
    name: "string",
    age: 18,
    address: "string",
    person: {
      name: "1",
      age: 18,
    },
  };
  
  export {};
  