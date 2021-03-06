# vue.js及相关介绍
- [ele-admin](https://taylorchen709.github.io/vue-admin/)
	- This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)
	
-  [i-view-admin](https://iview.github.io/iview-admin/#/login)
    - [https://github.com/iview/iview](https://github.com/iview/iview)
    - [https://www.iviewui.com/](https://www.iviewui.com/)
  

### vue.js简介及框架简介
> 轻量级的MVVM框架，有react的组件化的概念，可以轻松的实现数据的展示和分离；也有angular灵活的指令和页面操作的方法。

- 组件化开发模式，渐进式框架: 字段的渲染，组件，路由，状态，构建系统
- 初步了解vue.js框架
- vue.js开发环境的搭建、脚手架工具的使用
- vue.js具体的指令和项目实践


### 安装：vue.js开发环境搭建及热更新
- 1.全局安装vue-cli: ``npm install --global vue-cli``
    - 检查是否安装好，直接在命令行输入``vue``
- 2.创建一个 基于webpack模板的新项目：``vue init webpack my-project``
    - 这时候你会看到当前文件夹多了一些文件
- 3.在``my-project``文件夹打开命令行，``npm install``
    - **注意：** 有时候npm的速度很慢，可以考虑cnpm, 输入下面命令行
        - ``npm install -g cnpm --registry=https://registry.npm.taobao.org``
        -  输入命令：`cnpm`检查是否安装好，以后用到npm的地方用cnpm代替。
    - 或者使用`nrm`切换镜像
        - `npm i -g nrm` 安装`nrm`
        - `nrm list`
        - `nrm use taobao`
        
### 准备知识
- 前端**模块化**基础
- 对**ES6**有初步了解
- 熟悉基础框架
    - `name: ''`
    - `data () {}`
    - `props: [ ]`
    - `methods: {}`
    - `components: {} `// 一定要有返回值
    - `watch: {}`
    - `filters: {}`


### 组件
- 组件的定义
    - 全局组件
    - 局部组件

### 组件之间的通信

#### 父向子通信
- 子组件需要用到``props: ['str']``属性来接收，同时这个值也保存在``data``里面了，可以直接打印和渲染到页面
- `prop`的验证
- 动态静态传递


#### 子向父通信
> 每个vue实例都是一个事件触发器，vue实例实现了一个自定义事件接口，方便在组件树中通信，这个事件系统独立于原生DOM事件，用法也不同，

- `$on()`监听事件
- `$emit()`触发事件
- `$dispatch()`派发事件，事件沿着父链冒泡
- `$broadcast()`广播事件，事件向下传到给所有的后代

> 不同于DOM事件，vue事件在冒泡过程中第一次触发回调之后自动停止冒泡，除非回调明确返回**true**

- 在父组件里面监听子组件：子组件要告诉父组件什么事情
    - 子组件发生事件，把子组件的信息传递给父组件

- 通过`$emit`方法，第一个参数要和父组件对应，第二个参数是要传递的信息

- 子组件向父组件传参，第二种方法：

### vue-router

- `<router-link to="/login">登陆</router-link>`
- `<router-view></router-view>`



### vuex

```
Application Structure
  Vuex doesn't really restrict how you structure your code. Rather, it enforces a set of high-level principles;
    1. Application-level state is centralized in the store.
    2. The only way to mutate the state is by committing **mutations**. which are synchronous transactions.
    3. Asynchronous logic should be encapsulated in, and can be composed with **actions**.
  As long as you follow these rules. it's up to you how to structure your project. If your store file gets too big. simply start splitting the actions. mutations and getters into separate files.
  For any non-trivial app. we will likely need to leverage modules. Here's an example project structure;
```

```bash
    |-- index.html
    |-- main.js
    |-- api
    |   |-- ....
    |-- components
    |   |--App.vue
    |   |-- ...
    |-- store
        |-- index.js
        |-- actions.js
        |-- mutations.js
        |-- modules
```

- 1.`state`

- 2.`getters` -- 获取状态集里面的数据
    ```javascript
       getters: {
          getTotal (state) {
              return state.totalPrice;
          }
       }
    ```
- 3.`mutations` -- 同步

- 4.`actions` -- 只能调用mutations，不能更改state

    ```javascript
        //添加actions
        actions: {
            increase (context, price) {
                context.commit('increment', price)
            }
        }

        this.$store.commit('increment', this.price);//子组件的methods里面的方法更换

        this.$store.dispatch('increase', this.price);// 更换commit, 用dispath
    ```

> 这样做的好处是，可以在actions里面做一些异步的操作，在去触发increment, 与后端API的操作都是放在actions里面进行的

- 5.`modules`

```javascript
    const moduleA = {
        state: {},
        mutations: {},
        actions: {},
        getters: {}
    };

    const moduleB = {
        state: {},
        mutations: {},
        actions: {},
        getters: {}
    };

    const  store = new Vuex.Store({
        modules: {
        a: moduleA,
        b: moduleB
        }
    })

    store.state.a // -> moduleA's state
    store.state.b // -> moduleB's state
```

