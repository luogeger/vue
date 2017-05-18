# vue.js及相关介绍
- vue-admin [https://taylorchen709.github.io/vue-admin/](https://taylorchen709.github.io/vue-admin/)
	- This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)
## vue.js简介及框架简介
> 轻量级的MVVM框架，有react的组件化的概念，可以轻松的实现数据的展示和分离；也有angular灵活的指令和页面操作的方法。
- 组件化开发模式，渐进式框架: 字段的渲染，组件，路由，状态，构建系统
- 初步了解vue.js框架
- vue.js开发环境的搭建、脚手架工具的使用
- vue.js具体的指令和项目实践

### 准备知识
- 前端**模块化**基础
- 对**ES6**有初步了解
- 熟悉基础框架
    - name: ''
    - data: {}
    - props: [ ]
    - components: {}
    - methods: {}
    - watch: {}

## 划分组件
- 功能模块：select，pagenation...
- 页面区域：header，footer，sidebar...
```html
    <header></header>
    <footer></footer>
```

```javascript
    import Header from './header.vue'
    import Footer from './header.vue'
    new Vue({
        data: {
            isShow: true
        },
        components: [Header, Footer]//注册组件
    })
```
- 组件之间的通信 - **props** 属性
```html
    <!--this is app.vue-->
    <header msg="something interseting"></header>
    <footer></footer>
```
```javascript
    //this is header.vue
    new Vue({
        data: {
            username: 'luo'
        },
        props: ['msg'],
        methods: {
            doThis: function (){
                console.log(this.msg);
            }
        }
    })
```
- 父向子组件传参
    - 子组件需要用到``props: ['str']``属性来接收，同时这个值也保存在``data``里面了，可以直接打印和渲染到页面

- 子向父组件传参
    > vue实例实现了一个自定义事件接口，方便在组件树中通信，这个事件系统独立于原生DOM事件，用法也不同
    - 自定义事件：每个vue实例都是一个事件触发器
    - ``$on()``监听事件
    - ``$emit()``在上面触发事件
    - ``$dispatch()``派发事件，事件沿着父链冒泡
    - ``$broadcast()``广播事件，事件向下传到给所有的后代
    > 不同于DOM事件，vue事件在冒泡过程中第一次触发回调之后自动停止冒泡，除非回调明确返回**true**
- 1.在父组件里面监听子组件：子组件要告诉父组件什么事情
    - 子组件发生事件，把子组件的信息传递给父组件
```html
    <button v-on:click="sendFather">child msg</button>
```
```javascript
    sendFather: function (){
      console.log(this.sendFatherMsg + '这里是子组件');
      this.$emit('receive-son', this.sendFatherMsg);
    }
```


> 通过``$emit``方法，第一个参数要和父组件对应，第二个参数是要传递的信息
```html
    <hello msgfromfather="this is the msg from his father" v-on:receive-son="receiveSonMsg">
    
    </hello>
```

```javascript
    receiveSonMsg: function (msg){
        console.log('这里是父组件：'+msg);
    }
```

- 子组件向父组件传参，第二种方法：




## 安装：vue.js开发环境搭建及热更新
- 命令行工具安装
    - 1.全局安装vue-cli: ``npm install --global vue-cli``
        - 检查是否安装好，直接在命令行输入``vue``
    - 2.创建一个 基于webpack模板的新项目：``vue init webpack my-project``
        - 这时候你会看到当前文件夹多了一些文件
    - 3.在``my-project``文件夹打开命令行，``npm install``
        - **注意：** 有时候npm的速度很慢，可以考虑cnpm, 输入下面命令行
        - ``npm install -g cnpm --registry=https://registry.npm.taobao.org``
        -  输入命令：``cnpm``检查是否安装好，以后用到npm的地方用cnpm代替。


## 介绍
> v-if, v-for, v-on:click, v-bind:title,  v-bind:todo='item',
- 声明与渲染
- 条件与循环
- 处理用户输入
- 组件化应用构建
```html
    <ul id="luo">
        <lis v-for="a in asd" v-bind:todo="a"></lis>
    </ul>
```
```javascript
    var arr = [
        {name: 'lili', age: 18},
        {name: 'lucy', age: 19},
        {name: 'jim', age: 20},
    ];

    Vue.component('lis', {
        props: ['todo'],
        template:"<li>姓名:{{todo.name}}，年龄:{{todo.age}}</li>",
    });

    var obj = new Vue({
        el: '#luo',
        data: {
            asd: arr,
        }
    });
```

## Vue实例
- 构造器
- 属性与方法
- 实例生命周期

## 模板语法
- 插值
    - 文本
    ```html
    <span>Message: {{msg}}</span>
    <span v-once>This will never change: {{msg}}</span>
    <span v-text:'msg'> </span>
    ```
    - 纯HTML
    ```html
    <div v-html="testHTML"></div>
    ```
    - 属性
    ```html
    <div v-bind:title='testTitle'></div>
    <button v-bind:disabled="someDynamicCondition"></button>
    <!--如果条件被求值为false的话，disabled属性会被移除-->
    ```
    - JavaScript表达式
    > {{}}：双大括号表达式支持JavaScript。表达式会在**所属Vue实例**的数据作用域下作为JavaScript被解析。``注意：``每个绑定都只能包含单个表达式
    ```html
    {{ number + 1 }}
    {{ ok ? 'yes' : 'no' }}
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id"></div>

    <!--以下的不会被支持-->
    {{ var a = 1; }}  <!--这个是语句，不是表达式-->
    {{ if(ok) { return message } }}  <!--流控制也不会生效，只能使用三元表达式-->
    ```
    > 模板表达式都被放在沙盒里，只能访问全局变量的一个白名单，如``Math``和``Date``。不应该在模板表达式中试图访问用户定义的全局变量。
- 指令
> 指令``directives``：带有``v-``前缀的特殊属性。指令职责：表达式的值改变时，相应地将某些行为引用到DOM上
```html
<p v-if="prop">now you see me</p>
<!-- v-if根据prop的值，移除\插入P元素-->
```
> 指令属性的值预期是**单一JavaScript表达式**，除了``v-for``
- 指令：参数
    ```html
    <a v-bind:href="url"></a>
    ```
    > 这里``href``是参数，告诉``v-bind``指令把a元素的``href``属性与表达式``url``的值绑定。
    ```html
    <a v-on:click="doSomething"></a>
    ```
    > ``v-on``: 监听DOM事件，参数是监听的事件名。
- 指令：修饰符
    ```html
    <form v-on:submit.prevent="submit"></form>
    ```
    > **modifiers**以``.``指明的特殊后缀，支出指令应该以特殊方式绑定。``.prevent``修饰符告诉``v-on``对于触发的事件调用``event.preventDefault()``
- 过滤器
- 缩写
    - v-bind ``:``
    - v-on  ``@``


## 计算属性
- 计算缓存 vs Methods
- 属性：Computer vs Watched
- 计算Setter
- 观察Watchers

## class与style绑定

## 条件渲染
- v-if
    - template中 v-if 条件组
    - v-else
    - v-else-if
    - 用key管理可复用的元素
- v-show
- v-if和v-show
- v-if和v-for一起使用


# shoppingCar
- 1.下载 vue.js 和 vue-resource.js
    - 创建package.json: ->``npm init``
    - 下载vue.js：``cnpm install vue --save-dev``

- 2.vue-resource、v-for
    - 1.vue-resource插件是绑定在vm实例上面的。
        - 1.promise结构``this.$http.get().then()``
        - 2.vue里面所有的this都指向Vue的实例，函数内部this不是。
    - 2.v-for指令的渲染，
        - ``v-for="(item, index) in productList"``
    - 3.``pit: ``不能用vm代替this
        - vue2.0用``mounted``钩子代替了``ready``, 所以，并不能保证该实例已经插入文档。所以，应该在钩子函数种包含``Vue.nextTick/vm.$nextTick``
        ```javascript
        mounted: function (){
            this.$nextTick(function (){
                vm.cartView();
            })
        }
        ```
- 3.过滤``金额格式化``、
    - 全局过滤器和局部过滤器，局部过滤器只有vue的实例才能使用
        - ``bug: ``过滤器value没有toFixed()方法。
        ```html
        <h6>单价：<spn>{{item.productPrice | formatMoney}}</spn></h6> 局部过滤器
        <h6>合计：<span>{{item.productQuentity*item.productPrice | money('元')}}</span></h6> 全局
        ```
        ```javascript
        filters: {
            formatMoney: function (value){
                return "￥" + value;
            }
        }
        Vue.filter('money', function (value, type ){
            return value + type;
        });
        ```
- 4.金额计算、单选、全选
    - 如何用vue去监听一个不存在的变量。
        - 如果一个对象里面的变量不存在，先判断这个变量存不存在``if(typeof item.checked == 'undefined')``
        - 设置Vue全局变量: Vue.set(item, 'checked', true),有点类似angular的``$scope``
        - 设置局部变量： ``this.$set(item, 'checked', true)``
    - 没有实现单选框全部选中以后全选框也被选中，
        - 全选和取消全选用用一个函数，参数传的分别是true和false
        ```javascript
        selectCheckBgcAll: function (flag){
            this.checkBgcAllFlage = flag;
            this.productList.forEach(function (value, index){
                if(typeof value.CheckBgcFlagm == 'undefined'){
                    Vue.set(value, 'CheckBgcFlag', flag)
                }
                else{
                    value.CheckBgcFlagm = flag;
                }
            })
        }
        ```

- 5.总金额计算、删除
    - 怎么获取删除的是哪个商品？
    - 1.0删除的方法：``this.List.$delete(this.item)``,现在已经不支持了。
        - 为了尽可能提升性能，用原生js


- 6.地址栏的筛选
    - 1.要缓存整个地址结果，过滤器（limitBy）
    - 2.用原生js能实现的尽量不用vue框架实现 - 用computer方法

- 7.选中卡片
    - 1.click时需要声明变量和索引相同
    - 2.class是否添加上去，由本身的Index和currentIndex作比较判断，

- 8.设为默认
    - 1.把自己设为默认的同时，还要把其他所有的设为不默认，forEach(function(item, index){});
    - 2.click(item.addressID);

## imooc
- 1.vue-cli
    - 1.成熟的架构设计
    - 2.本地测试服务器
    - 3.集成打包上线方案
    - 4.安装vue-cli
        - ``npm install vue-cli -g``
        - ``vue init webpack my-project``,初始化项目
        - ``npm install``,安装项目依赖


## vue-practice
- 1.安装vue-router,
    - 1.引入``import VRouter from 'vue-router'`` 
    - 2.``Vue.use(VRouter)``
    - 3.实例化router， ``let router = new VRouter({})``,vue-router引入进来，就是一个全局的类
        - 配置路由：
        - map映射关系:规定什么样的地址访问什么样的页面或者说组件,
        - route-view,
        - route-link, 在页面的跳转

- 2.前端路由的参数
    - 1.map进行设置

- 3.路由的嵌套
    - 1.也可以直接访问子路由``:to="{path: 'banana/yellow'}"``
    - 2.在children子路由的``path: '/yellow'``, 锚链接地址变化

- 4.路由视图、路由重定向
    - 声明式导航、编程式导航
    - ``router.beforEach()``异步操作，检查用户信息是否登录导航到登录页面
    - 重定向：``{ path: '/', redirect: '/apple'}``

- 5.过渡路由调转动画

- 6.状态管理 vuex
    ```
    Application Structure
      Vuex doesn't really restrict how you structure your code. Rather, it enforces a set of high-level principles;
        1. Application-level state is centralized in the store.
        2. The only way to mutate the state is by committing **mutations**. which are synchronous transactions.
        3. Asynchronous logic should be encapsulated in, and can be composed with **actions**.
      As long as you follow these rules. it's up to you how to structure your project. If your store file gets too big. simply start splitting the actions. mutations and getters into separate files.
      For any non-trivial app. we will likely need to leverage modules. Here's an example project structure;
    ```
    - 1.state
    - 2.getters -- 获取状态集里面的数据
    ```javascript
       getters: {
          getTotal (state) {
              return state.totalPrice;
          }
       }
    ```
    - 3.mutations -- 同步
    - 4.actions -- 只能调用mutations，不能更改state
    ```javascript
        //添加actions
        actions: {
              increase (context, price) {
                context.commit('increment', price)
              }
            }
        //子组件的methods里面的方法更换
        this.$store.commit('increment', this.price);
        // 更换commit, 用dispath
        this.$store.dispatch('increase', this.price);
    ```
    > 这样做的好处是，可以在actions里面做一些异步的操作，在去触发increment,
        与后端API的操作都是放在actions里面进行的
    - 5.modules
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

    ```
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
    属性名以及方法
    ```javascript
    export default {
      components: { },

      props: {},

      methods: {},

      computed: {},
      //
      mounted () {},

      created () {},

      data () {},
    }
    ```

    - 1.自动轮播需要用到computed.
    - 2.路由的切换，dialog

### 6.9首页-登陆
> 父向子组件传递属性，子向父组件传递事件
- 1.先控制内容
    - 1.``<slot>empty</slot>`` 不起作用
- 2.控制显示隐藏
    - 1.注意属性名的转换
    - 2.子组件的 ``点击事件`` -> 触发自定事件 ``this.$emit('on-close')`` -> 父组件监听到事件, 在触发事件 ``@on-close="closeDialog"`` -> 在通过这个事件，改变数据
    - 3.分别显示不同的组件，以及变量当做参数传递

### 6.10 首页-登陆组件
> dialog组件里面的``登陆`` ``注册`` 页面也是又组件构成
- 1.获取表单数据``v-model``
- 2.表单验证 
    - 用到计算属性：``computed``
    - 第一次弹框不显示 verify.text
    - 模拟ajax登陆
    - 设置用户名
    - 登陆成功，弹出消失，重新调用函数
    - 弹出框动画显示

### 7.1 添加路由
- 1.详情页路由跑通
    - 入口文件路由设置(手动)
- 2.渲染li标签
    - li标签和img显示
- 3.详情页，li标签和img同步
    - 单个img不能以v-bind的形式引入
- 4.右侧的子路由配置
    - 子路由跑通(手动)
    - ``pit:`` 子路由不需要的``path`` 不需要 ``/``
    - ``<router-link>``配置子路由
        - 默认生成a标签，``tag="li"``,  ``active-class``
- 5.img, li标签, router-link, 同步显示
    - img不在循环里面，需要做一个映射









