

# Vue.js双向绑定的实现原理
> http://www.cnblogs.com/kidney/p/6052935.html?utm_source=gold_browser_extension
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






























