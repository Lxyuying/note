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

## 8、数组

声明数组类型

```ts
//类型加中括号
let arr:number[] = [123]
//这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']
//操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
arr.unshift('1')
 
 
var arr: number[] = [1, 2, 3]; //数字类型的数组
var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组
```

使用泛型

```ts
let arr:Array<number> = [1,2,3,4,5]
```

用接口表示数组

```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
//表示：只要索引的类型是数字时，那么值的类型必须是数字。
```

多维数组

```ts
let data:number[][] = [[1,2], [3,4]];
```

arguments类数组

```ts
function Arr(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333)
 
function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
[index: number]: any;
length: number;
callee: Function;
}
```



## 9、函数

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



## 10、类型断言 | 联合类型 | 交叉类型

### 联合类型

```ts
//例如我们的手机号通常是13XXXXXXX 为数字类型 这时候产品说需要支持座机
//所以我们就可以使用联合类型支持座机字符串
let myPhone: number | string  = '010-820'
 
 
//这样写是会报错的应为我们的联合类型只有数字和字符串并没有布尔值
let myPhone: number | string  = true
```

 函数使用联合类型

```ts
const fn = (something:number | boolean):boolean => {
     return !!something
}
```

### 交叉类型

多种类型的集合，联合对象将具有所联合类型的所有成员

```typescript
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

### 类型断言

```
语法：　　值 as 类型　　或　　<类型>值  value as string  <string>value
```

```ts
interface A {
       run: string
}
 
interface B {
       build: string
}
 
const fn = (type: A | B): string => {
       return type.run
}
//这样写是有警告的应为B的接口上面是没有定义run这个属性的
```

```ts
interface A {
       run: string
}
 
interface B {
       build: string
}
 
const fn = (type: A | B): string => {
       return (type as A).run
}
//可以使用类型断言来推断他传入的是A接口的值
```

### 使用any临时断言

```javascript
window.abc = 123
//这样写会报错因为window没有abc这个东西
```

```ts
(window as any).abc = 123
//可以使用any临时断言在 any 类型的变量上，访问任何属性都是允许的。
```

### as const

是对字面值的**断言**，与const直接定义常量是有区别的

如果是普通类型跟直接const 声明是一样的

```ts
const names = '小满'
names = 'aa' //无法修改

let names2 = '小满' as const
names2 = 'aa' //无法修改
```

```ts
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
 
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```



# 二、内置对象

## [ECMAScript](https://so.csdn.net/so/search?q=ECMAScript&spm=1001.2101.3001.7020) 的内置对象

**`Boolean`、`Number`、`string`、`RegExp`、`Date`、`Error`**

```js
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

## DOM 和 BOM 的内置对象

 **`Document`、`HTMLElement`、`Event`、`NodeList` 等** 

```js
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    
});
//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

## Promise

```ts
function promise():Promise<number>{
   return new Promise<number>((resolve,reject)=>{
       resolve(1)
   })
}
 
promise().then(res=>{
    console.log(res)
})
```



# 三、Class类

## 1、定义

 TypeScript不允许直接在constructor 定义变量的 需要在constructor上面先声明 

 如果了定义了变量不用 也会报错 通常是给个默认值 或者 进行赋值 

```ts
class Person {
  name:string
  age:number = 0
  constructor (name:string,age:number) {
    this.name = name
  }
}
```

## 2、类的修饰符

public protected private

 使用public 修饰符 可以让你定义的变量 内部访问 也可以外部访问 如果不写默认就是public

 使用 protected 修饰符 代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问

 使用 private 修饰符 代表定义的变量私有的只能在内部访问 不能在外部访问

## 3、static

 用static 定义的属性 不可以通过this 去访问 只能通过类名去调用 

 如果两个函数都是static 静态的是可以通过this互相调用

## 4、 extends、implements

## 5、抽象类

```ts
abstract class A {
   public name:string
   
}
```



# 四、**Tuple** 元组 

 固定大小的不同类型值的集合 

```ts
let arr:[number,string] = [1,'string']
let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]
```

 对于越界的元素他的类型被限制为 联合类型（就是你在元组中定义的类型）

应用场景 例如定义execl返回的数据

```ts
let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]
```

# 五、枚举

## 1、数字枚举

```ts
// Red = 0 Green = 1 Blue= 2
// 默认就是从0开始的 可以不写值
enum Types{
   Red,
   Green,
   BLue
}
```

## 2.字符串枚举

```ts
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

## 3.异构枚举

```ts
enum Types{
   No = "No",
   Yes = 1,
}
```

## 4.接口枚举

```ts
   enum Types {
      yyds,
      dddd
   }
   interface A {
      red:Types.yyds
   }
 
   let obj:A = {
      red:Types.yyds
   }
```

## 5.const枚举

 let 和 var 都是不允许的声明只能使用const 

大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。 常量枚举通过在枚举上使用 `const`修饰符来定义

const 声明的枚举会被编译成常量

普通声明的枚举编译完后是个对象

```ts
const enum Types{
   No = "No",
   Yes = 1,
}
```

## 6.反向映射

它包含了正向映射（ `name` -> `value`）和反向映射（ `value` -> `name`）

要注意的是 *不会*为字符串枚举成员生成反向映射。

```typescript
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```



# 六、类型推论|类型别名

## 1、类型推论

（1） 声明了一个变量但是没有定义类型 

 [TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论 

 不能够在赋值给别的类型 

（2） 如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型可以进行任何操作 

## 2、类型别名

 type 关键字（可以给一个类型定义一个名字）多用于符合类型 

类型

```ts
type str = string
 
let s:str = "ok"
 
console.log(s);
```

函数

```ts
type str = () => string
 
let s: str = () => "ok"
 
console.log(s);
```

 联合类型 

```ts
type str = string | number
 
let s: str = 123
 
let s2: str = '123'
 
console.log(s,s2);
```

 值

```ts
type value = boolean | 0 | '213'

let s:value = true
//变量s的值  只能是上面value定义的值
```

# 七、never类型

 [TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 将使用 never 类型来表示不应该存在的状态 

```ts
// 返回never的函数必须存在无法达到的终点
 
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}
 
// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}
```

应用场景

```ts
interface A {
    type: "foo"
}
 
interface B {
    type: "bar"
}
type All = A | B ;
function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            break;
        case 'bar':
            break
        default:
            //兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了
            
            const exhaustiveCheck:never = val;
            break
    }
}
```

```ts
interface A {
    type: "foo"
}
 
interface B {
    type: "bar"
}
interface C {
    type: "bizz"
}
type All = A | B | C;
function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            break;
        case 'bar':
            break
        default:
            //兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了
 
            const exhaustiveCheck: never = val;
            break
    }
}
```

 由于任何类型都不能赋值给 `never` 类型的变量，所以当存在进入 `default` 分支的可能性时，TS的类型检查会及时帮我们发现这个问题 

# 八、symbol

 可以传递参做为唯一标识 只支持 string 和 number类型的参数 

```ts
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

Symbol的值是唯一的

```ts
const s1 = Symbol()
const s2 = Symbol()
// s1 === s2 =>false
```

用作对象属性的键

```ts
let sym = Symbol();
 
let obj = {
    [sym]: "value"
};
 
console.log(obj[sym]); // "value"
```

使用symbol定义的属性，是不能通过如下方式遍历拿到的

```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

 如何拿到 

```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

Symbol.iterator 迭代器 和 生成器 for of

 支持遍历大部分类型迭代器 arr nodeList argumetns set map 等 

```ts
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

 测试用例 

```ts
interface Item {
    age: number,
    name: string
}
 
const array: Array<Item> = [{ age: 123, name: "1" }, { age: 123, name: "2" }, { age: 123, name: "3" }]
 
type mapTypes = string | number
const map:Map<mapTypes,mapTypes> = new Map()
 
map.set('1','王爷')
map.set('2','陆北')
 
const obj = {
    aaa:123,
    bbb:456
}
 
let set:Set<number> = new Set([1,2,3,4,5,6])
// let it:Iterator<Item> = array[Symbol.iterator]()
const gen = (erg:any): void => {
    let it: Iterator<any> = erg[Symbol.iterator]()
    let next:any= { done: false }
    while (!next.done) {
        next =  it.next()
        if (!next.done) {
            console.log(next.value)
        }
    }
}
gen(array)
```

```ts
Symbol.hasInstance
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

Symbol.isConcatSpreadable
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

Symbol.iterator
方法，被for-of语句调用。返回对象的默认迭代器。

Symbol.match
方法，被String.prototype.match调用。正则表达式用来匹配字符串。

Symbol.replace
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

Symbol.search
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

Symbol.species
函数值，为一个构造函数。用来创建派生对象。

Symbol.split
方法，被String.prototype.split调用。正则表达式来用分割字符串。

Symbol.toPrimitive
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

Symbol.toStringTag
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

Symbol.unscopables
对象，它自己拥有的属性会被with作用域排除在外。
```

# 九、泛型

## 函数泛型

```ts
function num (a:number,b:number) : Array<number> {
    return [a ,b];
}
num(1,2)
function str (a:string,b:string) : Array<string> {
    return [a ,b];
}
str('独孤','求败')
```

```ts
function Add<T>(a: T, b: T): Array<T>  {
    return [a,b]
}
 
Add<number>(1,2)
Add<string>('1','2')
```

```ts
function Sub<T,U>(a:T,b:U):Array<T|U> {
    const params:Array<T|U> = [a,b]
    return params
}
Sub<Boolean,number>(false,1)
```

## 泛型接口

```ts
interface MyInter<T> {
   (arg: T): T
}
 
function fn<T>(arg: T): T {
   return arg
}
 
let result: MyInter<number> = fn
 
result(123)
```

## 对象字面量泛型

```ts
let foo: { <T>(arg: T): T }
 
foo = function <T>(arg:T):T {
   return arg
}
 
foo(123)
```

## 泛型约束

 我们期望在一个泛型的变量上面，获取其`length`参数，但是，有的数据类型是没有`length`属性的 

```ts
function getLegnth<T>(arg:T) {
  return arg.length
}
```

 对使用的泛型进行约束，我们约束其为具有`length`属性的类型 

```ts
interface Len {
   length:number
}
 
function getLegnth<T extends Len>(arg:T) {
  return arg.length
}
 
getLegnth<string>('123')
```

## 使用keyof 约束对象

其中使用了TS泛型和泛型约束。首先定义了T类型并使用extends关键字继承object类型的子类型，然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型，最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型 

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
 
 
let o = { a: 1, b: 2, c: 3 }
 
prop(o, 'a') 
prop(o, 'd') 
```

## 泛型类

声明方法跟函数类似名称后面定义<类型>

使用的时候确定类型new Sub<number>()

```ts
class Sub<T>{
   attr: T[] = [];
   add (a:T):T[] {
      return [a]
   }
}
 
let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)
 
let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```



# 十、tsconfig.json

 tsc --init 

```ts
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

常用:

1.include

指定编译文件默认是编译当前目录下所有的ts文件

2.exclude

指定排除的文件

3.target

指定编译js 的版本例如es5 es6

4.allowJS

是否允许编译js文件

5.removeComments

是否在编译过程中删除文件中的注释

6.rootDir

编译文件的目录

7.outDir

输出的目录

8.sourceMap

代码源文件

9.strict

严格模式

10.module

默认common.js 可选es6模式 amd umd 等



# 十一、namespace命名空间

[命名空间](https://so.csdn.net/so/search?q=命名空间&spm=1001.2101.3001.7020)中通过`export`将想要暴露的部分导出

如果不用export 导出是无法读取其值的

```typescript
namespace a {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
 
namespace b {
     export const Time: number = 1000
     export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
a.Time
b.Time
```

嵌套命名空间

```typescript
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
```

抽离命名空间

a.ts

```cpp
export namespace V {
    export const a = 1
}
```

b.ts

```javascript
import {V} from '../observer/index'
 
console.log(V);
```

 //{a:1}

简化命名空间

```cpp
namespace A  {
    export namespace B {
        export const C = 1
    }
}
 
import X = A.B.C
 
console.log(X);
```

合并命名空间

重名的命名空间会合并



# 十二、三斜线指令

三斜线指令是包含单个[XML](https://so.csdn.net/so/search?q=XML&spm=1001.2101.3001.7020)标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令*仅*可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// `指令是三斜线指令中最常见的一种。 它用于声明文件间的 *依赖*。

三斜线引用告诉[编译器](https://so.csdn.net/so/search?q=编译器&spm=1001.2101.3001.7020)在编译过程中要引入的额外的文件。

你也可以把它理解能`import`，它可以告诉编译器在编译过程中要引入的额外的文件

例如a.ts

```coffeescript
namespace A {    export const fn = () => 'a'}
```

b.ts

```coffeescript
namespace A {    export const fn2 = () => 'b'}
```

index.ts

引入之后直接可以使用变量A

```lua
///<reference path="./index2.ts" />
///<reference path="./index3.ts" />  
console.log(A);
```

声明文件引入

例如，把 `/// `引入到声明文件，表明这个文件使用了 `@types/node/index.d.ts`里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个`d.ts`文件时才使用这个指令。

```xml
///<reference types="node" />
```

注意事项：

如果你在配置文件 配置了noResolve 或者自身调用自身文件会报错



# 十三、声明文件d.ts

## 声明文件 declare 

当使用[第三方库](https://so.csdn.net/so/search?q=第三方库&spm=1001.2101.3001.7020)时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

```ts
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
/// <reference /> 三斜线指令
```

如果有一些第三方包确实没有声明文件我们可以自己去定义

名称.d.ts 创建一个文件去声明

例如express.d.ts

declare const express: ()=> any;



# 十四、装饰器Decorator

它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能

若要启用实验性的装饰器特性，你必须在[命令行](https://so.csdn.net/so/search?q=命令行&spm=1001.2101.3001.7020)或`tsconfig.json`里启用[编译器](https://so.csdn.net/so/search?q=编译器&spm=1001.2101.3001.7020)选项

##  装饰器

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。

首先定义一个类

```ts
class A {
    constructor() {
 
    }
}
```

 定义一个类装饰器函数 他会把ClassA的[构造函数](https://so.csdn.net/so/search?q=构造函数&spm=1001.2101.3001.7020)传入你的watcher函数当做第一个参数 

```ts
const watcher: ClassDecorator = (target: Function) => {
    target.prototype.getParams = <T>(params: T):T => {
        return params
    }
}
```

用的时候 直接通过@函数名使用

```typescript
@watcher
class A {
    constructor() {
 
    }
}
```

 验证 

```ts
const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器工厂

其实也就是一个高阶函数 外层的函数接受值 里层的函数最终接受类的构造函数

```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
 
@watcher('name')
class A {
    constructor() {
 
    }
}
 
const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器组合

就是可以使用多个装饰器

```ts
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
const watcher2 = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
 
@watcher2('name2')
@watcher('name')
class A {
    constructor() {
 
    }
}
 
 
const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

## 方法装饰器

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的*属性描述符*。

```ts
[
  {},
  'setParasm',
  {
    value: [Function: setParasm],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

```ts
const met:MethodDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    @met
    getName ():string {
        return '小满'
    }
}
 
 
const a = new A();
```

## 属性装饰器

返回两个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 属性的名字。

[ {}, 'name', undefined ]

```ts
const met:PropertyDecorator = (...args) => {
    console.log(args);
}
 
class A {
    @met
    name:string
    constructor() {
 
    }
   
}
 
 
const a = new A();
```

## 参数装饰器

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

[ {}, 'setParasm', 0 ]

```ts
const met:ParameterDecorator = (...args) => {
    console.log(args);
}
 
class A {
    constructor() {
 
    }
    setParasm (@met name:string = '213') {
 
    }
}
 
 
const a = new A();
```



# 十五、proxy & Reflect

## **Proxy** 

对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、[枚举](https://so.csdn.net/so/search?q=枚举&spm=1001.2101.3001.7020)、函数调用等）

**`target`**

要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)，函数，甚至另一个代理）。

**`handler`**

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

[handler.get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get) 本次使用的get

属性读取操作的捕捉器。

[handler.set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) 本次使用的set

属性设置操作的捕捉器。

## Reflect

与大多数全局对象不同`Reflect`并非一个构造函数，所以不能通过[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)对其进行调用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）

### Reflect.get(target, name, receiver) 

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性返回undefined

### Reflect.set(target, name,value, receiver) 

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。

```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
man.age  = 30
 
console.log(man);
```

 使用泛型+keyof优化 

```ts
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
 
const logAccess = <T>(object: T, key: keyof T): T => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
 
let man2 = logAccess({
    id:1,
    name:"小满2"
}, 'name')
 
man.age = 30
 
console.log(man);
```



# 十六、Partial & Pick

## Partial 

看一下[源码](https://so.csdn.net/so/search?q=源码&spm=1001.2101.3001.7020)

```haskell
/**
 * Make all properties in T optional
  将T中的所有属性设置为可选
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

使用前

```haskell
type Person = {
    name:string,
    age:number
}
 
type p = Partial<Person>
```

 转换后全部转为了可选 

```ts
type p = {
    name?: string | undefined;
    age?: number | undefined;
}
```

- **`keyof` 是干什么的？**

- **`in` 是干什么的？**

- **`?` 是将该属性变为可选属性**

- **`T[P]` 是干什么的？**

  

***\*1 keyof我们讲过很多遍了 将一个接口对象的全部属性取出来变成联合类型\****

***\*2 in 我们可以理解成for in P 就是key 遍历 keyof T 就是联合类型的每一项\****

**3 ？这个操作就是将每一个属性变成可选项**

**4 T[P] `索引访问操作符`，与 JavaScript 种访问属性值的操作类似**

## **Pick** 

从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

```ts
type Person = {
    name:string,
    age:number,
    text:string
    address:string
}
 
type Ex = "text" | "age"
 
type A = Pick<Person,Ex>
```



# 十七、Record & Readonly

## Readonly

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

 Readonly 这个操作就是将每一个属性变成只读 

1 keyof 将一个接口对象的全部属性取出来变成联合类型

2 in 我们可以理解成for in P 就是key [遍历](https://so.csdn.net/so/search?q=遍历&spm=1001.2101.3001.7020) keyof T 就是联合类型的每一项

3 Readonly 这个操作就是将每一个属性变成只读

4 T[P] 索引访问操作符，与 JavaScript 种访问属性值的操作类似

## Record

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

1 keyof any 返回 string number symbol 的联合类型

2 in 我们可以理解成for in P 就是key 遍历 keyof any 就是string number symbol类型的每一项

3 extends来约束我们的类型

4 T 直接返回类型

做到了约束 对象的key 同时约束了 value



# 十八、infer

 infer 是[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 新增到的关键字 充当占位符 

 定义一个类型 如果是[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)类型 就返回 数组元素的类型 否则 就传入什么类型 就返回什么类型 

```ts
type Infer<T> = T extends Array<any> ? T[number] : T
 
type A = Infer<(boolean | string)[]>
 
type B = Infer<null>
```

 使用inter 修改 

```ts
type Infer<T> = T extends Array<infer U> ? U : T
 
type A = Infer<(string | Symbol)[]>
```

 配合**tuple** 转换 **union** 联合类型 

```ts
type TupleToUni<T> = T extends Array<infer E> ? E : never
 
type TTuple = [string, number];
 
type ToUnion = TupleToUni<TTuple>; // string | number
```

