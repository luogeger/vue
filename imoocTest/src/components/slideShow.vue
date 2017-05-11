<template>
    <div class="slide-show">
      <!-- img -->
      <div class="slide-img">
        <a :href="slides[nowIndex].href">
          <img :src="slides[nowIndex].src">
        </a>
      </div>
      <!-- title -->
      <h2>{{slides[nowIndex].title}}</h2>
      <!-- pages -->
      <ul class="slide-pages">
        <li @click="change(-1)">&lt;</li>
        <li v-for="(item, index) in slides" @click="goto(index)">
          <a >{{index + 1}}</a>
        </li>
        <li @click="change(1)">&gt;</li>
      </ul>
    </div>
</template>
<script>
export default {
  // props
  props: {
    slides:{
      type: Array,
      default: [],
    }
  },
  // methods
  methods: {
    goto (index) {
      this.nowIndex = index;
      console.log(this.nowIndex);
      console.error(this.slidesLength-1);
    },
    change (num) {
      if(num > 0){
        if(this.nowIndex == this.slidesLength - 1){
          return this.nowIndex = 0;
        }
        this.nowIndex = this.nowIndex + 1;
      }
      else{
        if(this.nowIndex == 0){
          return this.nowIndex = this.slidesLength - 1;
        }
        this.nowIndex = this.nowIndex - 1;
      }
    }
  },
  // data
  data () {
    return  {
      nowIndex: 3,
      slidesLength: this.slides.length,
    }
  },
  //可以检测父组件穿过来的数据是否拿到，-- mounted
  mounted () {
    console.log(this.slides);
  },
}
</script>
<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
