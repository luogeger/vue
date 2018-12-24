<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <!-- versions 通过绑定在父组件上的属性传递过来 -->
      <li v-for="(item, index) in checkbox"
          :class="{active: activeJudge(index)}"
          @click="toggleShow(index)">
          {{item.label}}
      </li>
    </ul>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
    // props
    props: {
      checkbox: {
          type: Array,
          default: [{
            label: 'test',
            value: 0
          }]
      }
    },

    // methods
    methods: {
      toggleShow (index) {
          if(this.tempArr.indexOf(index) === -1){ // 如果不在就把index添加到临时数组
              this.tempArr.push(index);
          }
          else{ // 如果在就把这index从临时数组删除
            index = this.tempArr.indexOf(index);
            this.tempArr.splice(index, 1);
          }


          let tempArrObj = [];
          for(var i = 0; i < this.tempArr.length; i++){
            tempArrObj.push(this.checkbox[this.tempArr[i]]);
          };
          this.$emit('on-change', tempArrObj); // 要传到父组件的是index对应的value, 所以
      },

      activeJudge (index) { // 查看index对应的value, 在不在数组里面
          return this.tempArr.indexOf(index) !== -1;
      },
    },

    // data
    data () {
        return {
            tempArr: [1],
        }
    },


}

</script>
<style scoped>
  .chooser-component {
    position: relative;
    display: inline-block;
  }
  .chooser-list li{
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
