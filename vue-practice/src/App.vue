<template>
  <div id="app">
      <img src="./assets/logo.png">
      <p>总金额：<span>{{totalPrice}}</span></p>
      <div class="------main">
          <!-- left -->
          <!--<div class="left">-->
            <!--&lt;!&ndash; apple &ndash;&gt;-->
            <!--<div class="apple">-->
              <!--<router-link :to="{path: 'apple'}">-->
                <!--<span>to Apple</span>-->
              <!--</router-link>-->
            <!--</div>-->
            <!--&lt;!&ndash; banana &ndash;&gt;-->
            <!--<div class="banana">-->
              <!--<router-link :to="{path: 'banana'}">-->
                <!--<span>to Banana</span>-->
              <!--</router-link>-->
            <!--</div>-->
            <!--&lt;!&ndash; &ndash;&gt;-->
            <!--<div class="banana">-->
              <!--<router-link :to="{path: 'banana/green'}">-->
                <!--<span>to BananaGreen</span>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash; right view&ndash;&gt;-->
          <!--<div class="view">-->
            <!--<router-view></router-view>-->
          <!--</div>-->
      </div>

      <!-- vuex demo-->
      <apple></apple>
      <banana></banana>
  </div>
</template>

<script>
//hello 组件
//import Hello from './components/Hello'
//
//export default {
//  name: 'app',
//  components: {
//    Hello
//  }
//}

//vuex apple、banana组件
import Apple from './components/increment.vue'
import Banana from './components/decrement.vue'
export default {
  components: { Apple, Banana},
  computed: {
    totalPrice () {
      if(this.$store.state.totalPrice < 0){
        this.$store.state.totalPrice = 0;
      }
      return this.$store.state.totalPrice;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .main{
    border: 1px solid #ff0000;
    height: 200px;
  }
  .left{
    width: 19%;
    border: 1px solid #000000;
    height: 198px;
    float: left;

  }
  .view{
    width: 80%;
    height: 198px;
    float: right;
    background-color: #E8E8E8;
  }

</style>
