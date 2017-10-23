# 基础
## 安装
- 独立版本
    - CDN
- npm
    - 独立构建 vs 运行时构建
    - CSP构建
- 命令行工具
- 开发版本
- Bower
- AMD模块加载器
## 介绍
- vue.js
- 起步
- 声明式渲染
- 条件与循环
- 处理用户输入
- 组件化应用构建
- 自定义元素
## vue实例
- 构造器
- 属性与方法
- 实例生命周期
## 模板语法
- 插值
    - 文本、纯HTML、属性、JavaScript表达式
- 指令
    - 参数、修饰符
- 过滤器
- 缩写
    - v-bind、v-on
## 计算属性
- 计算属性
    - 基础
    - 计算缓存 vs Methods
    - computed vs Watched
    - 计算setter
- 观察Watchers
## class与style绑定
- 绑定HTML Class
    - 对象语法
    - 数组语法
    - 用在组件上
- 绑定内联养殖
    - 对象语法
    - 数组语法
    - 自动添加前缀
## 条件渲染
- v-if
    - template中 v-if 条件组
    - v-else
    - v-else-if
    - 用key管理可复用的元素
- v-show
- v-if、v-show
- v-if与v-for一起使用
## 列表渲染
## 事件处理器
## 表单控件绑定
## 组件

# 进阶
## 深入响应式原理
## 过渡效果
## 过渡状态
## Render函数
## 自定义指令
## 混合
## 插件
## 单文件组件
## 生产环境部署
## 路由
## 状态管理
## 单元测试
## 服务器渲染

# 迁移
## 从Vue 1.x迁移
## 从Vue Router0.7x迁移
## 从Vue 6.0迁移到1.0

# 更多
## 对比其他框架



# Vue.js双向绑定的实现原理
### 1. 访问器属性
```javascript
    var obj = new Object();
    Object.defineProperty(obj, 'hello', {
        get: function (){
            console.log('get execute');
        },
        set: function (val){
            console.log('set execute, arguments is ' + val);
        }
    })
    obj.hello;
    obj.hello = 'abc';
```
- get 和 set 方法内部的 this 都指向 obj，这意味着 get 和 set 函数可以操作对象内部的值。另外，访问器属性的会"覆盖"同名的普通属性，因为访问器属性会被优先访问，与其同名的普通属性则会被忽略

### 2. 极简双向绑定的实现
```javascript
    var obj = new Object();
    Object.defineProperty(obj, 'hello', {
        set: function (val){
            document.getElementById("a").value = val;
            document.getElementById("b").innerHTML = val;
        }
    })

    document.addEventListener('keyup', function (e){
        obj.hello = e.target.value;
    })
```

```
    1、输入框以及文本节点与 data 中的数据绑定
    2、输入框内容变化时，data 中的数据同步变化。(view => model)。
    3、data 中的数据变化时，文本节点的内容同步变化(model => view)。
    
```

### 3. DocumentFragment
- 首先对 dom 进行编译
- DocumentFragment（文档片段）可以看作节点容器，它可以包含多个子节点，当我们将它插入到 DOM 中时，只有它的子节点会插入目标节点，所以把它看作一组节点的容器。使用 DocumentFragment 处理节点，速度和性能远远优于直接操作 DOM。Vue 进行编译时，就是将挂载目标的所有子节点劫持（真的是劫持，通过 append 方法，DOM 中的节点会被自动删除）到 DocumentFragment 中，经过一番处理后，再将 DocumentFragment 整体返回插入挂载目标。
```javascript
    function nodeToFragment (dom){
        var flag = document.createDocumentFragment();
        var child;
        while (child = dom.firstChild){// 直到firstChild == null,停止循环
            flag.appendChild(child);// 劫持dom所有子节点 
        }
        return flag;
    };
    
    var dom = nodeToFragment(document.getElementById("app"));
    console.log(dom);// 这里是劫持的所有节点
    document.getElementById("app").appendChild(dom)
```
- ``flag.append()`` 应为 ``flag.appendChild()``。下同。在 Chrome 中用 ``append()`` 竟然正常，没报错。


### 4. 数据初始化绑定
```javascript
    function compile (node, vm){
        var reg = /\{\{(.*)\}\}/;
        if(node.nodeType === 1){// 节点类型为元素
            var attr = node.attributes;
                console.log(attr);
            for(var i = 0; i < attr.length; i++){
                if(attr[i].name == 'v-model'){
                    var name = attr[i].nodeValue;
                    node.value = vm.data[name];
                    node.removeAttribute('v-model');
                }
            }
        }
        
        if(node.nodeType === 3){// 节点类型为 text
            if(reg.test(node.nodeValue)){
                var name = RegExp.$1;// 获取匹配到的字符串
                name = name.trim();
                node.nodeValue = vm.data[name]; // 将 data 的值赋给 node
            }
        }
    };

    function nodeToFragment (node, vm){
        var flag = document.createDocumentFragment();
        var child;
        
        while (child = node.firstChild) {
            compile(child, vm);
            flag.appendChild(child);
        }
        return flag;
    };
    
    function Vue (options){
        this.data = options.data;
        var id = options.el;
        var dom = nodeToFragment(document.getElementById(id), this);
        document.getElementById(id).appendChild(dom);
    };
    
    var vm = new Vue({
        el: 'app',
        data: {
            text: 'hello luogege'
        }
    });

```

### 响应式数据绑定






























