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
        <li @click="goto(prevIndex)">&lt;</li>
        <li v-for="(item, index) in slides" @click="goto(index)">
          <a :class="{on: index == nowIndex}">{{index + 1}}</a>
        </li>
        <li @click="goto(nextIndex)">&gt;</li>
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

  // computed
  computed: {
    prevIndex () {
      if(this.nowIndex == 0){
        return this.slidesLength -1;
      }
      else{
        return this.nowIndex -1;
      }
    },
    nextIndex () {
      if(this.nowIndex == this.slidesLength -1){
        return 0;
      }
      else{
        return this.nowIndex + 1;
      }
    },
  },

  // methods
  methods: {
    goto (index) {
      this.nowIndex = index;
    },
    change (num) {
//      if(num > 0){
//        if(this.nowIndex == this.slidesLength - 1){
//          return this.nowIndex = 0;
//        }
//        this.nowIndex = this.nowIndex + 1;
//      }
//      else{
//        if(this.nowIndex == 0){
//          return this.nowIndex = this.slidesLength - 1;
//        }
//        this.nowIndex = this.nowIndex - 1;
//      }
    },
//    runInv () {
//      this.invID = setInterval( () => {
//          //每秒执行一次goto()方法
//        }, 1000);
//    }
  },

  // data
  data () {
    return  {
      nowIndex: 3,
      slidesLength: this.slides.length,
    }
  },

  // mounted -- 可以检测父组件穿过来的数据是否拿到
  mounted () {
    console.log(this.slides);
    //this.runInv();
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
