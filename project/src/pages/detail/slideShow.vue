<!--
1. 在某一时刻，肯定有2张图片同时存在， 他们分别以什么样的形式，多长的时间隐藏/显示
2. isShow是在每次图片进行更换的时候改变 -> goto();
3. 10毫秒以后在改变nowIndex, 改变isShow

4. 子组件和父组件交互，触发自定义事件
    通过：this.$emit('sonToBaba', index);
-->
<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
      <!-- img -->
      <div class="slide-img">
        <a :href="slides[nowIndex].href">
          <transition name="slide-trans">
            <img v-if="isShow" :src="slides[nowIndex].src">
          </transition>
          <transition name="slide-trans-old">
            <img v-if="!isShow" :src="slides[nowIndex].src">
          </transition>
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
    },
    slideSpeed:{
      type: Number,
      default: 1000,
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
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
        this.$emit('sonToBaba', index);
      });

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

    runInv () {
      this.invID = setInterval( () => {
          //每秒执行一次goto()方法
          this.goto(this.nextIndex);
      }, this.slideSpeed);
    },

    clearInv () {
      clearInterval(this.invID);//注意切换的是invID, 不是runInv
    },
  },

  // data
  data () {
    return  {
      isShow: true,
      nowIndex: 1,
      slidesLength: this.slides.length,
    }
  },

  // mounted -- 可以检测父组件穿过来的数据是否拿到
  mounted () {
    console.log(this.slides);
    this.runInv();
  },
}
</script>
<style scoped lang="scss">
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
    margin: 15px 0 0 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    color: #fff;
    background: #000;
    opacity: .7;
    bottom: 0;
    height: 30px;
    line-height: 30px;
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
    bottom: 7px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    /*text-decoration: underline;*/
    color: #4FC08D;
  }
</style>
