<template>
  <div id="app">
    <h1>{{title}}</h1>
    <input type="text" v-model="newItem" @keyup.enter="addItem" placeholder="Create a todo">
    <ul>
      <li v-for="item in items" :class="{finished: item.completed}" >
        <p v-text="item.label"></p>
        <button @click="isCompleted(item)" class="button">Delete</button>
      </li>
    </ul>
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <hello msgfromfather="this is the msg from his father" v-on:receive-son="receiveSonMsg"></hello>
  </div>




</template>

<script>
  import Storage from './storage.js';// 引入storage.js
  //console.log(Storage); //打印出来的是一个对象，有fetch() 和 save()
  import Hello from './components/Hello.vue';
//  console.log(Hello);
  export default {
    name: 'app',
    data: function () {
      return {
        title: 'This  is a todo list',
        items: Storage.fetch(),
        newItem: '',
      }
    },// <data end>

    components: {Hello},

    watch: {
      items: {
        handler: function (newVal) {
          console.log(newVal);
          Storage.save(newVal);
        },
        deep: true
      }
    },// <watch end>

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
        console.log('这里是父组件：'+msg);
      }
    },



  }// <export end>
</script>

<style>
#app{
  margin: 150px 0 0 500px;
  font-family: 'microsoft yahei';

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
