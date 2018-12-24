<template>
  <div class="counter-component">
    <div class="counter-btn" @click="change(-1)"> - </div>
    <div class="counter-show">
      <input v-model="number" @keyup="fixNumber" type="text">
    </div>
    <div class="counter-btn" @click="change(1)"> + </div>
  </div>

</template>
<script>
  export default {
    props: {
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 20
      }
    },// props

    methods: {
      change (flag) {
        if (flag < 0) {
          if(this.number <= this.min) return this.number = this.min;
          this.number--
        }
        else{
          if(this.number >= this.max) return this.number = this.max;
          this.number++
        }
      },

      fixNumber () {
        let fix;
        if (typeof this.number === 'string') {
          fix = Number(this.number.replace(/\D/g, ''));
        }
        else {
          fix = this.number;
        }
        if (fix > this.max || fix < this.min) {
          fix = this.min;
        }
        this.number = fix;
      },

    },// methods

    watch: {
      number () {// 监听number 属性
        this.$emit('on-change', this.number)
      }
    },// watch

    mounted () {
      //this.$emit('on-change', this.number)
    },

    data () {
      return {
        number: this.min,
      }
    },// data

  }// end
</script>
<style scoped lang="scss">
  .counter-component {
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;

    .counter-btn,
    .counter-show{
      float: left;
      text-align: center;
      width: 25px;
      height: 25px;
      line-height: 25px;
    }

    .counter-btn {
      cursor: pointer;
      border: 1px solid #e3e3e3;
      &:first-child{
        border-radius: 3px 0 0 3px;
      }

      &:last-child{
        border-radius: 0 3px 3px 0;
      }
      &:hover {
        background: #4fc08d;
        border-color: #4fc08d;
        color: #fff;
      }
    }

    .counter-show {
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      input {
        border: none;
        outline: none;
        width: 25px;
        height: 20px;// 不然看不到下边框
        line-height: 25px;
        text-align: center;
      }

    }
  }// end
</style>
