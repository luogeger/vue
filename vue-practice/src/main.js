// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import VRouter from 'vue-router'
import Vuex from 'vuex'
import Apple from './components/Apple'
import Banana from './components/Banana'
import BananaYellow from './components/bananaYellow'
import BananaGreen from './components/bananaGreen'

Vue.config.productionTip = false;

Vue.use(VRouter);
Vue.use(Vuex);

//router
let router = new VRouter({
    mode: 'history',//没有hash
    routes: [

      {
        path:'/apple',
        component:Apple
      },
      {
        path:'/banana',
        component:Banana,
        children: [
          {
            path: 'yellow',
            component: BananaYellow
          },
          {
            path: 'green',
            component: BananaGreen
          }
        ]
      },
    ]
});

//store
//let store = new Vuex.store({
//
//});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
