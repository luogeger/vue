<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in versions"
          :class="{active: checkActive(index)}"
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
      versions: {
          type: Array,
          default: [{
              label: '国行版'
          }]
      }
    },
    
    // methods
    methods: {
      toggleShow (index) {
          if(this.tempArr.indexOf(index) == -1){ // 如果不在就把index添加到临时数组
              this.tempArr.push(index);
          }
          else{ // 如果在就把这index从临时数组删除
            //index = this.tempArr.indexOf(index);
            //this.tempArr.splice(index, 1);
            this.tempArr = _.remove(this.tempArr, (idx) => {
               return idx != index;
            });
          }

//          let tempArrObj = _.map(this.tempArr, (idx) => {
//             return this.versions[idx];
//          });
//          this.$emit('on-change', tempArrObj); // 要返回的数组对象，运用lodash工具
      },
      checkActive (index) { // 查看index对应的value, 在不在数组里面
          return this.tempArr.indexOf(index) !== -1;
      }
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
