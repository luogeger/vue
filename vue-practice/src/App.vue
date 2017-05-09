<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div class="apple">
      <router-link :to="{path: 'apple'}">
        <span>to Apple</span>
      </router-link>
    </div>
    <div class="banana">
      <router-link :to="{path: 'banana'}">
        <span>to Banana</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
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
  .apple span{
    color: #ff0000;
  }
</style>
