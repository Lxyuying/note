# 一、Ref

## 1、ref

```js
import {ref,Ref} from 'vue'
let message:Ref<string> = ref("我是message")
```

## 2、isRef

判断是不是一个ref对象

```js
import { ref, Ref,isRef } from 'vue'
let message: Ref<string | number> = ref("我是message")
let notRef:number = 123
const changeMsg = () => {
  message.value = "change msg"
  console.log(isRef(message)); //true
  console.log(isRef(notRef)); //false
  
}
```

## 3、shallowRef

 创建一个跟踪自身 `.value` 变化的 ref，但不会使其值也变成响应式的 

```js
import { Ref, shallowRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "小满"
})
 
const changeMsg = () => {
  message.value = { name: "大满" }
}
```

## 4、triggerRef

 强制更新页面DOM 

```js

import { Ref, shallowRef,triggerRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "小满"
})
 
const changeMsg = () => {
  message.value.name = '大满'
 triggerRef(message)
}
```

## 5、customRef

自定义ref 

customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set

```ts
<script setup lang="ts">
import { Ref, shallowRef, triggerRef, customRef } from 'vue'
 
function Myref<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal: T) {
        console.log('set');
        value = newVal
        trigger()
      }
    }
  })
}
 
let message = Myref('小满')
const changeMsg = () => {
  message.value = '大满'
  // triggerRef(message)
}
</script> 
```



# 二、Reactive

## 1、reactive

用来绑定复杂的数据类型 例如 对象 数组

不可以绑定普通的数据类型 

```ts
import { reactive } from 'vue'
let person = reactive({
   name:"小满"
})
person.name = "大满"
```

## 2、readonly

 拷贝一份proxy对象将其设置为只读 

```ts
import { reactive ,readonly} from 'vue'
const person = reactive({count:1})
const copy = readonly(person)
 
 //person.count++
 
 copy.count++
```

## 3、shallowReactive 

```ts

import { shallowReactive } from 'vue'
const obj = {
  a: 1,
  first: {
    b: 2,
    second: {
      c: 3
    }
  }
}
const state = shallowReactive(obj)
function change1() {
  state.a = 7
}
function change2() {
  state.first.b = 8
  state.first.second.c = 9
  console.log(state);
}
```



# 三、To

## 1、toRef

 可用于为响应式对象上的 property 创建 ref。这样创建的 ref 与其源 property 保持同步：改变源 property 将更新 ref，反之亦然。 

```ts
import { reactive, toRef } from 'vue'
 
const obj = reactive({
   foo: 1,
   bar: 1
})
 
 
const state = toRef(obj, 'bar')
// bar 转化为响应式对象
 
const change = () => {
   state.value++
   console.log(obj, state);
 
}
```

## 2、 toRefs

 可以帮我们批量创建ref对象主要是方便我们解构使用 

```ts
import { reactive, toRefs } from 'vue'
const obj = reactive({
   foo: 1,
   bar: 1
})
 
let { foo, bar } = toRefs(obj)
 
foo.value++
console.log(foo, bar);
```

## 3、toRaw

 将响应式对象转化为普通对象 

```ts
import { reactive, toRaw } from 'vue'
 
const obj = reactive({
   foo: 1,
   bar: 1
})
 
const state = toRaw(obj)
// 响应式对象转化为普通对象
 
const change = () => {
   console.log(obj, state);
}
```



# 四、Computed

## 1、函数形式

```ts
import { computed, reactive, ref } from 'vue'
let price = ref(0)//$0
 
let m = computed<string>(()=>{
   return `$` + price.value
})
 
price.value = 500
```

## 2、对象形式

```ts
<script setup lang="ts">
import { computed, ref } from 'vue'
let price = ref<number | string>(1)//$0
let mul = computed({
   get: () => {
      return price.value
   },
   set: (value) => {
      price.value = 'set' + value
   }
})
</script>
```



# 五、watch

```txt
watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用
watch	第一个参数监听源
watch	第二个参数回调函数cb（newVal,oldVal）
watch	第三个参数一个options配置项是一个对象{
  immediate:true //是否立即调用一次
  deep:true //是否开启深度监听	
}
```

## 1、监听Ref

```ts
import { ref, watch } from 'vue'
 
let message = ref({
    nav:{
        bar:{
            name:""
        }
    }
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
},{
    immediate:true,
    deep:true
})
```

## 2、监听多个Ref

```ts
import { ref, watch ,reactive} from 'vue'
 
let message = ref('')
let message2 = ref('')
 
watch([message,message2], (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

## 3、监听Reactive

 使用reactive监听深层对象开启和不开启deep 效果一样 

```ts
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    nav:{
        bar:{
            name:""
        }
    }
})
 
 
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

## 4、 监听reactive 单一值 

```ts
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    name:"",
    name2:""
})
 
 
watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```



# 六、watchEffect

立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

如果用到message 就只会[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)message 就是用到几个监听几个 而且是非惰性 会默认调用一次

```ts
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect(() => {
    //console.log('message', message.value);
    console.log('message2', message2.value);
})
```

## 清除副作用

 就是在触发监听之前会调用一个函数可以处理你的逻辑例如防抖 

```ts
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
        
    })
    console.log('message2', message2.value);
})
```

##  **停止跟踪 **

**watchEffect 返回一个函数 调用之后将停止更新** 

```ts
const stop =  watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
 
    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {
 
    }
})
stop()
```

## **更多的配置项**

副作用刷新时机 flush 一般使用post

|          | pre                | sync                 | post               |
| :------- | :----------------- | :------------------- | :----------------- |
| 更新时机 | 组件**更新前**执行 | 强制效果始终同步触发 | 组件**更新后**执行 |

##  **onTrigger **

**可以帮助我们调试 watchEffect** 

```ts
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
 
    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {
        
    }
})
```



# 七、组件的生命周期

 ![img](https://staging-cn.vuejs.org/assets/lifecycle.16e4c08e.png) 



# 八、组件通信

## 1、父->子

### （1）defineProps 

 通过defineProps 来接受 

```ts
defineProps<{
    title:string,
    data:number[]
}>()
```

```js
defineProps({
    title:{
        default:"",
        type:string
    },
    data:Array
})
```

### （2）withDefaults

TS 特有的默认值方式 

```ts
type Props = {
    title?: string,
    data?: number[]
}
withDefaults(defineProps<Props>(), {
    title: "张三",
    data: () => [1, 2, 3]
})
```

## 2、子->父

### （1）defineEmits派发 

```vue
<template>
    <div class="menu">
        <button @click="clickTap">派发给父组件</button>
    </div>
</template>
 
<script setup lang="ts">
import { reactive } from 'vue'
const list = reactive<number[]>([4, 5, 6])
 
const emit = defineEmits(['on-click'])
const clickTap = () => {
    emit('on-click', list)
}
</script>
```

### (2) 父组件接受子组件的事件 

```vue
<template>
    <div class="layout">
       <Menu @on-click="getList"></Menu>
    </div>
</template>
 
<script setup lang="ts">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Content from './Content/index.vue'
import { reactive } from 'vue';
 
const data = reactive<number[]>([1, 2, 3])
 
const getList = (list: number[]) => {
    console.log(list,'父组件接受子组件');
}
</script>
```

### （3） defineExpose 

 子组件暴露给父组件内部属性 

我们从父组件获取子组件实例通过ref

```csharp
 <Menu ref="menus"></Menu> 
 const menus = ref(null)
```

这时候父组件想要读到子组件的属性可以通过 defineExpose暴露

```typescript
const list = reactive<number[]>([4, 5, 6]) defineExpose({list})
```



# 九、组件类型

## 1、全局组件

 在main.ts 引入我们的组件跟随在createApp(App) 后面 切记不能放到mount 后面这是一个链式调用用 

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/reset/index.less'
import Card from './components/Card/index.vue'
 
createApp(App).component('Card',Card).mount('#app')
```

## 2、局部组件

 在一个组件内（A） 通过import 去引入别的组件(B) 称之为局部组件 

## 3、递归组件

- 在父组件配置数据结构 数组对象格式 传给子组件

```go
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
const data = reactive<TreeList[]>([
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]);
```

- 子组件接收值

```haskell
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
 
type Props<T> = {
  data?: T[] | [];
};
 
defineProps<Props<TreeList>>();
```

- template 

TreeItem 其实就是当前组件 通过import 把自身又引入了一遍 如果他没有children 了就结束

```xml
  <div style="margin-left:10px;" class="tree">
    <div :key="index" v-for="(item,index) in data">
      <div @click='clickItem(item)'>{{item.name}}
    </div>
    <TreeItem @on-click='clickItem' v-if='item?.children?.length' :data="item.children"></TreeItem>
  </div>
  </div>
```



# 十、动态组件

 让多个组件使用同一个[挂载](https://so.csdn.net/so/search?q=挂载&spm=1001.2101.3001.7020)点，并动态切换 

 在挂载点使用[component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020)标签，然后使用v-bind:is=”组件” 

```javascript
import A from './A.vue'
import B from './B.vue'
```

```html
<component :is="A"></component>

```

***\*注意事项\**** 

***\*1.在Vue2 的时候is 是通过组件名称切换的 在Vue3 setup 是通过组件实例切换的\****

***\*2.如果你把组件实例放到Reactive Vue会给你一个警告runtime-core.esm-bundler.js:38 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`. 
Component that was made reactive:\**** 

***\*这是因为reactive 会进行proxy 代理 而我们组件代理之后毫无用处 节省性能开销 推荐我们使用shallowRef 或者 markRaw 跳过proxy 代理\****

```ts
const tab = reactive<Com[]>([{
    name: "A组件",
    comName: markRaw(A)
}, {
    name: "B组件",
    comName: markRaw(B)
}])
```



# 十一、插槽slot

## 匿名插槽

1.在子组件放置一个插槽

```xml
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```xml
<Dialog>
  <template v-slot>
    <div>2132</div>
  </template>
</Dialog>
```

## 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```xml
<div>
  <slot name="header"></slot>
  <slot></slot>

  <slot name="footer"></slot>
</div>
```

父组件使用需对应名称

```xml
<Dialog>
  <template v-slot:header>
    <div>1</div>
  </template>
  <template v-slot>
    <div>2</div>
  </template>
  <template v-slot:footer>
    <div>3</div>
  </template>
</Dialog>
```

 插槽简写

```xml
<Dialog>
  <template #header>
    <div>1</div>
  </template>
  <template #default>
    <div>2</div>
  </template>
  <template #footer>
    <div>3</div>
  </template>
</Dialog>
```

## 作用域插槽

在子组件动态绑定参数 派发给父组件的slot去使用

```xml
<div>
  <slot name="header"></slot>
  <div>
    <div v-for="item in 100">
      <slot :data="item"></slot>
    </div>
  </div>

  <slot name="footer"></slot>
</div>
```

通过结构方式取值

```xml
<Dialog>
  <template #header>
    <div>1</div>
  </template>
  <template #default="{ data }">
    <div>{{ data }}</div>
  </template>
  <template #footer>
    <div>3</div>
  </template>
</Dialog>
```

## 动态插槽

插槽可以是一个变量名

```xml
<Dialog>
  <template #[name]>
    <div>
      23
    </div>
  </template>
</Dialog>
```

```ts
const name = ref('header')
```



# 十二、异步组件

## 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积

这时候就可以使用异步组件

## 顶层 `await`

```
在setup语法糖里面 使用方法
```

<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()

```ts
const post = await fetch(`/api/post/1`).then(r => r.json())
```

父组件引用子组件 通过defineAsyncComponent加载异步配合import 函数模式便可以分包

```ts
import { reactive, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'

const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))
```

## suspense

`` 组件有两个插槽。它们都只接收一个直接子节点。`default` 插槽里的节点会尽可能展示出来。如果不能，则展示 `fallback` 插槽里的节点。

```html
<Suspense>
  <template #default>
    <Dialog>
      <template #default>
        <div>我在哪儿</div>
      </template>
    </Dialog>
  </template>

  <template #fallback>
    <div>loading...</div>
  </template>
</Suspense>
```



# 十三、Teleport传送组件

`Teleport` Vue 3.0新特性之一。

`Teleport` 是一种能够将我们的模板渲染至指定`DOM`节点，不受父级`style`、`v-show`等属性影响，但`data`、`prop`数据依旧能够共用的技术；类似于 `React` 的 `Portal`。

主要解决的问题 因为`Teleport`节点[挂载](https://so.csdn.net/so/search?q=挂载&spm=1001.2101.3001.7020)在其他指定的`DOM`节点下，完全不受父级`style`样式影响

使用方法

通过to 属性 插入指定元素位置 to="body" 便可以将`Teleport` 内容传送到指定位置

```xml
<Teleport to="body">
    <Loading></Loading>
</Teleport>
```

也可以自定义传送位置 支持 class id等 选择器

```xml
<div id="app"></div>
<div class="modal"></div>
```

```html
<Teleport to=".modal">
   <Loading></Loading>
</Teleport>
```

也可以使用多个

```xml
<Teleport to=".modal1">
     <Loading></Loading>
</Teleport>
<Teleport to=".modal2">
     <Loading></Loading>
</Teleport>
```



# 十四、keep-alive缓存组件

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到`keep-alive`组件。

开启keep-alive [生命周期](https://so.csdn.net/so/search?q=生命周期&spm=1001.2101.3001.7020)的变化

- 初次进入时： onMounted> onActivated
- 退出后触发 `deactivated`
- 再次进入：
- 只会触发 onActivated
- 事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

 **`include` 和 `exclude`**

```ruby
 <keep-alive :include="" :exclude="" :max=""></keep-alive>
```

include 和 exclude prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

**`max`**

```html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```



# 十五、transition动画组件

 Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

自定义 transition 过度效果，你需要对`transition`组件的`name`属性自定义。并在css中写入对应的样式

## 1.过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. ### [#](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#过渡-class)过渡 class

   在进入/离开的过渡中，会有 6 个 class 切换。

2. `v-enter-from`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

3. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

4. `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter-from` 被移除)，在过渡/动画完成之后移除。

5. `v-leave-from`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

6. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

7. `v-leave-to`：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave-from` 被移除)，在过渡/动画完成之后移除。

如下

```html
<button @click='flag = !flag'>切换</button>
<transition name='fade'>
  <div v-if='flag' class="box"></div>
</transition>
```

```css
//开始过度
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
//开始过度了
.fade-enter-active{
  transition: all 2.5s linear;
}
//过度完成
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
//离开的过度
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
//离开中过度
.fade-leave-active{
  transition: all 1s linear;
}
//离开完成
.fade-leave-to{
  width:0px;
   height:0px;
}
```

## 2.自定义过渡 class 类名

trasnsition props

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

自定义过度时间 单位毫秒

你也可以分别指定进入和离开的持续时间：

```html
<transition :duration="1000">...</transition>
 
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

通过自定义class 结合css动画库animate css

安装库 npm install animate.css

引入 import 'animate.css'

使用方法

官方文档 [Animate.css | A cross-browser library of CSS animations.](https://animate.style/)

```html
<transition
leave-active-class="animate__animated animate__bounceInLeft"
enter-active-class="animate__animated animate__bounceInRight"
>
  <div v-if="flag" class="box"></div>
</transition>
```

## 3.transition 生命周期8个

```
  @before-enter="beforeEnter" //对应enter-from
  @enter="enter"//对应enter-active
  @after-enter="afterEnter"//对应enter-to
  @enter-cancelled="enterCancelled"//显示过度打断
  @before-leave="beforeLeave"//对应leave-from
  @leave="leave"//对应enter-active
  @after-leave="afterLeave"//对应leave-to
  @leave-cancelled="leaveCancelled"//离开过度打断
```

当只用 JavaScript 过渡的时候，在 **`enter` 和 `leave` 钩子中必须使用 `done` 进行回调**

结合gsap 动画库使用 [GreenSock](https://greensock.com/)

```ts
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

## 4.appear

```
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```



# 十六、transition-group过度列表

- 单个节点
- 多个节点，每次只渲染一个

那么怎么同时渲染整个列表，比如使用 `v-for`？在这种场景下，我们会使用 `` 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 `tag` attribute 指定渲染一个元素。
- [过渡模式](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 `key` attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

```xml
<transition-group>
     <div style="margin: 10px;" :key="item" v-for="item in list">{{ item }</div>
</transition-group>
```

```ts
const list = reactive<number[]>([1, 2, 4, 5, 6, 7, 8, 9])
const Push = () => {
    list.push(123)
}
const Pop = () => {
    list.pop()
}
```

## 列表的移动过渡

`` 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 **`v-move` 类**就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 `name` attribute 来自定义，也可以通过 `move-class` attribute 手动设置

下面代码很酷炫

```vue
<template>
    <div>
        <button @click="shuffle">Shuffle</button>
        <transition-group class="wraps" name="mmm" tag="ul">
            <li class="cell" v-for="item in items" :key="item.id">{{ item.number }}</li>
        </transition-group>
    </div>
</template>
  
<script setup  lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
let items = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
        id: index,
        number: (index % 9) + 1
    }
}))
const shuffle = () => {
    items.value = _.shuffle(items.value)
}
</script>
  
<style scoped lang="less">
.wraps {
    display: flex;
    flex-wrap: wrap;
    width: calc(25px * 10 + 9px);
    .cell {
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
 
.mmm-move {
    transition: transform 0.8s ease;
}
</style>
```

## 状态过渡

Vue 也同样可以给数字 Svg 背景颜色等添加过度动画 今天演示数字变化

```vue
<template>
    <div>
        <input step="20" v-model="num.current" type="number" />
        <div>{{ num.tweenedNumber.toFixed(0) }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
const num = reactive({
    tweenedNumber: 0,
    current:0
})
 
watch(()=>num.current, (newVal) => {
    gsap.to(num, {
        duration: 1,
        tweenedNumber: newVal
    })
})
 
</script>
```



# 十七、依赖注入Provide / Inject



通常，当我们需要从父组件向子组件传递数据时，我们使用 [props](https://v3.cn.vuejs.org/guide/component-props.html)。想象一下这样的结构：有一些[深度](https://so.csdn.net/so/search?q=深度&spm=1001.2101.3001.7020)嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

官网的解释很让人疑惑，那我翻译下这几句话：

provide 可以在祖先组件中指定我们想要**提供**给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide **提供**的数据或方法。 

![img](https://img-blog.csdnimg.cn/img_convert/5f4ea9e16eda6e37ab336075a788ae15.png)

 看一个例子

父组件传递数据

```xml
<template>
    <div class="App">
        <button>我是App</button>
        <A></A>
    </div>
</template>
    
<script setup lang='ts'>
import { provide, ref } from 'vue'
import A from './components/A.vue'
let flag = ref<number>(1)
provide('flag', flag)
</script>
    
<style>
.App {
    background: blue;
    color: #fff;
}
</style>
```

子组件接受

```xml
<template>
    <div style="background-color: green;">
        我是B
        <button @click="change">change falg</button>
        <div>{{ flag }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { inject, Ref, ref } from 'vue'
 
const flag = inject<Ref<number>>('flag', ref(1))
 
const change = () => {
    flag.value = 2
}
</script>
    
<style>
</style>
```

TIPS 你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式

使用场景

当父组件有很多数据需要分发给其子代组件的时候， 就可以使用provide和inject。



# 十八、TSX

我们之前呢是使用Template去写我们模板。现在可以扩展另一种风格TSX风格

vue2 的时候就已经支持jsx写法，只不过不是很友好，随着vue3对[typescript](https://so.csdn.net/so/search?q=typescript&spm=1001.2101.3001.7020)的支持度，tsx写法越来越被接受

## 1.安装插件

npm install @vitejs/plugin-vue-jsx -D

vite.config.ts 配置

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()]
})
```

## 2.修改tsconfig.json 配置文件

```ts
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
```

## 3.使用TSX

TIPS tsx不会自动解包使用ref加.vlaue ! ! !

### tsx支持 v-[model](https://so.csdn.net/so/search?q=model&spm=1001.2101.3001.7020) 的使用

```tsx
 
import { ref } from 'vue'
 
let v = ref<string>('')
 
const renderDom = () => {
    return (
        <>
           <input v-model={v.value} type="text" />
           <div>
               {v.value}
           </div>
        </>
    )
}
 
export default renderDom
```

### v-show

```tsx
 
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
           <div v-show={flag.value}>景天</div>
           <div v-show={!flag.value}>雪见</div>
        </>
    )
}
 
export default renderDom
```

### v-if是不支持的

所以需要改变风格

```tsx
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
            {
                flag.value ? <div>景天</div> : <div>雪见</div>
            }
        </>
    )
}
 
export default renderDom
```

### v-for也是不支持的

需要使用Map

```tsx
import { ref } from 'vue'
 
let arr = [1,2,3,4,5]
 
const renderDom = () => {
    return (
        <>
            {
              arr.map(v=>{
                  return <div>${v}</div>
              })
            }
        </>
    )
}
 
export default renderDom
```

### v-bind使用

直接赋值就可以

```tsx
import { ref } from 'vue'
 
let arr = [1, 2, 3, 4, 5]
 
const renderDom = () => {
    return (
        <>
            <div data-arr={arr}>1</div>
        </>
    )
}
 
export default renderDom
```

### v-on绑定事件 所有的事件都按照react风格来

- 所有事件有on开头
- 所有事件名称首字母大写

```tsx
 
const renderDom = () => {
    return (
        <>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

### Props 接受值

```tsx
 
import { ref } from 'vue'
 
type Props = {
    title:string
}
 
const renderDom = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

### Emit派发

```tsx
type Props = {
    title: string
}
 
const renderDom = (props: Props,content:any) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap.bind(this,content)}>点击</button>
        </>
    )
}
 
const clickTap = (ctx:any) => {
 
    ctx.emit('on-click',1)
}
```

# 十九、Vue3自动引入插件

unplugin-auto-import/vite

vite配置

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VueJsx(),AutoImport({
    imports:['vue'],
    dts:"src/auto-import.d.ts"
  })]
})
```

配置完成之后使用ref reactive watch 等 无须import 导入 可以直接使用 

[GitHub - antfu/unplugin-auto-import: Auto import APIs on-demand for Vite, Webpack and Rollup](https://github.com/antfu/unplugin-auto-import)

# 二十、深入v-model

## TIps 在Vue3 v-model 是破坏性更新的

v-model在组件里面也是很重要的

v-model 其实是一个语法糖 通过props 和 emit组合而成的

1.默认值的改变

- prop：`value` -> `modelValue`；
- 事件：`input` -> `update:modelValue`；
- `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符

案例 子组件

```vue
<template>
     <div v-if='propData.modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue'])
 
const close = () => {
     emit('update:modelValue',false)
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

 父组件 

```vue
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>
 
<style>
</style>
```

绑定多个案例

 子组件

```vue
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean,
   title:string
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue','update:title'])
 
const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

自定义修饰符

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop

```vue
<script setup lang='ts'>
 
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }
 
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue', 'update:title'])
 
const close = () => {
    console.log(propData.modelModifiers);
 
    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```



# 二十一、自定义指令directive

## directive-自定义指令（属于破坏性更新）

Vue中有v-if,v-for,v-bind，v-show,v-[model](https://so.csdn.net/so/search?q=model&spm=1001.2101.3001.7020) 等等一系列方便快捷的指令 今天一起来了解一下vue里提供的自定义指令

## 1.Vue3指令的[钩子函数](https://so.csdn.net/so/search?q=钩子函数&spm=1001.2101.3001.7020)

- **created** 元素初始化的时候
- **beforeMount** 指令绑定到元素后调用 只调用一次
- **mounted** 元素插入父级dom调用
- **beforeUpdate** 元素被更新之前调用
- **update** 这个周期方法被移除 改用**updated**
- **beforeUnmount** 在元素被移除前调用
- **unmounted** 指令被移除后调用 只调用一次

Vue2 指令 bind inserted update componentUpdated unbind

## 2.在setup内定义局部指令

 但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。 

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog  v-move-directive="{background:'green',flag:show}"></Dialog>
</template>
```

```ts
 
const vMoveDirective: Directive = {
  created: () => {
    console.log("初始化====>");
  },
  beforeMount(...args: Array<any>) {
    // 在元素上做些操作
    console.log("初始化一次=======>");
  },
  mounted(el: any, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background;
    console.log("初始化========>");
  },
  beforeUpdate() {
    console.log("更新之前");
  },
  updated() {
    console.log("更新结束");
  },
  beforeUnmount(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载之前");
  },
  unmounted(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载完成");
  },
};
```

## 3.生命周期钩子参数详解

第一个 el 当前绑定的DOM 元素

第二个 binding

- `instance`：使用指令的组件实例。
- `value`：传递给指令的值。例如，在 `v-my-directive="1 + 1"` 中，该值为 `2`。
- `oldValue`：先前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否有更改都可用。
- `arg`：传递给指令的参数(如果有的话)。例如在 `v-my-directive:foo` 中，arg 为 `"foo"`。
- `modifiers`：包含修饰符(如果有的话) 的对象。例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{foo: true，bar: true}`。
- `dir`：一个对象，在注册指令时作为参数传递。例如，在以下指令中

第三个 当前元素的虚拟DOM 也就是Vnode

第四个 prevNode 上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用 

## 4.函数简写

你可能想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个函数模式实现

```vue
<template>
   <div>
      <input v-model="value" type="text" />
      <A v-move="{ background: value }"></A>
   </div>
</template>
   
<script setup lang='ts'>
import A from './components/A.vue'
import { ref, Directive, DirectiveBinding } from 'vue'
let value = ref<string>('')
type Dir = {
   background: string
}
const vMove: Directive = (el, binding: DirectiveBinding<Dir>) => {
   el.style.background = binding.value.background
}
</script>
 
 
 
<style>
</style>
```



案例自定义拖拽指令 

```xml
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style lang='less'>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  .header {
    height: 20px;
    background: black;
    cursor: move;
  }
}
</style>
```



# 二十二、自定义Hooks

Vue3 自定义Hook

主要用来处理复用代码逻辑的一些封装

这个在vue2 就已经有一个东西是Mixins

mixins就是将这些多个相同的逻辑抽离出来，各个组件只需要引入mixins，就能实现一次写代码，多组件受益的效果。

弊端就是 会涉及到覆盖的问题

**组件的data、methods、filters会覆盖mixins里的同名data、methods、filters。**

 第二点就是 变量来源不明确（隐式传入），不利于阅读，使代码变得难以维护。 

Vue3 的自定义的hook

- Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
- Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

Vue3 hook 库[Get Started | VueUse](https://vueuse.org/guide/)

```ts
import { onMounted } from 'vue'
 
 
type Options = {
    el: string
}
 
type Return = {
    Baseurl: string | null
}
export default function (option: Options): Promise<Return> {
 
    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(option.el) as HTMLImageElement;
            file.onload = ():void => {
                resolve({
                    Baseurl: toBase64(file)
                })
            }
 
        })
 
 
        const toBase64 = (el: HTMLImageElement): string => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = el.width
            canvas.height = el.height
            ctx.drawImage(el, 0, 0, canvas.width,canvas.height)
            console.log(el.width);
            
            return canvas.toDataURL('image/png')
 
        }
    })
 
 
}
```

# 二十三、Pinia

Pinia.js 有如下特点：

- 完整的 ts 的支持；
- 足够轻量，压缩后的体积只有1kb左右;
- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

官方文档[Pinia](https://pinia.vuejs.org/)

git 地址 https://github.com/vuejs/pinia

## 1.起步 安装

```ts
yarn add pinia
 
npm install pinia
```

## 2.引入注册Vue3

```ts
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
 
const store = createPinia()
let app = createApp(App)
 
 
app.use(store)
 
app.mount('#app')
```

 Vue2 使用 

```ts
import { createPinia, PiniaVuePlugin } from 'pinia'
 
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
 
new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

## 3、初始化仓库Store

**1.新建一个文件夹Store**

**2.新建文件[name].ts**

**3.定义仓库Store**

```ts
import { defineStore } from 'pinia'
```

 **4.我们需要知道存储是使用定义的`defineStore()`，并且它需要一个唯一的名称，作为第一个参数传递** 

名称抽离

新建文件store-namespace/index.ts

```ts
export const enum Names {
    Test = 'TEST'
}
```

store 引入

```javascript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
 
})
```

这个*名称*，也称为*id*，是必要的，Pania 使用它来将商店连接到 devtools。将返回的函数命名为*use...*是可组合项之间的约定，以使其使用习惯。 

 **5.定义值** 

**State 箭头函数 返回一个对象 在对象里面定义值**

```coffeescript
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     }
})
```

```ts
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     },
     //类似于computed 可以帮我们去修饰我们的值
     getters:{
 
     },
     //可以操作异步 和 同步提交state
     actions:{
 
     }
})
```

## 4、state

### (1)State 是允许直接修改值的 例如current++

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.current++
}
 
</script>
 
<style>
 
</style>
```

### (2)批量修改State的值

在他的实例上有$patch方法可以批量修改多个值

```xml
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch({
       current:200,
       age:300
    })
}
 
</script>
 
<style>
 
</style>
```

### (3)批量修改函数形式

推荐使用函数形式 可以自定义修改逻辑

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$patch((state)=>{
       state.current++;
       state.age = 40
    })
}
 
</script>
 
<style>
 
</style>
```

### (4)通过原始对象修改整个实例

`$state`您可以通过将store的属性设置为新对象来替换store的整个状态

缺点就是必须修改整个对象的所有属性

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
    Test.$state = {
       current:10,
       age:30
    }    
}
 
</script>
 
<style>
 
</style>
```

### 5.通过actions修改

定义Actions

在actions 中直接使用this就可以指到state里面的值

```ts
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
     state:()=>{
         return {
            current:1,
            age:30
         }
     },
 
     actions:{
         setCurrent () {
             this.current++
         }
     }
})
```

 使用方法直接在实例调用 

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.setCurrent()
}
 
</script>
 
<style>
 
</style>
```

### 6、解构store

在Pinia是不允许直接解构是会失去响应性的

```javascript
const Test = useTestStore()
 
const { current, name } = Test
 
console.log(current, name);
```

差异对比

修改Test current 解构完之后的数据不会变

而源数据是会变的

```vue
<template>
  <div>origin value {{Test.current}}</div>
  <div>
    pinia:{{ current }}--{{ name }}
    change :
    <button @click="change">change</button>
  </div>
</template>
  
<script setup lang='ts'>
import { useTestStore } from './store'
 
const Test = useTestStore()
 
const change = () => {
   Test.current++
}
 
const { current, name } = Test
 
console.log(current, name);
 
 
</script>
  
<style>
</style>
```

 解决方案可以使用 storeToRefs 

```ts
import { storeToRefs } from 'pinia'
 
const Test = useTestStore()
 
const { current, name } = storeToRefs(Test)
```

其原理跟toRefs 一样的给里面的数据包裹一层toref

源码 通过toRaw使store变回原始数据防止重复代理

循环store 通过 isRef isReactive 判断 如果是响应式对象直接拷贝一份给refs 对象 将其原始对象包裹toRef 使其变为响应式对象 



## 5、Actions，getters

#### Actions（支持同步异步）

1.同步 直接调用即可

```ts
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        counter: 0,
    }),
    actions: {
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())
        },
    },
})
```

```vue
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.counter}}
          </div>    
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.randomizeCounter()
}
 
</script>
 
<style>
 
</style>
```

 2.异步 可以结合async await 修饰 

```ts
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
 
type Result = {
    name: string
    isChu: boolean
}
 
const Login = (): Promise<Result> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '小满',
                isChu: true
            })
        }, 3000)
    })
}
 
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        user: <Result>{},
        name: "123"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
        }
    },
})
```

 template 

```vue
<template>
     <div>
         <button @click="Add">test</button>
          <div>
             {{Test.user}}
          </div>    
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.getLoginInfo()
}
 
</script>
 
<style>
 
</style>
```

#### 多个action互相调用getLoginInfo setName

```typescript
    state: () => ({
        user: <Result>{},
        name: "default"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
            this.setName(result.name)
        },
        setName (name:string) {
            this.name = name;
        }
    },
```

#### getters

1.使用箭头函数不能使用this this指向已经改变指向undefined 修改值请用state

主要作用类似于computed 数据修饰并且有缓存

```ts
    getters:{
       newPrice:(state)=>  `$${state.user.price}`
    },
```

 2.普通函数形式可以使用this 

```ts
    getters:{
       newCurrent ():number {
           return ++this.current
       }
    },
```

 3.getters 互相调用

```ts
    getters:{
       newCurrent ():number | string {
           return ++this.current + this.newName
       },
       newName ():string {
           return `$-${this.name}`
       }
    },
```

## 6、API

> $reset

 重置`store`到他的初始状态 

```ts
state: () => ({
     user: <Result>{},
     name: "default",
     current:1
}),
```

 Vue 例如我把值改变到了10 

```ts
const change = () => {
     Test.current++
}
```

调用$reset();

将会把state所有值 重置回 原始状态

> 订阅state的改变

 类似于Vuex 的abscribe 只要有state 的变化就会走这个函数 

```ts
Test.$subscribe((args,state)=>{
   console.log(args,state);
})
```

第二个参数

如果你的组件卸载之后还想继续调用请设置第二个参数

```ts
Test.$subscribe((args,state)=>{
   console.log(args,state);
   
},{
  detached:true
})
```

> 订阅Actions的调用

 只要有actions被调用就会走这个函数 

```ts
Test.$onAction((args)=>{
   console.log(args);
})
```

## 7、插件

pinia 和 vuex 都有一个通病 页面刷新状态会丢失

我们可以写一个pinia 插件缓存他的值

```ts
const __piniaKey = '__PINIAKEY__'
 
 
 
type OptPinia = Partial<Options>
 
 
 
const setStorage = (key: string, value: any): void => {
 
localStorage.setItem(key, JSON.stringify(value))
 
}
 
 
 
const getStorage = (key: string) => {
 
return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
 
}
 
 
 
const piniaPlugin = (options: OptPinia) => {
 
return (context: PiniaPluginContext) => {
 
const { store } = context;
 
const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
 
store.$subscribe(() => {
 
setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));
 
})
 
return {
 
...data
 
}
 
}
 
}
 
const pinia = createPinia()
 
pinia.use(piniaPlugin({
 
key: "pinia"
 
}))
```



# 二十四、Router

## 1、安装

```ts
npm install vue-router@4
```

在src目录下面新建router 文件 然后在router 文件夹下面新建 index.ts

```javascript
//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
 
//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory
 
//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/a.vue')
},{
    path: '/register',
    component: () => import('../components/b.vue')
}]
 
 
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
//导出router
export default router
```

`router-link`[#](https://router.vuejs.org/zh/guide/#router-link)

请注意，我们没有使用常规的 `a` 标签，而是使用一个自定义组件 `router-link` 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

### `router-view`[#](https://router.vuejs.org/zh/guide/#router-view)

`router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

```vue
<template>
  <div>
    <h1>小满最骚</h1>
    <div>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <router-link tag="div" to="/">跳转a</router-link>
      <router-link tag="div" style="margin-left:200px" to="/register">跳转b</router-link>
    </div>
    <hr />
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
```

 最后在main.ts 挂载 

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
```



## 2、命名路由-编程式导航

### 命名路由

除了 `path` 之外，你还可以为任何路由提供 `name`。这有以下优点：

- 没有硬编码的 URL
- `params` 的自动编码/解码。
- 防止你在 url 中出现打字错误。
- 绕过路径排序（如显示一个）

```ts
const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Login",
        component:()=> import('../components/login.vue')
    },
    {
        path:"/reg",
        name:"Reg",
        component:()=> import('../components/reg.vue')
    }
]
```

 router-link跳转方式需要改变 变为对象并且有对应name 

```vue
    <h1>小满最骚</h1>
    <div>
      <router-link :to="{name:'Login'}">Login</router-link>
      <router-link style="margin-left:10px" :to="{name:'Reg'}">Reg</router-link>
    </div>
    <hr />
```

### 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

1. 字符串模式

```ts
import { useRouter } from 'vue-router'
const router = useRouter()
 
const toPage = () => {
  router.push('/reg')
}
```

2. 对象模式 

```ts
import { useRouter } from 'vue-router'
const router = useRouter()
 
const toPage = () => {
  router.push({
    path: '/reg'
  })
}
```

3. 命名式路由模式 

```ts
import { useRouter } from 'vue-router'
const router = useRouter()
 
const toPage = () => {
  router.push({
    name: 'Reg'
  })
}
```

### a标签跳转

直接通过a href也可以跳转但是会刷新页面

```xml
 <a href="/reg">rrr</a>
```



## 3、历史记录

### replace的使用

采用replace进行页面的跳转会同样也会创建渲染新的Vue组件，但是在history中其不会重复保存记录，而是替换原有的vue组件；

1.  router-link 使用方法 

```ts
<router-link replace to="/">Login</router-link>
<router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
```

2. 编程式导航

```xml
<button @click="toPage('/')">Login</button>
<button @click="toPage('/reg')">Reg</button>
```

3. js

```typescript
import { useRouter } from 'vue-router'
const router = useRouter() 
const toPage = (url: string) => {
  router.replace(url)
}
```

### 横跨历史

该方法采用一个整数作为参数，表示在历史[堆栈](https://so.csdn.net/so/search?q=堆栈&spm=1001.2101.3001.7020)中前进或后退多少步

```ts
const next = () => {
  //前进 数量不限于1
  router.go(1)
}
 
const prev = () => {
  //后退
  router.back()
}
```



## 4、路由传参

### Query路由传参

编程式导航 使用router push 或者 replace 的时候 改为对象形式新增query 必须传入一个对象

```ts
const toDetail = (item: Item) => {
    router.push({
        path: '/reg',
        query: item
    })
}
```

**接受参数**

**使用 useRoute 的 query**

```ts
import { useRoute } from 'vue-router';
const route = useRoute()
```

```vue
 <div>品牌：{{ route.query?.name }}</div>
 <div>价格：{{ route.query?.price }}</div>
 <div>ID：{{ route.query?.id }}</div>
```



### Params路由传参

编程式导航 使用router push 或者 replace 的时候 改为对象形式并且只能使用name，path无效，然后传入params

```coffeescript
const toDetail = (item: Item) => {
    router.push({
        name: 'Reg',
        params: item
    })
}
```

**接受参数**

**使用 useRoute 的 params**

```ts
import { useRoute } from 'vue-router';
const route = useRoute()
```

```vue
<div>品牌：{{ route.params?.name }}</div>
<div>价格：{{ route.params?.price }}</div>
<div>ID：{{ route.params?.id }}</div>
```

### 动态路由传参

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 *路径参数* 

*路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 *params* 的值将在每个组件

```ts
const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Login",
        component:()=> import('../components/login.vue')
    },
    {
        //动态路由参数
        path:"/reg/:id",
        name:"Reg",
        component:()=> import('../components/reg.vue')
    }
]
```

```ts
const toDetail = (item: Item) => {
    router.push({
        name: 'Reg',
        params: {
            id: item.id
        }
    })
}
```

```ts
import { useRoute } from 'vue-router';
import { data } from './list.json'
const route = useRoute()
 
 
const item = data.find(v => v.id === Number(route.params.id))
```

### 二者的区别

1. query 传参配置的是 path，而 params 传参配置的是name，在 params中配置 path 无效
2. query 在路由配置不需要设置参数，而 params 必须设置
3. query 传递的参数会显示在地址栏中
4. params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
5. 路由配置



## 5、[嵌套](https://so.csdn.net/so/search?q=嵌套&spm=1001.2101.3001.7020)路由

 一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如： 

```ts
const routes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        component: () => import('../components/footer.vue'),
        children: [
            {
                path: "",
                name: "Login",
                component: () => import('../components/login.vue')
            },
            {
                path: "reg",
                name: "Reg",
                component: () => import('../components/reg.vue')
            }
        ]
    },
 
]
```

如你所见，`children` 配置只是另一个路由数组，就像 `routes` 本身一样。因此，你可以根据自己的需要，不断地嵌套视图 

TIPS：不要忘记写router-view

```xml
    <div>
        <router-view></router-view>
        <div>
            <router-link to="/">login</router-link>
            <router-link style="margin-left:10px;" to="/user/reg">reg</router-link>
        </div>
    </div>
```



## 6、命名视图

命名视图可以在同一级（同一个组件）中展示更多的路由视图，而不是[嵌套](https://so.csdn.net/so/search?q=嵌套&spm=1001.2101.3001.7020)显示。 命名视图可以让一个组件中具有多个路由渲染出口，这对于一些特定的布局组件非常有用。 命名视图的概念非常类似于“具名插槽”，并且视图的默认名称也是 `default`。

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 **s**)

``ts

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 
 
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        components: {
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue'),
        }
    },
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router
```

 对应Router-view 通过name 对应组件 

```xml
<div>
  <router-view></router-view>
  <router-view name="header"></router-view>
  <router-view name="content"></router-view>
</div>
```



## 7、重定向-别名

### [重定向](https://so.csdn.net/so/search?q=重定向&spm=1001.2101.3001.7020) redirect

1. [字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)形式配置，访问/ 重定向到 /user （地址栏显示/,内容为/user路由的内容）

```ts
const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        component:()=> import('../components/root.vue'),
        redirect:'/user1',
        children:[
            {
                path:'/user1',
                components:{
                    default:()=> import('../components/A.vue')
                }
            },
            {
                path:'/user2',
                components:{
                    bbb:()=> import('../components/B.vue'),
                    ccc:()=> import('../components/C.vue')
                }
            }
        ]
    }
]
```

2. 对象形式配置 

```ts
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/root.vue'),
        redirect: { path: '/user1' },
        children: [
            {
                path: '/user1',
                components: {
                    default: () => import('../components/A.vue')
                }
            },
            {
                path: '/user2',
                components: {
                    bbb: () => import('../components/B.vue'),
                    ccc: () => import('../components/C.vue')
                }
            }
        ]
    }
]
```

3. 函数模式（可以传参） 

```ts
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/root.vue'),
        redirect: (to) => {
            return {
                path: '/user1',
                query: to.query
            }
        },
        children: [
            {
                path: '/user1',
                components: {
                    default: () => import('../components/A.vue')
                }
            },
            {
                path: '/user2',
                components: {
                    bbb: () => import('../components/B.vue'),
                    ccc: () => import('../components/C.vue')
                }
            }
        ]
    }
]
```

### 别名 alias

**将 `/` 别名为 `/`**root**，意味着当用户访问 `/`**root**时，URL 仍然是 `/user`，但会被匹配为用户正在访问 `/`**

```ts
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/root.vue'),
        alias:["/root","/root2","/root3"],
        children: [
            {
                path: 'user1',
                components: {
                    default: () => import('../components/A.vue')
                }
            },
            {
                path: 'user2',
                components: {
                    bbb: () => import('../components/B.vue'),
                    ccc: () => import('../components/C.vue')
                }
            }
        ]
    }
]
```



## 8、导航守卫

### 全局前置守卫

router.beforeEach

```ts
router.beforeEach((to, form, next) => {
    console.log(to, form);
    next()
})
```

 每个守卫方法接收三个参数：

```css
to: Route， 即将要进入的目标 路由对象；
from: Route，当前导航正要离开的路由；
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。next('/') 或者 
next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。 
```

案例 权限判断

```ts
const whileList = ['/']
 
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({
            path:'/'
        })
    }
})
```

### 全局后置守卫

使用场景一般可以用来做loadingBar

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```ts
router.afterEach((to,from)=>{
    Vnode.component?.exposed?.endLoading()
})
```

loadingBar 组件

```xml
<template>
    <div class="wraps">
        <div ref="bar" class="bar"></div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)
const startLoading = () => {
    let dom = bar.value as HTMLElement;
    speed.value = 1
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 1;
            dom.style.width = speed.value + '%'
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1;
            window.cancelAnimationFrame(timer.value)
        }
    })
 
}
 
const endLoading = () => {
    let dom = bar.value as HTMLElement;
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100;
            dom.style.width = speed.value + '%'
        })
    }, 500)
 
}
 
 
defineExpose({
    startLoading,
    endLoading
})
</script>
    
<style scoped lang="less">
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;
    .bar {
        height: inherit;
        width: 0;
        background: blue;
    }
}
</style>
```

 mian.ts 

```ts
import loadingBar from './components/loadingBar.vue'
const Vnode = createVNode(loadingBar)
render(Vnode, document.body)
console.log(Vnode);
 
router.beforeEach((to, from, next) => {
    Vnode.component?.exposed?.startLoading()
})
 
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})
```



## 9、路由元信息

通过路由记录的 `meta` 属性可以定义路由的**元信息**。使用路由元信息可以在路由中附加自定义的数据，例如：

- 权限校验标识。
- 路由组件的过渡名称。
- 路由组件持久化缓存 (keep-alive) 的相关配置。
- 标题名称

我们可以在**导航守卫**或者是**路由对象**中访问路由的元信息数据。

```coffeescript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: "登录"
      }
    },
    {
      path: '/index',
      component: () => import('@/views/Index.vue'),
      meta: {
        title: "首页",
      }
    }
  ]
})
```

#### 使用TS扩展

如果不使用扩展 将会是unknow 类型

```ts
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
```



## 10、路由过渡动效

 想要在你的路径组件上使用转场，并对导航进行动画处理，你需要使用 [v-slot API](https://router.vuejs.org/zh/api/#router-view-s-v-slot)： 

```vue
<router-view #default="{route,Component}">
  <transition  :enter-active-class="`animate__animated ${route.meta.transition}`">
    <component :is="Component"></component>
  </transition>
</router-view>
```

上面的用法会对所有的路由使用相同的过渡。如果你想让每个路由的组件有不同的过渡，你可以将[元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)和动态的 `name` 结合在一起，放在`` 上：  

```ts
declare module 'vue-router'{
     interface RouteMeta {
        title:string,
        transition:string,
     }
}
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta:{
         title:"登录页面",
         transition:"animate__fadeInUp",
      }
    },
    {
      path: '/index',
      component: () => import('@/views/Index.vue'),
      meta:{
         title:"首页！！！",
         transition:"animate__bounceIn",
      }
    }
  ]
})
```



## 11、滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法

```coffeescript
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    console.log(to, '==============>', savePosition);
    return new Promise((r) => {
      setTimeout(() => {
        r({
          top: 10000
        })
      }, 2000);
    })
  },
```

scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

scrollBehavior 返回滚动位置的对象信息，长这样：

- { left: number, top: number }

```javascript
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    return {
       top:200
    }
  },
```



## 12、动态路由

### 动态路由

我们一般使用动态路由都是后台会返回一个[路由表](https://so.csdn.net/so/search?q=路由表&spm=1001.2101.3001.7020)前端通过调接口拿到后处理(后端处理路由)

主要使用的方法就是router.addRoute

### 添加路由

 动态路由主要通过两个函数实现。`router.addRoute()` 和 `router.removeRoute()`。它们**只**注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 `router.push()` 或 `router.replace()` 来**手动导航**，才能显示该新路由

```css
router.addRoute({ path: '/about', component: About })
```

### 删除路由

有几个不同的方法来删除现有的路由：

- 通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：

```ts
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```

-  通过调用 `router.addRoute()` 返回的回调： 

```ts
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话
```

- 当路由没有名称时，这很有用。

- 通过使用 `router.removeRoute()`按名称删除路由：

  ```ts
  router.addRoute({ path: '/about', name: 'about', component: About })
  // 删除路由
  router.removeRoute('about')
  ```

需要注意的是，如果你想使用这个功能，但又想避免名字的冲突，可以在路由中使用 `Symbol` 作为名字。

当路由被删除时，**所有的别名和子路由也会被同时删除**

### 查看现有路由

Vue Router 提供了两个功能来查看现有的路由：

- [router.hasRoute()](https://router.vuejs.org/zh/api/#hasroute)：检查路由是否存在。
- [router.getRoutes()](https://router.vuejs.org/zh/api/#getroutes)：获取一个包含所有路由记录的数组。

案例

前端代码 

***\*注意一个事项vite在使用动态路由的时候无法使用别名@ 必须使用相对路径\****

```ts
const initRouter = async () => {
    const result = await axios.get('http://localhost:9999/login', { params: formInline });
    result.data.route.forEach((v: any) => {
        router.addRoute({
            path: v.path,
            name: v.name,
                                    //这儿不能使用@
            component: () => import(`../views/${v.component}`)
        })
        router.push('/index')
    })
    console.log(router.getRoutes());
 
}
```

 后端代码 nodejs [express](https://so.csdn.net/so/search?q=express&spm=1001.2101.3001.7020) 

```ts
import express, { Express, Request, Response } from 'express'
 
const app: Express = express()
 
app.get('/login', (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.query.user == 'admin' && req.query.password == '123456') {
        res.json({
            route: [
                {
                    path: "/demo1",
                    name: "Demo1",
                    component: 'demo1.vue'
                },
                {
                    path: "/demo2",
                    name: "Demo2",
                    component: 'demo2.vue'
                },
                {
                    path: "/demo3",
                    name: "Demo3",
                    component: 'demo3.vue'
                }
            ]
        })
    }else{
        res.json({
            code:400,
            mesage:"账号密码错误"
        })
    }
})
 
app.listen(9999, () => {
    console.log('http://localhost:9999');
 
})
```



# css Style完整新特性

## 1. [插槽](https://so.csdn.net/so/search?q=插槽&spm=1001.2101.3001.7020)选择器

 A 组件定义一个插槽 

```vue
<template>
    <div>
        我是插槽
        <slot></slot>
    </div>
</template>
 
<script>
export default {}
</script>
 
<style scoped>
 
</style>
```

 在App.vue 引入 

```vue
<template>
    <div>
        <A>
            <div class="a">私人定制div</div>
        </A>
    </div>
</template>
 
<script setup>
import A from "@/components/A.vue"
</script>
 
 
<style lang="less" scoped>
</style>
```

 在A组件修改class a 的颜色 

```css
<style scoped>
.a{
    color:red
}
</style>
```

 无效果 

默认情况下，作用域样式不会影响到 `` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方案 slotted

```css
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

##  2.全局选择器

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加scoped 现在有更优雅的解决方案

```xml
<style>
 div{
     color:red
 }
</style>
 
<style lang="less" scoped>
 
</style>
```

```css
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
```

 效果等同于上面  

## 3.动态 CSS

单文件组件的 `` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue
<template>
    <div class="div">
       小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

 如果是对象 v-bind 请加引号 

```vue
 <template>
    <div class="div">
        小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue"
const red = ref({
    color:'pink'
})
</script>
 
    <style lang="less" scoped>
.div {
    color: v-bind('red.color');
}
</style>
```

## 4.css `module`

  <style module> 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件  

```vue
<template>
    <div :class="$style.red">
        小满是个弟弟
    </div>
</template>
 
<style module>
.red {
    color: red;
    font-size: 20px;
}
</style>
```

自定义注入名称（多个可以用数组）

你可以通过给 `module` attribute 一个值来自定义注入的类对象的 property 键

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

与组合式 API 一同使用

注入的类可以通过 [useCssModule](https://v3.cn.vuejs.org/api/global-api.html#usecssmodule) API 在 `setup()` 和 `` 中使用。对于使用了自定义注入名称的 `` 模块，`useCssModule` 接收一个对应的 `module` attribute 值作为第一个参数

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
 
<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs')
</script>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```



