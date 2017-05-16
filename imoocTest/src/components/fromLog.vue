<!--
1. verify的this.flag 的flag名字不能一样
-->
<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="userName" placeholder="请输入用户名" >
        </div>
        <span class="g-form-error"> {{verifyUserName.text}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passWord" placeholder="请输入密码">
        </div>
        <span class="g-form-error"> {{verifyPassWord.text}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a @click="onLog" class="button" >登录</a>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          userName: '',
          passWord: ''
      }
  },
  
  // methods
  methods: {
      onLog () {
          if(this.verifyPassWord.text || this.verifyUserName.text){
              console.error('部分不符合验证');
          }
          else{
              console.log(this.passWord, this.userName, 'success');
              this.$http.get('api/login', {id: 'luo'}).then(
                  (res)=> {
                      this.$emit('on-login', res.data)
                  },
                  (err) => {
                        console.log('error');
                  }
              )
          }
          
      }
  },
  
  // computed
  computed: {
      verifyUserName () {
          let status, text;
          if(!/@/g.test(this.userName)){
            status = false;
              text = '没有包含@';
          }else{
              status = true;
              text = '';
          }
          // 解决第一次就显示verify.text
          if(! this.userflag){
              text = '';
              this.userflag = true;
          }
          return {status, text}
      },
      verifyPassWord () {
        let status, text;
        if(!/^\w{1,6}$/g.test(this.passWord)){
          status = false;
          text = '密码不是1-6位';
        }else{
          status = true;
          text = '';
        }
        // 解决第一次就显示verify.text
        if(! this.passflag){
          text = '';
          this.passflag = true;
        }
        return {status, text}
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
