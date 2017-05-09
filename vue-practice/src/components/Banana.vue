<template>
  <div class="banana">
    <button @click="getParam">获取参数</button>
    <h1>{{msg}}</h1>
    <!--<h2 v-text="$route.params.type"></h2>-->
    <router-link :to="{path: 'yellow'}">
      <span>to Yellow</span>
    </router-link>
    <router-link :to="{path: 'green'}">
      <span>to Green</span>
    </router-link>
    <router-view> </router-view>

  </div>

</template>
<script>
  export default{
    name: 'banana',
    data () {
      return {
        msg: 'i am banana',
      }
    },
    methods: {
      getParam () {
        console.log(this.$route.params);
      }
    }
  }
</script>
<style scoped>
  .banana{
    background-color: #0094ff;
  }
  button{
    float: left;
  }
</style>
