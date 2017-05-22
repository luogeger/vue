<template>
  <div id="app">
    <div class="todoList">
      <h1>{{title}}</h1>
      <input type="text" v-model="newItem" @keyup.enter="addItem" placeholder="Create a todo">
      <ul>
        <li v-for="item in items" :class="{finished: item.completed}" >
          <p v-text="item.label"></p>
          <button @click="isCompleted(item)" class="button">Delete</button>
        </li>
      </ul>
      <p>子 -> 父: <span></span></p>
      获取子组件传来的信息：<span v-text="newMsg"></span>
    </div>
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <hello msgfromfather="father to son msg!" v-on:receive-son="receiveSonMsg"></hello>
    <!--<luo></luo>-->
  </div>




</template>

<script>
  import Storage from './storage.js';// 引入storage.js
  //console.log(Storage); //打印出来的是一个对象，有fetch() 和 save()
  import Hello from './components/Hello.vue';
//  import Luo from './components/Luo.vue';
  export default {
    name: 'app',
    data: function () {
      return {
        title: 'This  is a todo list',
        items: Storage.fetch(),
        newItem: '',
        newMsg: '',
      }
    },// <data end>

    components: {Hello},

    watch: {
      items: {
        handler: function (newVal) {
          Storage.save(newVal);
        },
        deep: true
      }
    },// <watch end>

    events: {
      'receive-son': function (msg){
        console.log(msg);
      }
    },

    methods: {
      isCompleted: function (item){
        item.completed = !item.completed;
      },
      addItem: function (){
        this.items.push({
          label: this.newItem,
          completed: false
        });
        this.newItem = '';
      },
      receiveSonMsg: function (msg){
        this.newMsg = msg;
      },

    events: {
      'son-to-father': function (msg){
      }
    }
    },// <methods end>



  }// <export end>
</script>

<style>
#app{
  margin: 50px 100px;
  font-family: 'microsoft yahei';

}
.todoList{
  border-bottom: 2px solid red;
  padding-bottom: 10px;
}
input{
  width: 400px;
  height: 40px;
  font-size: 30px;
}

ul{
  padding: 0;
  width: 400px;
}
li{
  height: 50px;
}
p{
  margin: 0;
  font-size: 30px;
  padding: 5px 0;
}

.button{
  cursor: pointer;
  height: 30px;
  /*border-radius: 6px;*/
  background-color: #42B983;
  position: relative;
  top: -40px;
  right: -340px;
  color: #fff;
}

.finished {
  text-decoration:line-through
}


  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
