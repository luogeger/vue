// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import VRouter from 'vue-router'
import Apple from './components/Apple'
import Banana from './components/Banana'

Vue.config.productionTip = false;

Vue.use(VRouter);

let router = new VRouter({
    mode: 'history',//没有hash
    routes: [

      {
        path:'/apple',
        component:Apple
      },
      {
        path:'/banana',
        component:Banana
      },
    ]
});


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
