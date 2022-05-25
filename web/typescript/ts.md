# 前言：环境搭建

## 1、安装

```
npm install typescript -g //tsc -v
```

## 2、运行

```
tsc file_name.ts
```

## 3、nodejs 环境执行ts

```
npm i @types/node --save-dev （node环境支持的依赖必装）
npm i ts-node --g // ts-node -v
ts-node file_name.ts
```



# 一、类型

## 1、string

```ts
let a: string = '123'
//普通声明
 
//也可以使用es6的字符串模板
let str: string = `dddd${a}`
```

## 2、number

```ts
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```

## 3、boolean

```ts
let createdBoolean: boolean = new Boolean(1)
//这样会报错 应为事实上 new Boolean() 返回的是一个 Boolean 对象 

let createdBoolean: Boolean = new Boolean(1)

let booleand: boolean = true //可以直接使用布尔值
let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
```

## 4、void

 `void` 类型的用法，主要是用在我们**不希望**调用者关心函数返回值的情况下，比如通常的**异步回调函数** 

```ts
function voidFn(): void {
    console.log('test void')
}
```

```ts
let u: void = undefined
let n: void = null;
```

## 5.null和undefined类型

```ts
let u: undefined = undefined;//定义undefined
let n: null = null;//定义null

```

> ### void 和 undefined 和 null 的区别

`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 string 类型的变量：

```ts
//这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"
 
num2 = test
```

```ts
//这样是没问题的
let test: null = null
let num2: string = "1"
 
num2 = test
 
//或者这样的
let test: undefined = undefined
let num2: string = "1"
 
num2 = test
```

## TIPS 注意：

如果你配置了tsconfig.json 开启了严格模式 

```json
{
    "compilerOptions":{
        "strict": true //null 不能 赋予 void 类型
    }
}
```

## 6、Any 类型 和 unknown 顶级类型

没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型

```ts
let anys:any = 123
anys = '123'
anys = true
```

 声明变量的时候没有指定任意类型默认为any

```ts
let anys;
anys = '123'
anys = true
```

TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown, 当你要使用any 的时候可以尝试使用unknow 

```ts
//unknown 可以定义任何类型的值
let value: unknown;
 
value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK
 
//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names
 
//这样就没问题 any类型是可以的
let names:any = '123'
let names2:string = names   
 
//unknown可赋值对象只有unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'
 
aaa = bbb
```

```ts
如果是any类型在对象没有这个属性的时候还在获取是不会报错的
let obj:any = {b:1}
obj.a
 
 
如果是unknow 是不能调用属性和方法
let obj:unknown = {b:1,ccc:():number=>213}
obj.b
obj.ccc()
```

## 7、接口

```ts
//这样写是会报错的 因为我们在person定义了a，b但是对象里面缺少b属性
//使用接口约束的时候不能多一个属性也不能少一个属性
//必须与接口保持一致
interface Person {
    b:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}

```

> 继承

```ts
//重名interface  可以合并
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}

interface A{
    name:string
}
//继承
interface B extends A{
    age:number
}
 
let obj:B = {
    age:18,
    name:"string"
}
```

可选属性 使用?操作符

```ts
//可选属性的含义是该属性可以不存在
//所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}
```

任意属性 [propName: string]

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts
//在这个例子当中我们看到接口中并没有定义C但是并没有报错
//应为我们定义了[propName: string]: any;
//允许添加新的任意属性
interface Person {
    b?:string,
    a:string,
    [propName: string]: any;
}
 
const person:Person  = {
    a:"213",
    c:"123"
}
```

只读属性 readonly

readonly 只读属性是不允许被赋值的只能读取

```ts
//这样写是会报错的
//应为a是只读的不允许重新赋值
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
}
 
const person: Person = {
    a: "213",
    c: "123"
}
 
person.a = 123
```

添加函数

```ts
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
    cb():void
}
 
const person: Person = {
    a: "213",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}
```

## 8、函数

 在 [TypeScript](https://www.tslang.cn/docs/handbook/functions.html) 里，我们可以通过 function 字面量和箭头函数的形式定义函数，如下所示： 

```ts
function add() {}
const add = () => {}
```

 显式指定函数参数和返回值的类型 

```ts
const add = (a: number, b: number): number => {
  return a + b;
}
```

### 返回值类型

-  在 JavaScript 中，如果一个函数可以没有显式 return，此时函数的返回值是 undefined： 
-  在 TypeScript 中，如果我们显式声明函数的返回值类型为 undfined，会报错 
-  正确的做法是使用void 类型来表示函数没有返回值的类型

我们可以使用类似定义[箭头函数](https://so.csdn.net/so/search?q=箭头函数&spm=1001.2101.3001.7020)的语法来表示**函数类型的参数**和**返回值类型**，此时 `=>` 仅仅用来定义一个函数类型而不是实现这个函数。

需要注意的是，这里的 `=>`与 ES6 中箭头函数的 `=>` 有所不同。TypeScript 函数类型中的 `=>` 用来表示**函数的定义**，其左侧是函数的**参数类型**，右侧是函数的**返回值类型**；而 ES6 中的 `=>` 是函数的实现。

如下示例中，先定义了一个函数类型（这里使用了类型别名 type），并且使用箭头函数实现了这个类型：

```ts
type Adder = (a: number, b: number) => number; // TypeScript 函数类型定义
const add: Adder = (a, b) => a + b; // ES6 箭头函数
```

 在对象中，除了使用这种声明语法，我们还可以使用类似对象属性的简写语法来声明函数类型的属性 

```ts
interface Entity {
  add: (a: number, b: number) => number;
  del(a: number, b: number): number;
}
const entity: Entity = {
  add: (a, b) => a + b,
  del(a, b) {
    return a - b
  }
};
```

返回值类型可缺省、可推断：函数返回值的类型可以在 TypeScript 中被推断出来，即可缺省 

### 参数类型

可选参数和默认参数

 我们在类型标注的 `:` 前添加 `?` 表示 func 函数的参数 x 是可缺省的

```ts
function func(x?: string = '?') {
  return x;
}
func(); // undefined
func('777'); // 777

```

 剩余参数 

```
function sum(...nums: (number | string)[]): number {
  return nums.reduce<number>((a, b) => a + Number(b), 0);
}
sum(1, '2'); // 3
```

### this

 在 TypeScript 中，我们需要在函数的第一个参数中声明 this 指代的对象（即函数被调用的方式）即可，比如最简单的作为对象的方法的 this 指向

```ts
function func(this: Window, name: string) {
  console.log(this.name);
}
window.func = func;
window.func('hello');
const obj = {
  func
};
obj.func('hello'); // error TS2684: The 'this' context of type '{ func: (this: Window, name: string) => void; }' is not assignable to method's 'this' of type 'Window'.

```

### 函数重载

```ts
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;
function convert(x: string | number | null): any {
  if (typeof x === 'string') {
      return Number(x);
  }
  if (typeof x === 'number') {
      return String(x);
  }
  return -1;
}
const x1 = convert('1'); // => number
const x2 = convert(1); // => string
const x3 = convert(null); // -1

```

### 类型谓词（is）

```ts
function isString(s: unknown): s is string {
  return typeof s === 'string';
}
function isNumber(n: number) {
  return typeof n === 'number';
}
function func(x: unknown) {
  if (isString(x)) {...} // 没问题
  if (isNumber(x)) {...} // error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'number'.
}
```

在上述代码中，在添加返回值类型的地方，通过“参数名 + is + 类型”的格式明确表明了参数的类型，进而引起**类型缩小**，所以类型谓词函数的一个重要的应用场景是**实现自定义类型守卫** 