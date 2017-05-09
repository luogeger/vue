<template>
  <div id="app">
      <img src="./assets/logo.png">
      <div class="main">
          <!-- left -->
          <div class="left">
            <!-- apple -->
            <div class="apple">
              <router-link :to="{path: 'apple'}">
                <span>to Apple</span>
              </router-link>
            </div>
            <!-- banana -->
            <div class="banana">
              <router-link :to="{path: 'banana'}">
                <span>to Banana</span>
              </router-link>
            </div>
            <!-- -->
            <div class="banana">
              <router-link :to="{path: 'banana/green'}">
                <span>to BananaGreen</span>
              </router-link>
            </div>
          </div>
          <!-- right view-->
          <div class="view">
            <router-view></router-view>
          </div>
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
