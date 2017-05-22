<template>
  <div class="hello">
    <button @click="sTf()">子 -> 父</button>
    <br>
    <button @click="getFatherMsg">getFatherMsg</button>
      获取的父组件信息：<span v-if="ifShow" v-text="msgfromfather"></span>
    <br>
    <button @click="sendFather">sendMsgToFather</button>
    <h1>{{ msg }}</h1>
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
      <!--<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
      <!--<br>-->
      <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
      <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
      <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
      <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App ',
      sTfMsg: 'son to father msg!',
      ifShow: false
    }
  },
  props: ['msgfromfather'],
  methods: {
    getFatherMsg: function (){
      this.ifShow = !this.ifShow;
    },
    sendFather: function (){
      this.$emit('receive-son', this.sTfMsg);
    },
    sTf: function (){
//      this.$dispatch('son-to-father', this.sTfMsg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    background-color: #ffffcc;
  }
h1, h2 {
  font-weight: normal;
  color: #42C088;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
