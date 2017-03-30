# vue.js及相关介绍

## vue.js简介及框架简介
> 轻量级的MVVM框架，有react的组件化的概念，可以轻松的视线数据和展示的分离；也有angular灵活的指令和页面操作的方法。
### 课程简介
- 初步了解vue.js框架
- vue.js开发环境的搭建、脚手架工具的使用
- vue.js具体的指令和项目实践
### 准备知识
- HTML、css、javaScript
- 前端**模块化**基础
- 对**ES6**有初步了解

## vue.js开发环境搭建及热更新











## 安装
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
    - v-bind
    - v-on


## 计算属性
- 计算缓存 vs Methods
- 属性：Computer vs Watched
- 计算Setter
- 观察Watchers




















