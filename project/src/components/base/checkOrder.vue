<template>
   <div>
    <!-- 这里的 :is-show -->
     <my-dialog
       :is-show="isShowCheck"
     >
       请检查你的支付状态！
       <div class="button">
         支付成功
       </div>
       <div class="button">
         支付失败
       </div>
     </my-dialog>
   </div>
</template>
<script>
import Dialog from '../dialog'

export default {
    components: {
        myDialog: Dialog,
    },

    props:{
      isShowCheck:{
        type: Boolean,
      }
    },

    methods: {
      close () {
          alert(123)
      }
    }




}// end
</script>
<style>

</style>
