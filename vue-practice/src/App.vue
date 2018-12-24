<template>
  <div id="app">
    <div class="app-head">
      <div class="app-head-inner">
        <div class="head-logo"><img src="./assets/logo.png" alt=""></div>
        <div class="head-nav">
          <ul class="nav-list">
            <li>登陆</li>
            <li></li>
            <li>注册</li>
            <li></li>
            <li>关于</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Init from './assets/css/init.less'
</script>

<style lang="less">
  .clearfix(){
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  };
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;

    .app-head-inner {
      width: 1200px;
      margin: 0 auto;
      .clearfix();
      .head-logo{
        float: left;
        img {
          width: 50px;
        }
      }
      .head-nav{
        float: right;
      }
    }// inner
  }// app-head

</style>
