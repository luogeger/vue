<template>
    <div>
        <div class="dialog-wrap" >
            <div class="dialog-cover" @click="closeMyself" v-if="isShow"></div>
            <transition name="drop">
                <div v-if="isShow" class="dialog-content">
                    <p @click="closeMyself" class="dialog-close">x</p>
                    <slot>empty</slot>
                </div>
            </transition>
      </div>
  </div>
</template>
<script>
import Dialog from './dialog'

export default {
    // props
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },

    // data
    data () {
        return {

        }
    },

    // methods
    methods: {
        closeMyself () {
            this.$emit('on-close');
        }
    }

}
</script>
<style scope lang="scss">
  .drop-enter-active {
    transition: all .5s ease;
  }
  .drop-leave-active {
    transition: all .5s ease;
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    transform: translateY(-500px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 6;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content {
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 #464068;
    padding: 2%;
    line-height: 1.6;
  }
  .dialog-close {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    color: blue;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
