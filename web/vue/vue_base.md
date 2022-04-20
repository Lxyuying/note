# 一、侦听器

```js
date() {
  return {
    info: ''
    person: {name:'lxy',age:18}
  }
},
watch: {
  info(newQuestion, oldQuestion) {},
  'person.name'(newValue) {},
   person: {
     handler(newValue, oldValue) {},
    	// 深层侦听器
     deep: true,
     // 即时回调的侦听器
    	immediate: true,
     // 在侦听器回调中能访问被 Vue 更新之后的DOM
     flush: 'post'
   }
}
// 使用组件实例的 $watch() 方法来命令式地创建一个侦听器：
this.$watch('question', (newQuestion) => {
      // ...
})
```



# 二、计算属性

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 一个计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向当前组件实例
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

> **可写计算属性**

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

